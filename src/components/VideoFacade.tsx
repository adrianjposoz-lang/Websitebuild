"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { DealPhoto, Photo } from "@/lib/photos";
import type { Video } from "@/lib/site";
import { videoPosters } from "@/lib/video-posters";

/**
 * Click-to-load YouTube. Before the click there is only a self-hosted poster and a <button>: no
 * request to YouTube or Google. The click swaps in a youtube-nocookie iframe (autoplay follows the
 * click, captions on) in the same box and moves focus into it. A `photo` (RSC's own deal photo)
 * replaces the poster and keeps its own alt text, separate from the button's label. The `badge`
 * variant (card grids) draws a small corner play badge instead of the large button.
 */
export function VideoFacade({
  video,
  sizes,
  photo,
  variant = "default",
  aspect = "16/9",
}: {
  video: Video;
  sizes: string;
  photo?: Photo | DealPhoto;
  variant?: "default" | "badge";
  aspect?: "16/9" | "4/3";
}) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const badge = variant === "badge";

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  return (
    <div className={`relative w-full rounded-lg bg-navy ${aspect === "4/3" ? "aspect-[4/3]" : "aspect-video"}`}>
      {playing ? (
        <iframe
          ref={frameRef}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1&cc_load_policy=1&cc_lang_pref=en&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full rounded-lg"
        />
      ) : (
        <>
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="rounded-lg object-cover" />
          ) : null}
          <button
            type="button"
            aria-label={badge ? `Play video: ${video.title}` : `Play: ${video.title} (${video.duration})`}
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer overflow-hidden rounded-lg"
          >
            {photo ? null : (
              <Image src={videoPosters[video.poster]} alt="" fill sizes={sizes} className="object-cover" />
            )}
            {badge ? (
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-navy-deep/85 py-1 pl-1 pr-2.5 transition-colors duration-150 group-hover:bg-navy-deep"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-white">
                  <svg viewBox="0 0 24 24" className="ml-px size-3 fill-navy" focusable="false">
                    <path d="M7 4.5v15l12-7.5z" />
                  </svg>
                </span>
                <span className="tnum text-sm font-semibold text-white">{video.duration}</span>
              </span>
            ) : (
              <span aria-hidden="true" className="absolute bottom-3 left-3 flex items-center gap-2 lg:bottom-4 lg:left-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-white/95 transition-colors duration-150 group-hover:bg-white lg:size-14">
                  <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-navy lg:size-6" focusable="false">
                    <path d="M7 4.5v15l12-7.5z" />
                  </svg>
                </span>
                <span className="tnum rounded-md bg-navy-deep/85 px-2 py-0.5 text-sm font-semibold text-white">
                  {video.duration}
                </span>
              </span>
            )}
          </button>
        </>
      )}
    </div>
  );
}
