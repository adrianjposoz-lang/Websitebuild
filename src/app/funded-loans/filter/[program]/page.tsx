import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fundedLoansMetadata, FundedLoansView } from "@/components/FundedLoansView";
import { parseFilter, programs } from "@/data/funded-loans";

export const metadata: Metadata = fundedLoansMetadata;

/**
 * One view per program, prerendered so filtering works without JavaScript. Reached through the
 * `/funded-loans?program=…` rewrite in next.config.ts.
 */
export function generateStaticParams() {
  return programs.map((program) => ({ program: program.slug }));
}

export default async function FilteredFundedLoansPage({ params }: PageProps<"/funded-loans/filter/[program]">) {
  const { program } = await params;
  const filter = parseFilter({ program });
  if (!filter.program) notFound();
  return <FundedLoansView filter={filter} />;
}
