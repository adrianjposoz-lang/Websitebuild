"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { processSteps } from "@/lib/site";

export function FundingSteps() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;
    list.dataset.inview = "false";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          list.dataset.inview = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <ol
      ref={listRef}
      aria-label="Funding process"
      className="relative mt-10 lg:mt-14 lg:grid lg:grid-cols-4 lg:gap-8"
    >
      <span
        aria-hidden="true"
        data-stepper-line="y"
        className="absolute bottom-6 left-6 top-6 w-0.5 bg-gold lg:hidden"
      />
      <span
        aria-hidden="true"
        data-stepper-line="x"
        className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-gold lg:block"
      />
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="relative pb-10 pl-16 last:pb-0 lg:flex lg:flex-col lg:items-center lg:pb-0 lg:pl-0 lg:text-center"
        >
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 z-10 flex size-12 items-center justify-center rounded-full font-mono text-lg font-medium text-white ring-8 ring-white lg:relative ${
              index === 0 ? "bg-cta" : "bg-navy"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="pt-2.5 text-[1.375rem] font-semibold leading-7 tracking-[-0.01em] text-navy lg:mt-5 lg:pt-0 lg:text-xl">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-base leading-7 text-muted lg:max-w-[15rem]">{step.text}</p>
          {index === 0 ? (
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cta underline underline-offset-4"
            >
              Submit a Scenario
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
