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

test("videos never include the excluded IDs or titles, and placements match the brief", async () => {
  const { videos, videosFor, fundedDeals } = await import("./site.ts");
  const excluded = ["8CTBPkEEN9A", "oiWG4yO81Wk", "X6OaUKN9nps", "svQIB5oWumw", "LDSxPywBu5Q"];
  for (const id of excluded) assert.ok(!(id in videos), id);
  for (const video of Object.values(videos)) {
    assert.match(video.duration, /^\d{1,2}:\d{2}$/);
    assert.doesNotMatch(video.title, /guarantee|\$500M|100% financing/i);
  }
  const ids = (placement) => videosFor(placement).map((video) => video.id);
  assert.deepEqual(ids("home-deals"), ["A8AWfpc4oag", "Lt3MwArGP_Q", "pPumrpAaiwc"]);
  assert.deepEqual(ids("home-explainers"), ["bMoVComyyfI", "ncIvS1Es3uc", "rrFlOT9AbeE"]);
  assert.deepEqual(ids("program:commercial-dscr"), []);
  assert.deepEqual(ids("program:ground-up"), ["V8--nI2muqQ"]);
  assert.deepEqual(ids("program:mid-construction"), ["V8--nI2muqQ"]);
  assert.deepEqual(ids("contact"), ["ajg_JxlUPVM"]);
  for (const deal of fundedDeals) assert.ok(videos[deal.videoId].placement.includes("home-deals"));
});
