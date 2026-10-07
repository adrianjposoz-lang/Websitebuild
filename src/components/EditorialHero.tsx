import Link from "next/link";
import type { ReactNode } from "react";
import { PropertySketch, sketchLabels, streetLabels, StreetSketch, type SketchSlug } from "@/components/PropertySketch";
import { SiteLink } from "@/components/SiteLink";

export type Crumb = { label: string; href?: string };

const streetSlugs: SketchSlug[] = ["dscr", "fix-and-flip", "mid-construction"];

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="order-1 mb-[1.125rem] text-sm text-warm lg:order-none lg:mb-[1.625rem]">
      <ol className="flex flex-wrap items-center gap-x-2">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-x-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {crumb.href ? (
              <Link href={crumb.href} className="text-navy underline underline-offset-[3px]">
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

function SketchLabels({ labels }: { labels: string[] }) {
  return (
    <p
      className={`mt-2 font-serif text-[0.8125rem] italic text-warm ${
        labels.length === 3
          ? "grid grid-cols-3 text-center"
          : labels.length === 2
            ? "flex justify-between"
            : "flex justify-center"
      }`}
    >
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </p>
  );
}

/**
 * Paper hero on a 5/7 grid. Until Adrian supplies a real project photo, the media column carries
 * the property drawing on its own, larger. Never stock.
 */
export function EditorialHero({
  crumbs,
  kicker,
  title,
  lede,
  action = { href: "/contact", label: "Submit a Scenario" },
  quiet,
  facts,
  sketch,
}: {
  crumbs?: Crumb[];
  kicker?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  action?: { href: string; label: string } | null;
  quiet?: ReactNode;
  facts?: { term: string; detail: string }[];
  sketch?: SketchSlug | "street";
}) {
  const media = sketch !== undefined;

  return (
    <section
      aria-labelledby="page-title"
      className={`mx-auto flex w-full max-w-[76rem] flex-col px-[1.125rem] pb-14 pt-7 lg:px-8 lg:pt-14 ${
        media ? "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-14 lg:pb-[5.5rem]" : "lg:pb-16"
      }`}
    >
      <div className={media ? "contents lg:block" : "contents"}>
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
        {kicker ? (
          <p className="order-1 mb-[1.125rem] text-[0.9375rem] text-warm lg:order-none lg:mb-[1.625rem]">{kicker}</p>
        ) : null}
        <h1
          id="page-title"
          className="order-2 text-[clamp(3rem,16vw,4.125rem)] leading-[0.95] tracking-[-0.015em] text-navy lg:order-none lg:text-[6.5rem]"
        >
          {title}
        </h1>
        {lede ? (
          <p
            className={`order-3 mt-[1.625rem] text-[1.15625rem] leading-[1.55] text-ink lg:order-none lg:text-[1.3125rem] ${
              media ? "lg:max-w-[30ch]" : "max-w-[42ch]"
            }`}
          >
            {lede}
          </p>
        ) : null}
        {action || quiet ? (
          <div className="order-4 mt-[1.625rem] flex flex-col items-stretch gap-3.5 lg:order-none lg:mt-9 lg:flex-row lg:flex-wrap lg:items-center lg:gap-[1.375rem]">
            {action ? (
              <SiteLink href={action.href} className="w-full lg:w-auto">
                {action.label}
              </SiteLink>
            ) : null}
            {quiet ? <p className="text-[0.96875rem] text-ink">{quiet}</p> : null}
          </div>
        ) : null}
        {facts ? (
          <dl className="order-6 mt-8 border-t border-rule lg:order-none lg:mt-9 lg:max-w-[27.5rem]">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="grid gap-0.5 border-b border-rule py-[0.8125rem] text-[0.9375rem] leading-normal lg:grid-cols-[9.375rem_1fr] lg:gap-4"
              >
                <dt className="font-serif text-base italic text-warm">{fact.term}</dt>
                <dd className="text-ink">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {media ? (
        <div
          aria-hidden="true"
          className="order-5 -mx-[1.125rem] mt-9 lg:order-none lg:mx-0 lg:mr-[calc((100vw-min(100vw,76rem))/-2-2rem)] lg:mt-0"
        >
          <div className="flex aspect-[4/3] items-center justify-center bg-paper-2 px-6 lg:aspect-auto lg:h-[37.5rem] lg:px-12">
            {sketch === "street" ? (
              <>
                <div className="w-full lg:hidden">
                  <StreetSketch />
                  <SketchLabels labels={streetLabels} />
                </div>
                <ul className="hidden w-full max-w-[30rem] flex-col gap-3 lg:flex">
                  {streetSlugs.map((slug, index) => (
                    <li key={slug} className={`w-[17.5rem] ${index === 1 ? "self-end" : ""}`}>
                      <PropertySketch slug={slug} />
                      <SketchLabels labels={[streetLabels[index]]} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="w-full max-w-[18.75rem] lg:max-w-[33rem]">
                <PropertySketch slug={sketch} />
                <SketchLabels labels={sketchLabels[sketch]} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
