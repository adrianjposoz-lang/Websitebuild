import Image from "next/image";
import type { ReactNode } from "react";
import { SiteLink } from "@/components/SiteLink";
import type { Photo } from "@/lib/photos";

/**
 * Photo hero. Below `lg` the photo sits above solid navy text; from `lg` it is full-bleed and the
 * text sits on a left navy scrim dark enough to keep white text at or above 4.5:1.
 */
export function PhotoHero({
  kicker,
  title,
  lede,
  quiet,
  photo,
}: {
  kicker: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  quiet: ReactNode;
  photo: Photo;
}) {
  return (
    <section aria-labelledby="page-title" className="relative z-[1] isolate overflow-hidden bg-navy-deep text-white">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="hero-settle object-cover object-[70%_60%] lg:object-[62%_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(7_20_34/0.9)_0%,rgb(7_20_34/0.82)_42%,rgb(7_20_34/0.35)_64%,rgb(7_20_34/0)_86%)] lg:block"
        />
      </div>
      <div className="mx-auto flex w-full max-w-[76rem] flex-col px-[1.125rem] pb-12 pt-9 lg:min-h-[42rem] lg:justify-center lg:px-8 lg:py-24">
        <div className="max-w-[34rem]">
          <p className="text-[0.9375rem] font-medium text-white/90">{kicker}</p>
          <h1
            id="page-title"
            className="mt-4 font-sans! text-[clamp(2.75rem,12.5vw,3.5rem)] font-semibold! leading-[1.02] tracking-[-0.03em] lg:mt-5 lg:text-[4.5rem]"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-[30ch] text-[1.15625rem] leading-[1.55] text-white/90 lg:mt-6 lg:text-[1.3125rem]">
            {lede}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-4 lg:mt-9 lg:flex-row lg:items-center lg:gap-6">
            <SiteLink href="/contact" className="w-full lg:w-auto">
              Submit a Scenario
            </SiteLink>
            <p className="text-[0.96875rem]">{quiet}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Confirmed figures only. Do not add a row without a confirmed source. */
export const glance = [
  { value: "24 hours", label: "Term sheet" },
  { value: "10 days", label: "Close" },
  { value: "40 states", label: "All except VT, MN, UT, NV, ND, SD, WV, ME, OR and ID" },
] as const;

export function GlanceRow() {
  return (
    <section aria-label="At a glance" className="relative z-[1] border-b border-rule bg-white">
      <dl className="mx-auto grid w-full max-w-[76rem] px-[1.125rem] lg:grid-cols-3 lg:px-8">
        {glance.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse justify-end gap-1 py-6 lg:py-9 ${
              index > 0 ? "border-t border-rule lg:border-l lg:border-t-0 lg:pl-10" : ""
            } ${index < glance.length - 1 ? "lg:pr-10" : ""}`}
          >
            <dt className="text-[0.9375rem] leading-normal text-warm">{item.label}</dt>
            <dd className="font-sans text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-navy tabular-nums lg:text-[2.5rem]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
