import { PanelHeader } from "@/components/Panel";
import { ProductIcon } from "@/components/ProductIcon";
import { products } from "@/lib/site";

const fieldLabel = "font-mono text-xs uppercase tracking-[0.06em] text-slate-300";
const fieldBox = "mt-2 flex h-10 items-center rounded-md border border-white/25 px-3";

const steps = ["Submit", "Term sheet", "Underwriting", "Close"];

function Field({ label, width }: { label: string; width: string }) {
  return (
    <div>
      <p className={fieldLabel}>{label}</p>
      <div className={fieldBox}>
        <span className={`skeleton h-2.5 rounded ${width}`} />
      </div>
    </div>
  );
}

/**
 * Decorative only: no inputs, no values, hidden from assistive tech and pointer events.
 * The shell is navy-raised at 95% (not 80%) because the scrim thins to 35% at the hero's right edge;
 * at 80% the gold chip text falls to 3.76:1 over a white photo pixel.
 */
export function HeroPreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden select-none overflow-hidden rounded-lg border border-white/15 bg-navy-raised/95 shadow-[0_1px_0_0_rgb(255_255_255/0.06)_inset] backdrop-blur-sm lg:block"
    >
      <PanelHeader
        skin="dark"
        label={
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-on-dark" />
            Scenario
          </span>
        }
        chip="Draft"
      />
      <div className="space-y-5 px-5 py-6">
        <Field label="Property address" width="w-4/5" />
        <div>
          <p className={fieldLabel}>Loan program</p>
          <ul className="mt-2 flex gap-2">
            {products.map((product) => (
              <li
                key={product.slug}
                className="inline-flex size-7 items-center justify-center rounded-md border border-white/15 text-gold"
              >
                <ProductIcon slug={product.slug} className="size-4" strokeWidth={1.75} />
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Purchase price" width="w-3/5" />
          <Field label="Estimated rehab" width="w-1/2" />
        </div>
        <Field label="Exit strategy" width="w-2/3" />
      </div>
      <ol className="flex flex-wrap justify-between gap-x-2 gap-y-1 border-t border-white/10 px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-slate-400">
        {steps.map((step, index) => (
          <li key={step} className={index === 0 ? "text-gold" : undefined}>
            {String(index + 1).padStart(2, "0")} {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
