import { products } from "@/lib/site";

export const scenarioLimits = {
  name: 100,
  email: 254,
  phone: 30,
  propertyAddress: 200,
  notes: 2000,
} as const;

export type ScenarioField = keyof typeof scenarioLimits | "program";

export type ScenarioValues = Record<ScenarioField, string>;

export const emptyScenario: ScenarioValues = {
  name: "",
  email: "",
  phone: "",
  propertyAddress: "",
  program: "",
  notes: "",
};

export type ScenarioStatus =
  | "idle"
  | "invalid"
  | "success"
  | "error"
  | "unavailable"
  | "limited";

export type ScenarioState = {
  status: ScenarioStatus;
  message: string;
  fieldErrors: Partial<Record<ScenarioField, string>>;
  values: ScenarioValues;
};

export const initialScenarioState: ScenarioState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyScenario,
};

/** The hidden field bots tend to fill. People never see it. */
export const honeypotField = "company_website";

const programSlugs = new Set(products.map((product) => product.slug));

// C0/C1 control characters, zero-width and bidi-override characters, and angle brackets.
const unsafeChars = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF<>]/g;

function clean(raw: FormDataEntryValue | null, multiline = false) {
  if (typeof raw !== "string") return "";
  const text = raw.normalize("NFC").replace(unsafeChars, "");
  if (multiline) {
    return text
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  return text.replace(/\s+/g, " ").trim();
}

const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const phonePattern = /^\+?[0-9 ().-]+$/;

export function readScenario(formData: FormData): {
  values: ScenarioValues;
  fieldErrors: ScenarioState["fieldErrors"];
} {
  const values: ScenarioValues = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    propertyAddress: clean(formData.get("propertyAddress")),
    program: clean(formData.get("program")),
    notes: clean(formData.get("notes"), true),
  };
  const fieldErrors: ScenarioState["fieldErrors"] = {};

  if (!values.name) fieldErrors.name = "Enter your name.";
  else if (values.name.length > scenarioLimits.name)
    fieldErrors.name = `Use ${scenarioLimits.name} characters or fewer.`;

  if (!values.email) fieldErrors.email = "Enter your email address.";
  else if (values.email.length > scenarioLimits.email || !emailPattern.test(values.email))
    fieldErrors.email = "Enter an email address like name@example.com.";

  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "").length;
    if (
      values.phone.length > scenarioLimits.phone ||
      !phonePattern.test(values.phone) ||
      digits < 7 ||
      digits > 15
    )
      fieldErrors.phone = "Enter a phone number with 7 to 15 digits, or leave it blank.";
  }

  if (!values.propertyAddress) fieldErrors.propertyAddress = "Enter the property address.";
  else if (values.propertyAddress.length > scenarioLimits.propertyAddress)
    fieldErrors.propertyAddress = `Use ${scenarioLimits.propertyAddress} characters or fewer.`;

  if (!programSlugs.has(values.program)) {
    fieldErrors.program = "Select a loan program.";
    values.program = "";
  }

  if (!values.notes) fieldErrors.notes = "Describe the scenario.";
  else if (values.notes.length > scenarioLimits.notes)
    fieldErrors.notes = `Use ${scenarioLimits.notes} characters or fewer.`;

  return { values, fieldErrors };
}
