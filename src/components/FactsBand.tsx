import Link from "next/link";
import { verifiedFacts } from "@/lib/site";

const states = verifiedFacts.find((fact) => fact.id === "lending-states");

/** With fewer than 3 verified facts this is one sentence, not a stat grid. */
export function FactsBand() {
  if (!states) return null;
  return (
    <section aria-label="Where we lend" className="bg-surface">
      <div data-reveal className="mx-auto w-full max-w-[75rem] px-[1.125rem] py-10 lg:px-8 lg:py-12">
        <p className="text-2xl font-medium leading-8 text-navy lg:text-[1.75rem] lg:leading-9">
          <Link href="/faqs#where-we-lend-answer" className="underline decoration-1 hover:decoration-2">
            We lend in <span className="tnum">{states.value}</span> states.
          </Link>
        </p>
      </div>
    </section>
  );
}
