import type { Metadata } from "next";
import { fundedLoansMetadata, FundedLoansView } from "@/components/FundedLoansView";

export const metadata: Metadata = fundedLoansMetadata;

/** `?program=` is rewritten in next.config.ts to the prerendered views under filter/; `?state=` is ignored. */
export default function FundedLoansPage() {
  return <FundedLoansView filter={{}} />;
}
