"use client";

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
  "mt-2 w-full scroll-mt-8 rounded-[3px] border border-field-border bg-white px-3 py-2.5 text-base font-normal text-ink aria-invalid:border-red-700 aria-invalid:ring-1 aria-invalid:ring-red-700";

const labelClass = "block text-[0.9375rem] font-medium text-ink";

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
      <p id={`${fieldIds[field]}-error`} className="mt-2 text-sm font-medium text-red-700">
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <div data-form-status={status}>
      <p className="sr-only" role="status">
        {pending ? "Sending your scenario…" : ""}
      </p>
      <div aria-live="polite" aria-atomic="true">
        {status === "success" ? (
          <div ref={summaryRef} tabIndex={-1} className="scroll-mt-8 outline-none">
            <h3 className="text-[1.75rem] leading-[1.2] text-navy">Scenario sent</h3>
            <p className="mt-3 leading-7 text-ink">{message}</p>
          </div>
        ) : status !== "idle" ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            className="mb-6 scroll-mt-8 border-l-2 border-red-700 py-1 pl-4 text-[0.9375rem] leading-6 text-red-800 outline-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-navy"
          >
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
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[3px] bg-cta px-[1.375rem] text-[0.96875rem] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-cta-hover disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-cta sm:w-auto"
          >
            {pending ? "Sending…" : "Submit a Scenario"}
          </button>
        </form>
      )}
    </div>
  );
}
