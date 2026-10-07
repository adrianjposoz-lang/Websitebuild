"use client";

import { useState } from "react";
import { products, site } from "@/lib/site";

const fieldClass =
  "mt-2 w-full border border-line bg-white px-3 py-2 text-base font-normal text-foreground";

export function ScenarioForm() {
  const [reviewed, setReviewed] = useState(false);

  if (reviewed) {
    return (
      <div className="border border-line bg-paper p-5" role="status">
        <h3 className="text-2xl font-semibold text-navy">Nothing was sent</h3>
        <p className="mt-3 leading-7 text-muted">
          This preview does not deliver a scenario yet. Call {site.phoneDisplay} or email{" "}
          {site.email} if you need to reach the office now.
        </p>
      </div>
    );
  }

  return (
    <form
      className="border border-line bg-paper p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setReviewed(true);
      }}
    >
      <div className="grid gap-4">
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-name">
          Name
          <input
            id="scenario-name"
            name="name"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-email">
          Email
          <input
            id="scenario-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-phone">
          Phone
          <input
            id="scenario-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-address">
          Property address
          <input
            id="scenario-address"
            name="propertyAddress"
            autoComplete="street-address"
            required
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-program">
          Loan program
          <select
            id="scenario-program"
            name="program"
            required
            defaultValue=""
            className={fieldClass}
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
        <label className="block text-sm font-semibold text-navy" htmlFor="scenario-notes">
          Scenario notes
          <textarea
            id="scenario-notes"
            name="notes"
            required
            rows={5}
            className={fieldClass}
          />
        </label>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Submitting stays on this page and does not deliver the scenario yet.
      </p>
      <button
        type="submit"
        className="mt-5 inline-flex min-h-11 items-center justify-center bg-cta px-5 text-sm font-semibold text-white hover:bg-cta-hover"
      >
        Submit a Scenario
      </button>
    </form>
  );
}
