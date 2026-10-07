"use client";

import { useMemo, useState } from "react";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const labelClass = "block text-[0.9375rem] font-medium text-ink";
const inputClass =
  "mt-2 w-full rounded-[3px] border border-field-border bg-white px-3 py-2.5 text-base font-normal text-ink";

export function LoanCalculator({
  showConstructionBudget,
}: {
  showConstructionBudget: boolean;
}) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [budget, setBudget] = useState("");

  const result = useMemo(() => {
    const principal = Number(amount);
    const apr = Number(rate);
    const construction = showConstructionBudget && budget !== "" ? Number(budget) : 0;

    if (!Number.isFinite(principal) || principal <= 0) return null;
    if (!Number.isFinite(apr) || apr < 0) return null;
    if (!Number.isFinite(construction) || construction < 0) return null;

    const balance = principal + construction;
    const monthly = (balance * (apr / 100)) / 12;
    return { balance, monthly };
  }, [amount, budget, rate, showConstructionBudget]);

  return (
    <form
      className="border-t border-rule pt-8"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Example loan calculator"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor="loan-amount">
          Loan amount
          <input
            id="loan-amount"
            name="loanAmount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass} htmlFor="interest-rate">
          Annual interest rate (%)
          <input
            id="interest-rate"
            name="interestRate"
            inputMode="decimal"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            className={inputClass}
          />
        </label>
        {showConstructionBudget ? (
          <label className={labelClass} htmlFor="construction-budget">
            Construction budget
            <input
              id="construction-budget"
              name="constructionBudget"
              inputMode="decimal"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className={inputClass}
            />
          </label>
        ) : null}
      </div>

      <p className="mt-5 text-sm leading-6 text-warm">
        Example only, not a quote. Interest-only, from the figures you type.
        {showConstructionBudget
          ? " The construction budget is added when you enter one."
          : " The construction budget is omitted for this program."}
      </p>

      {result ? (
        <p className="mt-4 font-serif text-xl text-navy" role="status">
          Example interest-only payment: {money(result.monthly)} per month on{" "}
          {money(result.balance)}.
        </p>
      ) : (
        <p className="mt-4 text-sm text-warm">Enter a loan amount and rate to see an example.</p>
      )}
    </form>
  );
}
