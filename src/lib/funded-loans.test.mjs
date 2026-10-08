import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import {
  byAmount,
  featuredLoans,
  filterHref,
  filterLoans,
  formatAmount,
  formatClosed,
  fundedLoans,
  loanHeading,
  parseFilter,
  programHref,
} from "../data/funded-loans.ts";
import { lendingStates, videos } from "./site.ts";

const dataSource = readFileSync(new URL("../data/funded-loans.ts", import.meta.url), "utf8");

test("16 funded loans with unique ids", () => {
  assert.equal(fundedLoans.length, 16);
  assert.equal(new Set(fundedLoans.map((loan) => loan.id)).size, 16);
});

test("loan amounts are whole-dollar integers, sorted high to low", () => {
  for (const loan of fundedLoans) {
    assert.ok(Number.isInteger(loan.loanAmount) && loan.loanAmount > 0, loan.id);
    assert.match(formatAmount(loan.loanAmount), /^\$\d{1,3}(,\d{3})+$/);
  }
  for (let i = 1; i < fundedLoans.length; i++) {
    assert.ok(fundedLoans[i - 1].loanAmount > fundedLoans[i].loanAmount, fundedLoans[i].id);
  }
  assert.deepEqual(byAmount(fundedLoans), [...fundedLoans]);
});

test("no deal in California, Arizona or Nevada", () => {
  for (const loan of fundedLoans) assert.ok(!["CA", "AZ", "NV"].includes(loan.state), `${loan.id}: ${loan.state}`);
});

test("city and state only: no street names, house numbers or ZIP codes in loan text", () => {
  const street = /\b\d+\s+\w+|\b(street|ave|avenue|blvd|rd|road|dr|drive|ln|lane|ct|court|way|pl)\b\.?(\s|$)/i;
  for (const loan of fundedLoans) {
    for (const text of [loan.city, loan.heading ?? "", loan.purpose ?? ""]) assert.doesNotMatch(text, street, loan.id);
    assert.match(loan.state, /^[A-Z]{2}$/);
  }
});

test("all 16 loans have a YYYY-MM close date", () => {
  for (const loan of fundedLoans) assert.match(loan.closed ?? "", /^20\d{2}-(0[1-9]|1[0-2])$/, loan.id);
  assert.equal(formatClosed("2026-02"), "Feb 2026");
  assert.equal(formatClosed("2025-11"), "Nov 2025");
});

test("the featured 7 are unchanged, in order", () => {
  assert.deepEqual(
    featuredLoans.map((loan) => [
      loanHeading(loan),
      formatAmount(loan.loanAmount),
      loan.program,
      loan.purpose,
      loan.closed && formatClosed(loan.closed),
      loan.photo,
      loan.videoId,
    ]),
    [
      ["Preston Hollow, Dallas, TX", "$4,080,000", "Bridge", "Refinance", "May 2026", "dallas-tx.jpg", "A8AWfpc4oag"],
      ["Houston, TX", "$4,029,512", "Mid-Construction", undefined, "Feb 2026", "houston-tx-2.jpg", undefined],
      ["Houston, TX", "$3,364,987", "Mid-Construction", "Refinance", "Jun 2025", "houston-tx.png", undefined],
      ["St. Petersburg, FL", "$2,500,000", "DSCR", "Purchase", "Jul 2025", "st-petersburg-fl.png", undefined],
      ["Roswell, GA", "$2,342,747", "Mid-Construction", "Refinance", "Apr 2026", "roswell-ga.jpg", undefined],
      ["Marietta, GA", "$1,785,000", "DSCR", "Rate-and-term refinance", "Aug 2026", "marietta-ga.jpg", undefined],
      ["Honolulu, HI", "$1,475,250", "Fix & Flip", "Purchase", "Mar 2025", "honolulu-hi.png", "Lt3MwArGP_Q"],
    ],
  );
  assert.equal(
    featuredLoans[0].history,
    "First funded in 2025 as a $3,847,254 mid-construction loan, then refinanced into this Bridge loan in 2026.",
  );
  assert.equal(programHref("Mid-Construction"), "/loan-products/mid-construction");
  for (const loan of featuredLoans) {
    if (loan.videoId) assert.ok(videos[loan.videoId].placement.includes("home-deals"));
  }
});

test("the 9 new loans, exactly as given", () => {
  assert.deepEqual(
    fundedLoans
      .filter((loan) => !loan.featured)
      .map((loan) => [loanHeading(loan), loan.program, loan.loanAmount, loan.closed, loan.purpose]),
    [
      ["Makawao, HI", "Fix & Flip", 4208794, "2026-04", "Cash-out refinance"],
      ["Dallas, TX", "Fix & Flip", 3480000, "2026-05", "Rate-and-term refinance"],
      ["Kailua, HI", "Fix & Flip", 3185545, "2025-11", undefined],
      ["Kailua, HI", "Ground-Up", 1775000, "2026-04", "Rate-and-term refinance"],
      ["Dallas, TX", "Fix & Flip", 1537500, "2025-10", undefined],
      ["Girdwood, AK", "Fix & Flip", 1000000, "2026-02", "Cash-out refinance"],
      ["Denver, CO", "Fix & Flip", 647200, "2026-01", undefined],
      ["Hollywood, FL", "DSCR", 540000, "2026-10", "Purchase"],
      ["Fayetteville, NC", "Fix & Flip", 459250, "2025-03", undefined],
    ],
  );
});

