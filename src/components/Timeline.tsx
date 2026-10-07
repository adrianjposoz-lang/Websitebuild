import { withAmp } from "@/components/Amp";
import { processSteps } from "@/lib/site";

const NAVY = "#0b1f3a";

/** Static, hand-inked baseline. Only "Evaluation & Term Sheet" carries the red ampersand. */
export function Timeline() {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1000 24"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 hidden h-6 w-full lg:block"
      >
        <path
          d="M4 12.6 C160 10.8 300 13.9 470 11.7 S 800 13.4 996 11.4"
          fill="none"
          stroke={NAVY}
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ol className="relative lg:grid lg:grid-cols-4 lg:gap-8">
        {processSteps.map((step, index) => (
          <li key={step.title} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 lg:block">
            <span aria-hidden="true" className="relative flex justify-center lg:block lg:h-6">
              <span className="relative z-[1] mt-0.5 block size-5 rounded-full border-[1.6px] border-navy bg-paper lg:mt-0.5" />
              {index < processSteps.length - 1 ? (
                <svg
                  viewBox="0 0 24 100"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-1/2 top-6 w-6 -translate-x-1/2 lg:hidden"
                >
                  <path
                    d="M12.4 0 C11 30 13.6 60 11.6 100"
                    fill="none"
                    stroke={NAVY}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              ) : null}
            </span>
            <div className="pb-10 lg:pb-0 lg:pt-6">
              <h3 className="text-2xl leading-[1.2] text-navy">
                <span aria-hidden="true" className="mr-2 italic text-warm">
                  {index + 1}
                </span>
                {step.title.startsWith("Evaluation") ? withAmp(step.title) : step.title}
              </h3>
              <p className="mt-2 text-base leading-[1.6] text-ink">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
