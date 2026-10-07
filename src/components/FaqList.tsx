import { faqs } from "@/lib/site";

type Faq = (typeof faqs)[number];

/** Native disclosure: keyboard, screen reader, and find-in-page support come with <details>. */
export function FaqList({ items, headingLevel = "h3" }: { items: readonly Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-hair">
      {items.map((faq) => (
        <li key={faq.id} id={faq.id} className="scroll-mt-8 border-b border-hair">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <Heading className="text-xl leading-[1.625rem]">{faq.question}</Heading>
              <span aria-hidden="true" className="text-2xl leading-none text-navy group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden text-2xl leading-none text-navy group-open:inline">
                −
              </span>
            </summary>
            {"list" in faq ? (
              <div id={`${faq.id}-answer`} className="scroll-mt-32 pb-6">
                <p className="text-[1.0625rem] leading-[1.6] text-body">We lend in {faq.list.length} states:</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[1.0625rem] leading-[1.6] text-body sm:grid-cols-3 lg:grid-cols-4">
                  {faq.list.map((state) => (
                    <li key={state}>{state}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="max-w-[65ch] pb-6 text-[1.0625rem] leading-[1.6] text-body">{faq.answer}</p>
            )}
          </details>
        </li>
      ))}
    </ul>
  );
}