test("every photo exists; every loan without one has the TODO(photos) marker", () => {
  for (const loan of fundedLoans) {
    if (loan.photo) {
      assert.ok(existsSync(new URL(`../../public/deals/${loan.photo}`, import.meta.url)), loan.photo);
      assert.ok(loan.photo.startsWith(`${loan.id}.`), loan.photo);
    } else {
      const marker = `// TODO(photos): replace placeholder with appraisal photo ${loan.id}.jpg\n  {\n    id: "${loan.id}",`;
      assert.ok(dataSource.includes(marker), loan.id);
    }
  }
  assert.deepEqual(
    fundedLoans.filter((loan) => !loan.photo).map((loan) => loan.id),
    ["makawao-hi", "dallas-tx-2", "kailua-hi", "dallas-tx-3", "girdwood-ak"],
  );
  assert.equal(dataSource.match(/TODO\(photos\)/g).length, 5);
});

test("Fayetteville photo: listing photo at its native 720px, exact alt text", () => {
  const fayetteville = fundedLoans.find((loan) => loan.id === "fayetteville-nc");
  assert.equal(fayetteville.loanAmount, 459250);
  assert.equal(fayetteville.photo, "fayetteville-nc.jpg");
  assert.equal(fayetteville.photoAlt, "Property in Fayetteville, NC");
  assert.equal(fayetteville.photoWidth, 720);
  assert.equal(fayetteville.photoCaption, undefined);
});

test("Denver photo: appraisal front photo, exact alt text", () => {
  const denver = fundedLoans.find((loan) => loan.id === "denver-co");
  assert.equal(denver.loanAmount, 647200);
  assert.equal(denver.photo, "denver-co.jpg");
  assert.equal(denver.photoAlt, "Property in Denver, CO");
  assert.equal(denver.photoCaption, undefined);
});

test("Hollywood and Kailua Ground-Up photos: alt text and the before-construction caption", () => {
  const hollywood = fundedLoans.find((loan) => loan.id === "hollywood-fl");
  assert.equal(hollywood.photo, "hollywood-fl.jpg");
  assert.equal(hollywood.photoAlt, undefined);
  assert.equal(hollywood.photoCaption, undefined);
  const kailua = fundedLoans.find((loan) => loan.id === "kailua-hi-2");
  assert.equal(kailua.program, "Ground-Up");
  assert.equal(kailua.loanAmount, 1775000);
  assert.equal(kailua.photo, "kailua-hi-2.jpg");
  assert.equal(kailua.photoAlt, "Kailua, HI, the lot before construction");
  assert.equal(kailua.photoCaption, "Before construction");
});

test("filters: program counts; a state value is ignored", () => {
  const count = (query) => filterLoans(fundedLoans, parseFilter(query)).length;
  assert.equal(count({}), 16);
  assert.equal(count({ program: "fix-and-flip" }), 8);
  assert.equal(count({ program: "ground-up" }), 1);
  assert.equal(count({ program: "mid-construction" }), 3);
  assert.equal(count({ program: "bridge" }), 1);
  assert.equal(count({ program: "dscr" }), 3);
  assert.equal(count({ program: "nope" }), 16);
  assert.deepEqual(parseFilter({ state: "hi" }), {});
  assert.deepEqual(parseFilter({ program: "fix-and-flip", state: "HI" }), { program: "fix-and-flip" });
  assert.equal(count({ state: "hi" }), 16);
  assert.equal(count({ program: "fix-and-flip", state: "hi" }), 8);
  assert.equal(count({ program: "bridge", state: "hi" }), 1);
});

test("filter links carry the program only", () => {
  assert.equal(filterHref({}), "/funded-loans");
  assert.equal(filterHref({ program: "fix-and-flip" }), "/funded-loans?program=fix-and-flip");
});

const viewSource = readFileSync(new URL("../components/FundedLoansView.tsx", import.meta.url), "utf8");
const configSource = readFileSync(new URL("../../next.config.ts", import.meta.url), "utf8");

test("/funded-loans: no State chips, and the 40-states line links to the Where do you lend? FAQ", () => {
  assert.doesNotMatch(viewSource, /filter-state|label="State"|stateNames|statesInData/);
  assert.match(viewSource, /<Link href="\/faqs#where-we-lend"[^>]*>\s*We lend in \{lendingStates\.length\} states\.\s*<\/Link>/);
  assert.equal(lendingStates.length, 40);
  assert.doesNotMatch(configSource, /stateQuery|key: "state"/);
  assert.ok(!existsSync(new URL("../app/funded-loans/filter/[program]/[state]", import.meta.url)));
});
