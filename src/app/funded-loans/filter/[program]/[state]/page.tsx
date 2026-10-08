import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fundedLoansMetadata, FundedLoansView } from "@/components/FundedLoansView";
import { parseFilter, programs, statesInData } from "@/data/funded-loans";

export const metadata: Metadata = fundedLoansMetadata;

/**
 * Every filter combination, prerendered so filtering works without JavaScript. Reached through the
 * `/funded-loans?program=…&state=…` rewrites in next.config.ts; "all" stands for an unset filter.
 */
export function generateStaticParams() {
  const programValues = ["all", ...programs.map((program) => program.slug)];
  const stateValues = ["all", ...statesInData().map((code) => code.toLowerCase())];
  return programValues.flatMap((program) => stateValues.map((state) => ({ program, state })));
}

export default async function FilteredFundedLoansPage({ params }: PageProps<"/funded-loans/filter/[program]/[state]">) {
  const { program, state } = await params;
  const filter = parseFilter({ program, state });
  if ((program !== "all" && !filter.program) || (state !== "all" && !filter.state)) notFound();
  return <FundedLoansView filter={filter} />;
}
