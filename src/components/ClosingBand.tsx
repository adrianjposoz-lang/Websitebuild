import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/site";

export function ClosingBand({ title = "Have a deal in front of you?" }: { title?: string }) {
  return (
    <section aria-labelledby="closing-band" className="relative z-[1] bg-navy py-[4.5rem] text-white">
      <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-8 px-[1.125rem] lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <h2 id="closing-band" className="text-[2.5rem] leading-[1.05] lg:text-[3rem]">
          {title}
        </h2>
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <SiteLink href="/contact">Submit a Scenario</SiteLink>
          <p className="text-[0.96875rem]">
            or call{" "}
            <a href={site.phoneHref} className="whitespace-nowrap font-semibold text-white underline">
              {site.phoneLocal}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
