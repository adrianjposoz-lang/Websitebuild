"use client";

import { useMemo, useState } from "react";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

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
      className="border border-line bg-paper p-5 sm:p-6"
      onSubmit={(event) => event.preventDefault()}
      aria-label="Loan illustration"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy" htmlFor="loan-amount">
          Loan amount
          <input
            id="loan-amount"
            name="loanAmount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2 text-base font-normal text-foreground"
          />
        </label>
        <label className="block text-sm font-semibold text-navy" htmlFor="interest-rate">
          Annual interest rate (%)
          <input
            id="interest-rate"
            name="interestRate"
            inputMode="decimal"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            className="mt-2 w-full border border-line bg-white px-3 py-2 text-base font-normal text-foreground"
          />
        </label>
        {showConstructionBudget ? (
          <label
            className="block text-sm font-semibold text-navy"
            htmlFor="construction-budget"
          >
            Construction Budget
            <input
              id="construction-budget"
              name="constructionBudget"
              inputMode="decimal"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="mt-2 w-full border border-line bg-white px-3 py-2 text-base font-normal text-foreground"
            />
          </label>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">
        Illustration only, not a quote. Interest-only, from the figures you type.
        {showConstructionBudget
          ? " Construction Budget is added when you enter one."
          : " Construction Budget is omitted for this program."}
      </p>

      {result ? (
        <p className="mt-4 text-base font-semibold text-navy" role="status">
          Illustrated interest-only payment: {money(result.monthly)} per month on{" "}
          {money(result.balance)}.
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">
          Enter a loan amount and rate to see an illustration.
        </p>
      )}
    </form>
  );
}
