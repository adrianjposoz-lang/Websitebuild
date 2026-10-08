import Link from "next/link";
import { VideoFacade } from "@/components/VideoFacade";
import { fundedDeals, videos, videosFor, type VideoPlacement } from "@/lib/site";

const intro = "Real loans we funded, walked through on our YouTube channel. Figures are as stated in each video.";

/** Real loans only. Illustrative samples live in SampleScenarios and never appear here. */
export function FundedDealCards({
  placement,
  headingLevel = "h3",
}: {
  placement: VideoPlacement;
  headingLevel?: "h3" | "h4";
}) {
  const shown = new Set(videosFor(placement).map((video) => video.id));
  const deals = fundedDeals.filter((deal) => shown.has(deal.videoId));
  if (deals.length === 0) return null;
  const Heading = headingLevel;

  return (
    <ul data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <li key={deal.videoId} className="flex flex-col rounded-lg border border-hair bg-white p-4 lg:p-5">
          <VideoFacade video={videos[deal.videoId]} sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw" />
          <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
            <Heading className="text-xl font-medium leading-[1.625rem] text-navy">{deal.heading}</Heading>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hair pt-4 text-[0.9375rem] leading-normal">
              {"amount" in deal ? (
                <div>
                  <dt className="text-sm text-muted">{deal.amount.label}</dt>
                  <dd className="mt-0.5 text-[1.375rem] font-medium leading-7 text-navy">{deal.amount.value}</dd>
                </div>
              ) : null}
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
  );
}

/** Standalone band, used on /loan-products. Home nests the cards in the From the lender band. */
export function FundedDeals({ placement }: { placement: VideoPlacement }) {
  if (videosFor(placement).length === 0) return null;
  return (
    <section aria-labelledby="funded-deals" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
        <div data-reveal className="max-w-[44rem]">
          <h2 id="funded-deals" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
            Funded deals
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-body">{intro}</p>
        </div>
        <div className="mt-10">
          <FundedDealCards placement={placement} />
        </div>
      </div>
    </section>
  );
}

export const fundedDealsIntro = intro;
