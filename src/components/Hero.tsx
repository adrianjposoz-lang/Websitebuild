import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export function Hero({
  variant = "page",
  image,
  imagePosition = "object-[70%_50%]",
  preload = false,
  eyebrow,
  title,
  lede,
  actions,
  footnote,
  preview,
  texture = "grid",
  as: Tag = "section",
}: {
  variant?: "home" | "page";
  image?: StaticImageData;
  imagePosition?: string;
  preload?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  footnote?: ReactNode;
  preview?: ReactNode;
  texture?: "grid" | "dots";
  as?: "section" | "header";
}) {
  const home = variant === "home";
  const layout = image
    ? home
      ? "min-h-[34rem] justify-end pb-14 pt-48 lg:min-h-[40rem] lg:justify-center lg:py-28"
      : "min-h-[20rem] justify-end pb-12 pt-32 lg:min-h-[24rem] lg:justify-center lg:py-20"
    : "justify-center py-14 lg:py-20";
  const dots = !image && texture === "dots";

  return (
    <Tag
      className={`relative isolate overflow-hidden bg-navy text-white ${
        dots ? "bg-linear-to-bl from-navy-raised via-navy to-navy-deep" : ""
      }`}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            preload={preload}
            sizes="100vw"
            placeholder="blur"
            className={`-z-20 object-cover ${imagePosition}`}
          />
          <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="bg-grid-dark grid-over-photo absolute inset-y-0 left-0 -z-10 hidden w-1/2 lg:block"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 ${dots ? "bg-dots-dark" : "bg-grid-dark"}`}
        />
      )}
      {preview ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-[radial-gradient(40rem_24rem_at_75%_40%,rgb(205_39_39/0.18),transparent_70%)] lg:block"
        />
      ) : null}
      <div className={`mx-auto flex w-full max-w-6xl flex-col px-5 lg:px-8 ${layout}`}>
        <div
          className={
            preview ? "lg:grid lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-12" : undefined
          }
        >
          <div className={home ? "max-w-xl" : "max-w-2xl"}>
            {!image ? (
              <span aria-hidden="true" className="mb-5 block h-[3px] w-12 bg-accent-on-dark" />
            ) : null}
            {eyebrow ? <p className="label-mono text-gold">{eyebrow}</p> : null}
            <h1
              className={`font-semibold tracking-[-0.02em] text-white ${eyebrow ? "mt-4" : ""} ${
                home
                  ? "text-[2.5rem] leading-[1.1] lg:text-[4rem] lg:leading-[1.0625]"
                  : "text-4xl leading-[1.1] lg:text-[3.25rem] lg:leading-[1.08]"
              }`}
            >
              {title}
            </h1>
            {lede ? (
              <p className="mt-5 text-lg leading-[1.875rem] text-slate-100 lg:text-xl lg:leading-8">
                {lede}
              </p>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
            ) : null}
            {footnote ? <div className="mt-6 text-sm text-slate-100">{footnote}</div> : null}
          </div>
          {preview}
        </div>
      </div>
    </Tag>
  );
}
