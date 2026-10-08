"use client";

import Image from "next/image";
import { useOpenVideo } from "@/components/VideoModal";
import type { DealPhoto, Photo } from "@/lib/photos";
import { videoThumbnail } from "@/lib/video-thumbs";

/**
 * Click-to-load YouTube. Before the click there is only a self-hosted poster and a <button>: no
 * request to YouTube or Google. The click opens the site's one video modal (VideoModalProvider).
 * `title` is the site's own label (a deal card's title, or the title shown under the poster): it
 * names the button and the modal, so a YouTube title is never sent to the client. The poster is
 * the video's own thumbnail, self-hosted in public/video-thumbs/; a `photo` (RSC's own deal photo)
 * replaces it and keeps its own alt text. The duration sits bottom-right, YouTube's convention,
 * clear of the lettering burned into the thumbnails.
 */
export function VideoFacade({
  videoId,
  title,
  duration,
  sizes,
  photo,
  variant = "default",
  aspect = "16/9",
}: {
  videoId: string;
  title: string;
  duration: string;
  sizes: string;
  photo?: Photo | DealPhoto;
  variant?: "default" | "badge";
  aspect?: "16/9" | "4/3";
}) {
  const openVideo = useOpenVideo();
  const badge = variant === "badge";

  return (
    <div className={`relative w-full rounded-lg bg-navy ${aspect === "4/3" ? "aspect-[4/3]" : "aspect-video"}`}>
      {photo ? <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="rounded-lg object-cover" /> : null}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={badge ? `Play video: ${title}` : `Play: ${title} (${duration})`}
        onClick={(event) => openVideo({ id: videoId, title }, event.currentTarget)}
        className="group @container absolute inset-0 size-full cursor-pointer overflow-hidden rounded-lg"
      >
        {photo ? null : <Image src={videoThumbnail(videoId)} alt="" fill sizes={sizes} className="object-cover" />}
        <span
          aria-hidden="true"
          className={`absolute inset-0 m-auto flex items-center justify-center rounded-full bg-white/95 shadow-sm transition-opacity duration-150 ${
            badge
              ? "size-11 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              : "size-12 group-hover:bg-white lg:size-14"
          }`}
        >
          <svg viewBox="0 0 24 24" className={`ml-0.5 fill-navy ${badge ? "size-4" : "size-5 lg:size-6"}`} focusable="false">
            <path d="M7 4.5v15l12-7.5z" />
          </svg>
        </span>
        {/*
          On large posters the badge scales with the poster, like YouTube's, so it fully covers a
          duration some thumbnails burn into that corner (-jjMuLRIk4s prints "03:39").
        */}
        <span
          aria-hidden="true"
          className={`absolute flex items-center justify-center gap-1 rounded font-semibold text-white ${
            badge
              ? "bottom-1.5 right-1.5 bg-navy-deep/85 py-0.5 pl-1 pr-1.5 text-xs leading-4"
              : "bottom-[max(6px,1.2cqw)] right-[max(6px,1.2cqw)] h-[max(16px,4.8cqw)] min-w-[9.4cqw] bg-navy-deep px-[max(6px,0.9cqw)] text-[max(12px,2.2cqw)] leading-none"
          }`}
        >
          {badge ? (
            <svg viewBox="0 0 24 24" className="size-2.5 fill-white" focusable="false">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          ) : null}
          <span className="tnum">{duration}</span>
        </span>
      </button>
    </div>
  );
}
