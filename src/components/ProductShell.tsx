import Link from "next/link";
import { ClosingBand } from "@/components/ClosingBand";
import { LoanCalculator } from "@/components/LoanCalculator";
import { PageHero } from "@/components/PageHero";
import { SiteLink } from "@/components/SiteLink";
import { VideoFacade } from "@/components/VideoFacade";
import { programPhotos } from "@/lib/photos";
import { products, site, videosFor, type Product } from "@/lib/site";

export function ProductShell({ product }: { product: Product }) {
  const others = products.filter((item) => item.slug !== product.slug);
  const [video] = videosFor(`program:${product.slug}`);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Loan products", href: "/loan-products" }, { label: product.name }]}
        title={product.name}
        lede={product.summary}
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="tnum whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
        photo={programPhotos[product.slug]}
      />

      <section aria-labelledby="terms" className="bg-surface py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
          <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="terms" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
              {product.name} terms
            </h2>
            <SiteLink href="/contact" className="self-start sm:self-auto">
              Submit a Scenario
            </SiteLink>
          </div>
          <dl data-reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6">
            {product.facts.map((fact, index, facts) => (
              <div
                key={fact.term}
                className={`rounded-r-lg border-l-[3px] border-navy bg-white px-6 py-5 ${facts.length % 2 === 1 && index === facts.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <dt className="text-sm text-muted">{fact.term}</dt>
                <dd className="mt-1 text-xl font-medium leading-[1.625rem] text-navy">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {video ? (
        <section aria-labelledby="program-video" className="py-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-[75rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-8">
            <div data-reveal className="lg:col-span-4">
              <h2 id="program-video" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
                On video
              </h2>
              <p className="mt-4 text-lg leading-[1.6] text-body">{video.title}</p>
            </div>
            <div data-reveal className="lg:col-span-8">
              <VideoFacade videoId={video.id} title={video.title} duration={video.duration} sizes="(min-width: 1024px) 760px, 100vw" />
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="calculator" className={`py-16 lg:py-24 ${video ? "border-t border-hair" : ""}`}>
        <div className="mx-auto grid w-full max-w-[75rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:gap-x-12 lg:px-8">
          <div data-reveal className="lg:col-span-4">
            <h2 id="calculator" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
              Example calculator
            </h2>
            <p className="mt-4 text-lg leading-[1.6] text-body">
              Type your own figures. Results are an example, not RSC pricing or a quote.
            </p>
          </div>
          <div data-reveal className="max-w-3xl lg:col-span-8">
            <p className="text-lg leading-[1.6] text-body">{product.body}</p>
            <div className="mt-8">
              <LoanCalculator showConstructionBudget={product.showConstructionBudget} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-programs" className="border-t border-hair py-12">
        <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-3 px-[1.125rem] lg:flex-row lg:items-baseline lg:gap-6 lg:px-8">
          <h2 id="other-programs" className="text-xl leading-[1.625rem]">
            Other programs
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[1.0625rem]">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className="font-medium text-navy underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
