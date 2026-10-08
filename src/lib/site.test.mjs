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
  assert.deepEqual(ids("program:ground-up"), ["V8--nI2muqQ"]);
  assert.deepEqual(ids("program:mid-construction"), ["V8--nI2muqQ"]);
  assert.deepEqual(ids("contact"), ["ajg_JxlUPVM"]);
  for (const deal of fundedDeals) {
    if ("videoId" in deal) assert.ok(videos[deal.videoId].placement.includes("home-deals"));
  }
});

test("the five programs, with no Commercial DSCR anywhere in the program data", async () => {
  const { products, shippedPaths, faqs } = await import("./site.ts");
  assert.deepEqual(
    products.map((product) => product.slug),
    ["dscr", "bridge", "fix-and-flip", "ground-up", "mid-construction"],
  );
  assert.ok(!shippedPaths.some((path) => path.includes("commercial")));
  assert.ok(!faqs.some((faq) => /commercial/i.test(faq.answer)));
});

test("funded deals: seven loans by amount, high to low, in whole dollars, then the walkthrough", async () => {
  const { fundedDeals } = await import("./site.ts");
  assert.equal(fundedDeals.length, 8);
  assert.deepEqual(
    fundedDeals.map((deal) => [deal.heading, deal.amount?.value]),
    [
      ["Preston Hollow, Dallas, TX", "$4,080,000"],
      ["Houston, TX", "$4,029,512"],
      ["Houston, TX", "$3,364,987"],
      ["St. Petersburg, FL", "$2,500,000"],
      ["Roswell, GA", "$2,342,747"],
      ["Marietta, GA", "$1,785,000"],
      ["Honolulu, HI", "$1,475,250"],
      ["Fix and flip walkthrough", undefined],
    ],
  );
  const loans = fundedDeals.filter((deal) => "amount" in deal);
  const dollars = (deal) => Number(deal.amount.value.replace(/[$,]/g, ""));
  for (const deal of loans) {
    assert.equal(deal.amount.label, "Loan amount");
    assert.match(deal.amount.value, /^\$\d{1,3}(,\d{3})+$/);
  }
  for (let i = 1; i < loans.length; i++) assert.ok(dollars(loans[i - 1]) > dollars(loans[i]));
  assert.match(fundedDeals[0].history, /\$3,847,254/);
  assert.deepEqual(
    fundedDeals.filter((deal) => "closed" in deal).map((deal) => [deal.heading, deal.closed]),
    [["Houston, TX", "Feb 2026"], ["Roswell, GA", "Apr 2026"], ["Marietta, GA", "Aug 2026"]],
  );
});

test("interest reserves: Fix & Flip, Ground-Up and Mid-Construction only, and in the FAQ", async () => {
  const { products, faqs } = await import("./site.ts");
  const has = (slug) => products.find((p) => p.slug === slug).facts.some((f) => /interest reserve/i.test(f.term + f.detail));
  for (const slug of ["fix-and-flip", "ground-up", "mid-construction"]) assert.ok(has(slug), slug);
  for (const slug of ["dscr", "bridge"]) assert.ok(!has(slug), slug);
  assert.ok(faqs.some((faq) => faq.question === "Do I need cash reserves?"));
});
