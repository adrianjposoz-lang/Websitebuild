import { FundedDealCards, fundedDealsIntro, MoreOnYouTube } from "@/components/FundedDeals";
import { VideoFacade } from "@/components/VideoFacade";
import { videosFor } from "@/lib/site";

/** Home band after the process steps: the real funded deals first, then four videos. */
export function FromTheLender() {
  const explainers = videosFor("home-explainers");
  const hasDeals = videosFor("home-deals").length > 0;
  if (!hasDeals && explainers.length === 0) return null;

  return (
    <section aria-labelledby="from-the-lender" className="border-t border-hair py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
        <div data-reveal className="max-w-[44rem]">
          <h2 id="from-the-lender" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
            From the lender
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-body">
            Deals we funded and how hard money works, on video.
          </p>
        </div>

        {hasDeals ? (
          <div className="mt-12">
            <div data-reveal className="max-w-[44rem]">
              <h3 className="text-2xl leading-8">Funded deals</h3>
              <p className="mt-2 text-base leading-[1.6] text-body">{fundedDealsIntro}</p>
            </div>
            <div className="mt-6">
              <FundedDealCards placement="home-deals" headingLevel="h4" />
            </div>
          </div>
        ) : null}

        {explainers.length > 0 ? (
          <div className="mt-14">
            <h3 data-reveal className="text-2xl leading-8">
              How hard money works
            </h3>
            <ul data-reveal className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {explainers.map((video) => (
                <li key={video.id}>
                  <VideoFacade
                    video={video}
                    sizes="(min-width: 1024px) 270px, (min-width: 768px) 45vw, 100vw"
                    variant="badge"
                  />
                  <p className="mt-3 text-base font-medium leading-[1.5] text-navy">
                    {"caption" in video ? video.caption : video.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-10">
          <MoreOnYouTube />
        </p>
      </div>
    </section>
  );
}
