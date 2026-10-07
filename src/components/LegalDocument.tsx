import { Fragment } from "react";
import { EditorialHero } from "@/components/EditorialHero";
import type { LegalDocument as LegalDocumentData, LegalInline } from "@/lib/legal";

const linkClass = "break-words font-semibold text-navy underline";

function Inline({ content }: { content: LegalInline[] }) {
  return content.map((part, index) =>
    typeof part === "string" ? (
      <Fragment key={index}>{part}</Fragment>
    ) : (
      <a key={index} href={part.href} className={linkClass}>
        {part.text}
      </a>
    ),
  );
}

export function LegalDocument({ doc }: { doc: LegalDocumentData }) {
  return (
    <main id="main">
      <EditorialHero crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]} title={doc.title} action={null} />
      <div className="border-t border-rule">
        <article className="mx-auto w-full max-w-[76rem] px-[1.125rem] py-14 lg:px-8 lg:py-20">
          <div className="max-w-[68ch] text-[1.0625rem] leading-[1.65] text-ink">
            <p className="text-[0.9375rem] text-warm">{doc.dateLine}</p>
            <p className="mt-5 font-serif text-[1.1875rem] leading-[1.55] lg:text-[1.3125rem]">{doc.intro}</p>
            {doc.blocks.map((block, index) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={index} className="mt-12 font-serif text-[1.5rem] leading-tight text-navy lg:text-[1.75rem]">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="mt-7 font-serif text-[1.1875rem] italic leading-snug text-navy">
                      {block.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p key={index} className="mt-4">
                      <Inline content={block.content} />
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={index} className="mt-4 list-disc space-y-2 pl-6 marker:text-warm">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Inline content={item} />
                        </li>
                      ))}
                    </ul>
                  );
                case "address":
                  return (
                    <address key={index} className="mt-4 not-italic">
                      {block.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  );
              }
            })}
          </div>
        </article>
      </div>
    </main>
  );
}
