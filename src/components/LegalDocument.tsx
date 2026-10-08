import { Fragment } from "react";
import { PageHero } from "@/components/PageHero";
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
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]} title={doc.title} action={null} />
      <div className="border-t border-hair">
        <article className="mx-auto w-full max-w-[75rem] px-[1.125rem] py-14 lg:px-8 lg:py-20">
          <div className="max-w-[68ch] text-[1.0625rem] leading-[1.65] text-body">
            <p className="tnum text-[0.9375rem] text-muted">{doc.dateLine}</p>
            <p className="mt-5 text-lg leading-[1.6] text-ink lg:text-xl">{doc.intro}</p>
            {doc.blocks.map((block, index) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={index} className="mt-12 text-2xl leading-8 lg:text-[1.75rem] lg:leading-9">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="mt-7 text-xl leading-[1.625rem]">
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
                    <ul key={index} className="mt-4 list-disc space-y-2 pl-6 marker:text-muted">
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
