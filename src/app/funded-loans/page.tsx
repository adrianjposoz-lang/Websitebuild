import type { Metadata } from "next";
import { fundedLoansMetadata, FundedLoansView } from "@/components/FundedLoansView";

export const metadata: Metadata = fundedLoansMetadata;

/** `?program=` and `?state=` are rewritten in next.config.ts to the prerendered views under filter/. */
export default function FundedLoansPage() {
  return <FundedLoansView filter={{}} />;
}
