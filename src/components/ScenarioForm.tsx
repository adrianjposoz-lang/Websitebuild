"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitScenario } from "@/app/contact/actions";
import {
  honeypotField,
  initialScenarioState,
  scenarioLimits,
  type ScenarioField,
} from "@/lib/scenario";
import { products } from "@/lib/site";

const fieldClass =
  "mt-2 w-full scroll-mt-32 rounded-md border border-field-border bg-white px-3 py-2.5 text-base font-normal text-foreground aria-invalid:border-red-700 aria-invalid:ring-1 aria-invalid:ring-red-700";

const labelClass = "block text-sm font-semibold text-navy";

const fieldOrder: ScenarioField[] = ["name", "email", "phone", "propertyAddress", "program", "notes"];

const fieldIds: Record<ScenarioField, string> = {
  name: "scenario-name",
  email: "scenario-email",
  phone: "scenario-phone",
  propertyAddress: "scenario-address",
  program: "scenario-program",
  notes: "scenario-notes",
};

/** `notice` renders above the submit button; the contact page passes the "doesn't send yet" note when delivery is off. */
export function ScenarioForm({ notice }: { notice?: ReactNode }) {
  const [state, formAction, pending] = useActionState(submitScenario, initialScenarioState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const { status, message, fieldErrors, values } = state;

  useEffect(() => {
    if (status === "idle") return;
    if (status === "invalid") {
      const first = fieldOrder.find((field) => fieldErrors[field]);
      if (first) {
        document.getElementById(fieldIds[first])?.focus();
        return;
      }
    }
    summaryRef.current?.focus();
  }, [state, status, fieldErrors]);

  const errorProps = (field: ScenarioField) =>
    fieldErrors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${fieldIds[field]}-error` }
      : {};

  const errorText = (field: ScenarioField) =>
    fieldErrors[field] ? (
      <p id={`${fieldIds[field]}-error`} className="mt-2 flex gap-1.5 text-sm font-medium text-red-700">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <div className="p-6 lg:p-8" data-form-status={status}>
      <p className="sr-only" role="status">
        {pending ? "Sending your scenario…" : ""}
      </p>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <div ref={summaryRef} tabIndex={-1} className="scroll-mt-28 outline-none">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-cta-tint text-cta">
              <CircleCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-navy">Scenario sent</h3>
            <p className="mt-3 leading-7 text-muted">{message}</p>
          </div>
        ) : status !== "idle" ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            className="mb-6 flex scroll-mt-28 gap-3 rounded-md border border-red-700/40 bg-red-50 p-4 text-[0.9375rem] leading-6 text-red-800 outline-none focus-visible:ring-2 focus-visible:ring-red-700"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
            <p>{message}</p>
          </div>
        ) : null}
      </div>

      {status === "success" ? null : (
        <form action={formAction} noValidate className="relative">
          <div className="grid gap-5">
            <div>
              <label className={labelClass} htmlFor={fieldIds.name}>
                Name
                <input
                  id={fieldIds.name}
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={scenarioLimits.name}
                  defaultValue={values.name}
                  className={fieldClass}
                  {...errorProps("name")}
                />
              </label>
              {errorText("name")}
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldIds.email}>
                Email
                <input
                  id={fieldIds.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={scenarioLimits.email}
                  defaultValue={values.email}
                  className={fieldClass}
                  {...errorProps("email")}
                />
              </label>
              {errorText("email")}
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldIds.phone}>
                Phone
                <input
                  id={fieldIds.phone}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={scenarioLimits.phone}
                  defaultValue={values.phone}
                  className={fieldClass}
                  {...errorProps("phone")}
                />
              </label>
              {errorText("phone")}
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldIds.propertyAddress}>
                Property address
                <input
                  id={fieldIds.propertyAddress}
                  name="propertyAddress"
                  autoComplete="street-address"
                  required
                  maxLength={scenarioLimits.propertyAddress}
                  defaultValue={values.propertyAddress}
                  className={fieldClass}
                  {...errorProps("propertyAddress")}
                />
              </label>
              {errorText("propertyAddress")}
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldIds.program}>
                Loan program
                <select
                  key={values.program}
                  id={fieldIds.program}
                  name="program"
                  required
                  defaultValue={values.program}
                  className={fieldClass}
                  {...errorProps("program")}
                >
                  <option value="" disabled>
                    Select a program
                  </option>
                  {products.map((product) => (
                    <option key={product.slug} value={product.slug}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
              {errorText("program")}
            </div>
            <div>
              <label className={labelClass} htmlFor={fieldIds.notes}>
                Scenario notes
                <textarea
                  id={fieldIds.notes}
                  name="notes"
                  required
                  rows={5}
                  maxLength={scenarioLimits.notes}
                  defaultValue={values.notes}
                  className={fieldClass}
                  {...errorProps("notes")}
                />
              </label>
              {errorText("notes")}
            </div>
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 size-px overflow-hidden">
            <label htmlFor="scenario-company-website">
              Company website
              <input
                id="scenario-company-website"
                name={honeypotField}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </label>
          </div>
          {notice}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-cta px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-cta-hover disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-cta sm:w-auto"
          >
            {pending ? "Sending…" : "Submit a Scenario"}
          </button>
        </form>
      )}
    </div>
  );
}
