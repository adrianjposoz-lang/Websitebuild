import Link from "next/link";
import { VideoFacade } from "@/components/VideoFacade";
import { fundedDeals } from "@/lib/videos";

/** Real loans only. Illustrative samples live in SampleScenarios and never appear here. */
export function FundedDeals() {
  return (
    <section aria-labelledby="funded-deals" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
        <div data-reveal className="max-w-[44rem]">
          <h2 id="funded-deals" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
            Funded deals
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-body">
            Real loans we funded, walked through on our YouTube channel. Figures are as stated in each video.
          </p>
        </div>
        <ul data-reveal className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fundedDeals.map((deal) => (
            <li key={deal.video.id} className="flex flex-col rounded-lg border border-hair bg-white p-4 lg:p-5">
              <VideoFacade
                video={deal.video}
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
              />
              <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                <h3 className="text-xl leading-[1.625rem]">{deal.heading}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hair pt-4 text-[0.9375rem] leading-normal">
                  <div>
                    <dt className="text-sm text-muted">{deal.amount.label}</dt>
                    <dd className="tnum mt-0.5 text-[1.375rem] font-medium leading-7 text-navy">{deal.amount.value}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">{deal.programs.length > 1 ? "Programs" : "Program"}</dt>
                    <dd className="mt-0.5 flex flex-col gap-1">
                      {deal.programs.map((program) => (
                        <Link
                          key={program.href}
                          href={program.href}
                          className="inline-flex min-h-6 items-center self-start font-semibold text-navy underline"
                        >
                          {program.label}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-base leading-[1.6] text-body">{deal.story}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
