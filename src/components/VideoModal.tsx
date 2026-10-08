"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Video } from "@/lib/site";

const youtubeOrigin = "https://www.youtube-nocookie.com";

type Open = { video: Video; src: string; pathname: string };

const OpenVideoContext = createContext<(video: Video, trigger: HTMLElement) => void>(() => {});

export function useOpenVideo() {
  return useContext(OpenVideoContext);
}

/**
 * The one video lightbox for the whole site, mounted in the root layout so it sits outside the
 * per-route <Activity> boundaries: hiding a route on navigation never touches the player.
 *
 * Nothing YouTube exists in the DOM until a play click. The iframe `src` is built once per open and
 * held in state, so no re-render can change it; the iframe is removed on close. With the JS API on,
 * the last known time and play state are tracked, and if the browser ever reloads the frame (a
 * backgrounded tab can have its cross-origin frame reclaimed), playback is put back where it was
 * instead of restarting from 0:00 with autoplay.
 */
export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [opened, setOpen] = useState<Open | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const open = opened?.pathname === pathname ? opened : null;

  const openVideo = useCallback((video: Video, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    const params = new URLSearchParams({
      autoplay: "1",
      cc_load_policy: "1",
      cc_lang_pref: "en",
      rel: "0",
      enablejsapi: "1",
      origin: window.location.origin,
    });
    setOpen({ video, src: `${youtubeOrigin}/embed/${encodeURIComponent(video.id)}?${params}`, pathname });
  }, [pathname]);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: document.body.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      root.style.overflow = previous.overflow;
      document.body.style.paddingRight = previous.paddingRight;
      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  useResumeAfterFrameReload(frameRef, open?.src ?? null);

  return (
    <OpenVideoContext.Provider value={openVideo}>
      {children}
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={open ? "video-modal-title" : undefined}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(calc(100vw-2rem),64rem,calc((100dvh-8rem)*16/9))] max-w-none overflow-visible rounded-lg bg-navy-deep p-0 text-white backdrop:bg-navy-deep/85"
      >
        {open ? (
          <div>
            <FocusSentinel onFocus={() => frameRef.current?.focus()} />
            <div className="flex items-start justify-between gap-4 py-2 pl-4 pr-2 lg:pl-5">
              <p id="video-modal-title" className="pt-2.5 text-base font-medium leading-[1.4] text-white">
                {open.video.title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close video"
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white transition-colors duration-150 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" focusable="false" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                ref={frameRef}
                src={open.src}
                title={open.video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 size-full rounded-b-lg"
              />
            </div>
            <FocusSentinel onFocus={() => closeRef.current?.focus()} />
          </div>
        ) : null}
      </dialog>
    </OpenVideoContext.Provider>
  );
}

/** Tab past either end of the dialog lands here and wraps, including Tab out of the cross-origin player. */
function FocusSentinel({ onFocus }: { onFocus: () => void }) {
  return <span tabIndex={0} onFocus={onFocus} className="fixed size-px overflow-hidden opacity-0" />;
}

type PlayerInfo = { currentTime?: number; playerState?: number };

const PAUSED = 2;

function useResumeAfterFrameReload(frameRef: React.RefObject<HTMLIFrameElement | null>, src: string | null) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !src) return;

    let loads = 0;
    let last: { time: number; state?: number } = { time: 0 };
    let pendingResume: typeof last | null = null;
    let poll: ReturnType<typeof setInterval> | undefined;

    const send = (message: object) => frame.contentWindow?.postMessage(JSON.stringify(message), youtubeOrigin);

    const listen = () => {
      clearInterval(poll);
      let tries = 0;
      send({ event: "listening", id: "video-modal", channel: "widget" });
      poll = setInterval(() => {
        if (++tries > 40) clearInterval(poll);
        else send({ event: "listening", id: "video-modal", channel: "widget" });
      }, 250);
    };

    const onLoad = () => {
      loads += 1;
      if (loads > 1 && last.time > 0) pendingResume = { ...last };
      listen();
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== youtubeOrigin || event.source !== frame.contentWindow) return;
      let data: { event?: string; info?: PlayerInfo | number };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      clearInterval(poll);
      if (data.event === "infoDelivery" && data.info && typeof data.info === "object") {
        if (typeof data.info.currentTime === "number" && !pendingResume) last.time = data.info.currentTime;
        if (typeof data.info.playerState === "number" && !pendingResume) last.state = data.info.playerState;
      } else if (data.event === "onStateChange" && typeof data.info === "number" && !pendingResume) {
        last.state = data.info;
      }
      if (pendingResume && (data.event === "onReady" || data.event === "infoDelivery")) {
        const resume = pendingResume;
        pendingResume = null;
        send({ event: "command", func: "seekTo", args: [resume.time, true] });
        if (resume.state === PAUSED) send({ event: "command", func: "pauseVideo", args: [] });
        last = resume;
      }
    };

    frame.addEventListener("load", onLoad);
    window.addEventListener("message", onMessage);
    return () => {
      clearInterval(poll);
      frame.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMessage);
    };
  }, [frameRef, src]);
}
