"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/videos";

/**
 * Click-to-load YouTube. Before the click there is only a local thumbnail and a <button>: no
 * YouTube script, iframe, or request. The click swaps in a youtube-nocookie iframe with autoplay.
 * The 16:9 box is fixed, so the swap never shifts layout.
 */
export function VideoFacade({ video, sizes }: { video: Video; sizes: string }) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <div className="relative aspect-video w-full rounded-lg bg-navy-deep">
      {playing ? (
        <iframe
          ref={frameRef}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full rounded-lg"
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${video.title}`}
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer overflow-hidden rounded-lg"
        >
          <Image src={video.thumbnail} alt="" fill sizes={sizes} className="object-cover" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy/90 ring-2 ring-white transition-colors duration-150 group-hover:bg-navy-deep"
          >
            <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-white" focusable="false">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
