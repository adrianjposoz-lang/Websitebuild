import assert from "node:assert/strict";
import { test } from "node:test";
import { faqs, lendingStates, verifiedFacts } from "./site.ts";

const excluded = ["Vermont", "Minnesota", "Utah", "Nevada", "North Dakota", "South Dakota", "West Virginia", "Maine", "Oregon", "Idaho"];

test("lendingStates is the 50 states minus the 10 exclusions, without DC", () => {
  assert.equal(lendingStates.length, 40);
  assert.equal(new Set(lendingStates).size, 40);
  for (const state of excluded) assert.ok(!lendingStates.includes(state), state);
  assert.ok(!lendingStates.some((state) => /columbia|\bdc\b/i.test(state)));
});

test("the lending-states fact and FAQ agree with the list", () => {
  const fact = verifiedFacts.find((item) => item.id === "lending-states");
  assert.equal(fact.value, String(lendingStates.length));
  const faq = faqs.find((item) => item.id === "where-we-lend");
  assert.deepEqual(faq.list, lendingStates);
  assert.ok(faq.answer.startsWith("We lend in 40 states: Alabama, "));
  assert.ok(faq.answer.endsWith(", and Wyoming."));
});
