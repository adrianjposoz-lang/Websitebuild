import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/site";

export function ClosingBand({ title = "Have a deal in front of you?" }: { title?: string }) {
  return (
    <section aria-labelledby="closing-band" className="bg-navy py-16 text-white lg:py-24">
      <div
        data-reveal
        className="mx-auto flex w-full max-w-[75rem] flex-col gap-8 px-[1.125rem] lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <h2 id="closing-band" className="text-[1.75rem] leading-[2.25rem] text-white lg:text-4xl lg:leading-10">
          {title}
        </h2>
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <SiteLink href="/contact">Submit a Scenario</SiteLink>
          <p className="text-[0.96875rem] text-on-navy">
            or call{" "}
            <a href={site.phoneHref} className="tnum whitespace-nowrap font-semibold text-white underline">
              {site.phoneLocal}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
