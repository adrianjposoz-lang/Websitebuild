import Image from "next/image";
import Link from "next/link";
import { VideoFacade } from "@/components/VideoFacade";
import {
  featuredLoans,
  formatAmount,
  formatClosed,
  loanHeading,
  programHref,
  type FundedLoan,
} from "@/data/funded-loans";
import type { DealPhoto } from "@/lib/photos";
import { videos, videosFor, youtubeChannelUrl, type VideoPlacement } from "@/lib/site";

const intro = "Real loans we funded. Some are walked through on our YouTube channel.";

/**
 * The card's real media width (page gutters, card padding and border subtracted below 768px), so at
 * 1x no request exceeds 695px and the smallest deal photos (736px wide) are never upscaled.
 */
const mediaSizes = "(min-width: 1024px) 270px, (min-width: 768px) 45vw, calc(100vw - 72px)";

function dealPhoto(loan: FundedLoan): DealPhoto | undefined {
  if (!loan.photo) return undefined;
  return { src: `/deals/${loan.photo}`, alt: loan.photoAlt ?? `Property in ${loan.city}, ${loan.state}` };
}

/** Real loans only. The featured ones, minus any whose video is not placed on this page. */
export function FundedDealCards({
  placement,
  headingLevel = "h3",
}: {
  placement: VideoPlacement;
  headingLevel?: "h3" | "h4";
}) {
  const shown = new Set<string>(videosFor(placement).map((video) => video.id));
  const loans = featuredLoans.filter((loan) => !loan.videoId || shown.has(loan.videoId));
  if (loans.length === 0) return null;
  return <DealCardGrid loans={loans} headingLevel={headingLevel} />;
}

/**
 * `reveal` is off on /funded-loans, where every filtered view shares one pathname: the reveal
 * observer runs once per pathname, so a grid mounted by a later navigation would stay hidden.
 */
export function DealCardGrid({
  loans,
  headingLevel,
  reveal = true,
}: {
  loans: readonly FundedLoan[];
  headingLevel: "h2" | "h3" | "h4";
  reveal?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <ul data-reveal={reveal ? "" : undefined} className="grid gap-6 md:grid-cols-2 md:gap-y-0 lg:grid-cols-4">
      {loans.map((loan) => {
        const photo = dealPhoto(loan);
        return (
          <li
            key={loan.id}
            className="flex flex-col rounded-lg border border-hair bg-white p-4 md:row-span-4 md:mb-6 md:grid md:grid-rows-subgrid md:gap-0"
          >
            {loan.videoId ? (
              <VideoFacade video={videos[loan.videoId]} photo={photo} sizes={mediaSizes} variant="badge" aspect="4/3" />
            ) : photo ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface">
                <Image src={photo.src} alt={photo.alt} fill sizes={mediaSizes} className="object-cover" />
                {loan.photoCaption ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2.5 left-2.5 rounded-full bg-navy-deep/85 px-2.5 py-1 text-sm font-semibold text-white"
                  >
                    {loan.photoCaption}
                  </span>
                ) : null}
              </div>
            ) : (
              <PhotoPlaceholder loan={loan} />
            )}
            <div className="px-1 pt-5">
              <Heading className="text-xl font-medium leading-[1.625rem] text-navy">
                <KeepHyphens text={loanHeading(loan)} />
              </Heading>
              {loan.closed ? <p className="mt-1 text-[0.9375rem] text-muted">Closed {formatClosed(loan.closed)}</p> : null}
            </div>
            <dl className="mx-1 mt-4 grid content-start gap-4 border-t border-hair pt-4 text-[0.9375rem] leading-normal">
              <div>
                <dt className="text-sm text-muted">Loan amount</dt>
                <dd className="mt-0.5 text-[1.375rem] font-medium leading-7 text-navy">{formatAmount(loan.loanAmount)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Program</dt>
                <dd className="mt-0.5 flex flex-col gap-1">
                  <Link
                    href={programHref(loan.program)}
                    className="inline-flex min-h-6 items-center self-start font-semibold text-navy underline"
                  >
                    <KeepHyphens text={loan.program} />
                  </Link>
                </dd>
              </div>
              {loan.purpose ? (
                <div>
                  <dt className="text-sm text-muted">Purpose</dt>
                  <dd className="mt-0.5 text-body">
                    <KeepHyphens text={loan.purpose} />
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="px-1 pb-1">
              {loan.history ? (
                <p className="mt-3 text-sm leading-[1.5] text-muted">
                  <KeepHyphens text={loan.history} />
                </p>
              ) : null}
              {loan.copy ? (
                <p className="mt-4 text-base leading-[1.6] text-body">
                  <KeepHyphens text={loan.copy} />
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Stands in for the appraisal photo until it arrives. Decorative: the card title says the same. */
function PhotoPlaceholder({ loan }: { loan: FundedLoan }) {
  return (
    <div aria-hidden="true" className="flex aspect-[4/3] w-full flex-col justify-end rounded-lg bg-navy p-5">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-on-navy">{loan.program}</span>
      <span className="mt-1.5 text-[1.75rem] font-medium leading-[2.125rem] tracking-[-0.01em] text-white">
        {loan.city}, {loan.state}
      </span>
    </div>
  );
}

/** Browsers may break a line after any hyphen ("Mid-" / "Construction"); keep hyphenated words whole. */
function KeepHyphens({ text }: { text: string }) {
  return text.split(/(\S*-\S*)/).map((part, index) =>
    part.includes("-") ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
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
          <SeeAllFundedLoans />
        </p>
        <p className="mt-4">
          <MoreOnYouTube />
        </p>
      </div>
    </section>
  );
}

const textLinkClass = "font-semibold text-navy underline decoration-1 hover:decoration-2";

export function SeeAllFundedLoans() {
  return (
    <Link href="/funded-loans" className={textLinkClass}>
      See all funded loans<span aria-hidden="true"> →</span>
    </Link>
  );
}

export function MoreOnYouTube() {
  return (
    <a
      href={youtubeChannelUrl}
      target="_blank"
      rel="noopener"
      aria-label="More on YouTube (opens YouTube in a new tab)"
      className={textLinkClass}
    >
      More on YouTube<span aria-hidden="true"> →</span>
    </a>
  );
}

export const fundedDealsIntro = intro;
