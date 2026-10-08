import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { SiteLink } from "@/components/SiteLink";
import type { HeroPhoto, Photo } from "@/lib/photos";

export type Crumb = { label: string; href?: string };

function BreadcrumbStrip({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-hair bg-surface">
      <ol className="mx-auto flex w-full max-w-[75rem] flex-wrap items-center gap-x-2 px-[1.125rem] py-3 text-[0.9375rem] text-muted lg:px-8">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-x-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="font-medium text-navy underline">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const MOBILE = "(max-width: 767px)";

/**
 * Home only: a full-bleed photo with copy bottom-left on a navy gradient. The gradient is drawn by
 * the copy block's ::before at 263% (1 / .38) of the block's height, pinned to its bottom, so the
 * copy always sits in the gradient's bottom 38%, where it is at least .80 opaque: white text stays
 * above 7:1 even over a pure-white pixel, however the copy wraps.
 */
function FullHero({
  title,
  lede,
  action,
  quiet,
  photo,
}: {
  title: ReactNode;
  lede?: ReactNode;
  action: { href: string; label: string } | null;
  quiet?: ReactNode;
  photo: HeroPhoto;
}) {
  const common = { alt: photo.alt, sizes: "100vw", fill: true } as const;
  const { props: desktop } = getImageProps({ ...common, src: photo.src });
  const { props: mobile } = getImageProps({ ...common, src: photo.mobileSrc });
  preload(mobile.src, { as: "image", imageSrcSet: mobile.srcSet, imageSizes: "100vw", media: MOBILE, fetchPriority: "high" });
  preload(desktop.src, {
    as: "image",
    imageSrcSet: desktop.srcSet,
    imageSizes: "100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });
  const { style, ...img } = desktop;

  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate flex min-h-[80svh] flex-col justify-end overflow-hidden bg-navy text-white lg:min-h-[88svh]"
    >
      <picture>
        <source media={MOBILE} srcSet={mobile.srcSet} sizes="100vw" />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...img} style={style} fetchPriority="high" loading="eager" className="-z-10 object-cover" />
      </picture>
      <div className="relative isolate mx-auto w-full max-w-[75rem] px-[1.125rem] pb-10 pt-4 before:pointer-events-none before:absolute before:-inset-x-[100vw] before:bottom-0 before:-z-10 before:h-[263.2%] before:bg-[linear-gradient(to_top,rgb(11_31_58/0.92)_0%,rgb(11_31_58/0.8)_38%,rgb(11_31_58/0)_72%)] before:content-[''] lg:px-8 lg:pb-14">
        <div data-hero-copy="" className="max-w-[40rem]">
          <h1
            id="page-title"
            className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.025em] text-white"
          >
            {title}
          </h1>
          {lede ? <p className="mt-4 max-w-[36ch] text-lg leading-[1.55] text-on-navy lg:mt-5 lg:text-xl">{lede}</p> : null}
          {action || quiet ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-8">
              {action ? <SiteLink href={action.href}>{action.label}</SiteLink> : null}
              {quiet ? <p className="text-[0.96875rem] text-on-navy">{quiet}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Copy on 5 columns, photo on 7 bleeding to the right viewport edge from `lg`; below `lg` the photo
 * runs full width under the copy. Text never sits on the photo.
 */
export function PageHero({
  crumbs,
  title,
  lede,
  action = { href: "/contact", label: "Submit a Scenario" },
  quiet,
  photo,
  variant = "split",
}: {
  crumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  action?: { href: string; label: string } | null;
  quiet?: ReactNode;
  photo?: Photo | HeroPhoto;
  variant?: "split" | "full";
}) {
  if (variant === "full" && photo && "mobileSrc" in photo) {
    return <FullHero title={title} lede={lede} action={action} quiet={quiet} photo={photo} />;
  }
  return (
    <>
      {crumbs ? <BreadcrumbStrip crumbs={crumbs} /> : null}
      <section aria-labelledby="page-title">
        <div
          className={`mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8 ${
            photo ? "py-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:py-16" : "py-14 lg:py-20"
          }`}
        >
          <div className={photo ? "lg:col-span-5" : "max-w-[46rem]"}>
            <h1
              id="page-title"
              className="text-[2.5rem] leading-[2.75rem] tracking-[-0.022em] lg:text-[3.5rem] lg:leading-[3.625rem]"
            >
              {title}
            </h1>
            {lede ? <p className="mt-5 max-w-[36ch] text-lg leading-[1.6] text-body lg:text-xl">{lede}</p> : null}
            {action || quiet ? (
              <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                {action ? <SiteLink href={action.href}>{action.label}</SiteLink> : null}
                {quiet ? <p className="text-[0.96875rem] text-body">{quiet}</p> : null}
              </div>
            ) : null}
          </div>

          {photo ? (
            <div className="mt-10 lg:col-span-7 lg:mr-[calc((100vw-min(100vw,75rem))/-2-2rem)] lg:mt-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface lg:aspect-auto lg:h-[35rem] lg:rounded-r-none">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
