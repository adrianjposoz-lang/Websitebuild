import Image from "next/image";
import Link from "next/link";
import { VideoFacade } from "@/components/VideoFacade";
import { dealPhotos } from "@/lib/photos";
import { fundedDeals, videos, videosFor, youtubeChannelUrl, type VideoPlacement } from "@/lib/site";

const intro = "Real loans we funded. Some are walked through on our YouTube channel.";

const mediaSizes = "(min-width: 1024px) 270px, (min-width: 768px) 45vw, 100vw";

/**
 * Stands in for a deal photo where RSC has none: never stock or generated imagery. Decorative; the
 * card's heading and terms carry the meaning.
 */
function CityPanel({ city, program }: { city: string; program: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[4/3] w-full flex-col justify-end rounded-lg bg-navy p-5"
    >
      <span className="text-sm font-medium uppercase tracking-[0.08em] text-[#cbd5e1]">{program}</span>
      <span className="mt-1 text-[1.75rem] font-medium leading-[2.125rem] text-white">
        {city}
      </span>
    </div>
  );
}

/** Real loans only. */
export function FundedDealCards({
  placement,
  headingLevel = "h3",
}: {
  placement: VideoPlacement;
  headingLevel?: "h3" | "h4";
}) {
  const shown = new Set(videosFor(placement).map((video) => video.id));
  const deals = fundedDeals.filter((deal) => !("videoId" in deal) || shown.has(deal.videoId));
  if (deals.length === 0) return null;
  const Heading = headingLevel;

  return (
    <ul data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {deals.map((deal) => {
        const photo = "photo" in deal ? dealPhotos[deal.photo] : undefined;
        return (
          <li
            key={`${deal.heading} ${deal.amount.value}`}
            className="flex flex-col rounded-lg border border-hair bg-white p-4"
          >
            {"videoId" in deal ? (
              <VideoFacade video={videos[deal.videoId]} photo={photo} sizes={mediaSizes} variant="badge" aspect="4/3" />
            ) : photo ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface">
                <Image src={photo.src} alt={photo.alt} fill sizes={mediaSizes} className="object-cover" />
              </div>
            ) : (
              <CityPanel city={deal.heading} program={deal.programs[0].label} />
            )}
            <div className="flex flex-col px-1 pb-1 pt-5">
              <Heading className="text-xl font-medium leading-[1.625rem] text-navy">{deal.heading}</Heading>
              {"closed" in deal ? <p className="mt-1 text-[0.9375rem] text-muted">Closed {deal.closed}</p> : null}
              <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hair pt-4 text-[0.9375rem] leading-normal">
                <div className="col-span-2">
                  <dt className="text-sm text-muted">{deal.amount.label}</dt>
                  <dd className="mt-0.5 text-[1.375rem] font-medium leading-7 text-navy">{deal.amount.value}</dd>
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
                {"purpose" in deal ? (
                  <div>
                    <dt className="text-sm text-muted">Purpose</dt>
                    <dd className="mt-0.5 text-body">{deal.purpose}</dd>
                  </div>
                ) : null}
              </dl>
              {"history" in deal ? <p className="mt-3 text-sm leading-[1.5] text-muted">{deal.history}</p> : null}
              {"story" in deal ? <p className="mt-4 text-base leading-[1.6] text-body">{deal.story}</p> : null}
            </div>
          </li>
        );
      })}
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
        <p className="mt-10">
          <MoreOnYouTube />
        </p>
      </div>
    </section>
  );
}

export function MoreOnYouTube() {
  return (
    <a
      href={youtubeChannelUrl}
      target="_blank"
      rel="noopener"
      aria-label="More on YouTube (opens YouTube in a new tab)"
      className="font-semibold text-navy underline decoration-1 hover:decoration-2"
    >
      More on YouTube<span aria-hidden="true"> →</span>
    </a>
  );
}

export const fundedDealsIntro = intro;
