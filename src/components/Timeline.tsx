import { processSteps } from "@/lib/site";

/** Four steps on a hairline: a top rule across the row from `lg`, a left rule when stacked. */
export function Timeline() {
  return (
    <ol className="grid border-l border-hair lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:border-t">
      {processSteps.map((step, index) => (
        <li key={step.title} className="pb-8 pl-6 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-6">
          <p className="tnum text-sm font-semibold text-muted">Step {index + 1}</p>
          <h3 className="mt-2 text-xl leading-[1.625rem]">{step.title}</h3>
          <p className="mt-2 text-base leading-[1.6] text-body">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
