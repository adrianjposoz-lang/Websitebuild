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
  "tnum mt-2 h-12 w-full rounded-md border border-field bg-white px-3.5 text-base font-normal text-ink";

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
      className="rounded-lg border border-hair p-6 lg:p-8"
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

      <p className="mt-5 text-sm leading-6 text-muted">
        Example only, not a quote. Interest-only, from the figures you type.
        {showConstructionBudget
          ? " The construction budget is added when you enter one."
          : " The construction budget is omitted for this program."}
      </p>

      {result ? (
        <p className="mt-4 text-xl font-medium leading-[1.625rem] text-navy" role="status">
          Example interest-only payment: <span className="tnum">{money(result.monthly)}</span> per month on{" "}
          <span className="tnum">{money(result.balance)}</span>.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">Enter a loan amount and rate to see an example.</p>
      )}
    </form>
  );
}
