"use server";

import { headers } from "next/headers";
import { getGhlWebhookUrl, sendToGhl } from "@/lib/ghl";
import { rateLimit } from "@/lib/rate-limit";
import {
  emptyScenario,
  honeypotField,
  readScenario,
  type ScenarioState,
} from "@/lib/scenario";
import { getProduct, site } from "@/lib/site";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const reachOffice = `Call ${site.phoneDisplay} or email ${site.email} to reach the office.`;

async function clientIp() {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip")?.trim() || "unknown";
}

export async function submitScenario(
  _previous: ScenarioState,
  formData: FormData,
): Promise<ScenarioState> {
  const trap = formData.get(honeypotField);
  if (typeof trap !== "string" || trap !== "") {
    return {
      status: "error",
      message: `Your scenario could not be sent. ${reachOffice}`,
      fieldErrors: {},
      values: emptyScenario,
    };
  }

  const { values, fieldErrors } = readScenario(formData);
  const invalidCount = Object.keys(fieldErrors).length;
  if (invalidCount > 0) {
    return {
      status: "invalid",
      message:
        invalidCount === 1
          ? "1 field needs attention before the scenario can be sent."
          : `${invalidCount} fields need attention before the scenario can be sent.`,
      fieldErrors,
      values,
    };
  }

  const url = getGhlWebhookUrl();
  if (!url) {
    return {
      status: "unavailable",
      message: `Nothing was sent. This form does not deliver scenarios yet. ${reachOffice}`,
      fieldErrors: {},
      values,
    };
  }

  if (!rateLimit(await clientIp(), RATE_LIMIT, RATE_WINDOW_MS)) {
    return {
      status: "limited",
      message: `Too many scenarios were sent from this connection. Try again in a few minutes, or ${reachOffice.charAt(0).toLowerCase()}${reachOffice.slice(1)}`,
      fieldErrors: {},
      values,
    };
  }

  const delivered = await sendToGhl(url, {
    ...values,
    programName: getProduct(values.program).name,
    source: `${site.url}/contact`,
    submittedAt: new Date().toISOString(),
  });

  if (!delivered) {
    return {
      status: "error",
      message: `Your scenario was not sent. Try again in a moment. ${reachOffice}`,
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Your scenario was sent to the RSC Private Lending team.",
    fieldErrors: {},
    values: emptyScenario,
  };
}
