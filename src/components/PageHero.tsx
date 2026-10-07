import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteLink } from "@/components/SiteLink";
import type { Photo } from "@/lib/photos";

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
}: {
  crumbs?: Crumb[];
  title: ReactNode;
  lede?: ReactNode;
  action?: { href: string; label: string } | null;
  quiet?: ReactNode;
  photo?: Photo;
}) {
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
