import assert from "node:assert/strict";
import { test } from "node:test";
import { splitName, toUsE164 } from "./contact-fields.ts";

test("splitName", () => {
  const cases = [
    ["Jane Doe", { firstName: "Jane", lastName: "Doe" }],
    ["  Jane   Mary Doe ", { firstName: "Jane", lastName: "Mary Doe" }],
    ["Cher", { firstName: "Cher", lastName: "" }],
    ["José de la Cruz", { firstName: "José", lastName: "de la Cruz" }],
    ["Jane\tDoe", { firstName: "Jane", lastName: "Doe" }],
    ["", { firstName: "", lastName: "" }],
  ];
  for (const [input, expected] of cases) assert.deepEqual(splitName(input), expected, JSON.stringify(input));
});

test("toUsE164", () => {
  const cases = [
    ["(832) 648-4619", "+18326484619"],
    ["832.648.4619", "+18326484619"],
    ["1-832-648-4619", "+18326484619"],
    ["+1 832 648 4619", "+18326484619"],
    ["8326484619", "+18326484619"],
    ["648-4619", null],
    ["555-01", null],
    ["", null],
    ["2-832-648-4619", null],
    ["+44 20 7946 0958", null],
    ["832 648 4619 12", null],
  ];
  for (const [input, expected] of cases) assert.equal(toUsE164(input), expected, JSON.stringify(input));
});
