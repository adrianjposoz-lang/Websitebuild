import { Layers, MapPin, ShieldCheck } from "lucide-react";
import { trustFacts } from "@/lib/site";

const icons = { shield: ShieldCheck, pin: MapPin, layers: Layers } as const;

export function TrustBar() {
  return (
    <section aria-label="At a glance" className="border-b border-line bg-paper py-6">
      <ul className="mx-auto w-full max-w-6xl divide-y divide-line px-5 sm:flex sm:gap-10 sm:divide-y-0 lg:px-8">
        {trustFacts.map((fact) => {
          const Icon = icons[fact.icon];
          return (
            <li
              key={fact.text}
              className="flex items-center gap-3 py-3 text-sm font-semibold text-navy sm:py-0"
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
              {fact.text}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
