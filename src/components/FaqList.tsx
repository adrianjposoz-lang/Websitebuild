import { faqs } from "@/lib/site";

type Faq = (typeof faqs)[number];

/** Native disclosure: keyboard, screen reader, and find-in-page support come with <details>. */
export function FaqList({ items, headingLevel = "h3" }: { items: readonly Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-rule">
      {items.map((faq) => (
        <li key={faq.id} id={faq.id} className="scroll-mt-8 border-b border-rule">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <Heading className="font-serif text-[1.375rem] leading-[1.3] text-navy lg:text-[1.75rem] lg:leading-[1.2]">
                {faq.question}
              </Heading>
              <span
                aria-hidden="true"
                className="mt-0.5 font-serif text-2xl leading-none text-navy group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="mt-0.5 hidden font-serif text-2xl leading-none text-navy group-open:inline"
              >
                −
              </span>
            </summary>
            <p className="max-w-[60ch] pb-6 text-[1.0625rem] leading-[1.6] text-ink">{faq.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
