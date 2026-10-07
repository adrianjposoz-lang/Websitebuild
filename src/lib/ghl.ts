import "server-only";

const TIMEOUT_MS = 8000;

export type GhlScenarioPayload = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  /** US E.164, `+1XXXXXXXXXX`. */
  phone: string;
  propertyAddress: string;
  program: string;
  programName: string;
  notes: string;
  source: string;
  submittedAt: string;
};

/**
 * Returns the inbound webhook URL, or null when it is unset or malformed.
 * Plain http is accepted only for localhost so a typo cannot send leads in cleartext.
 */
export function getGhlWebhookUrl(): URL | null {
  const raw = process.env.GHL_WEBHOOK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol === "https:" || (url.protocol === "http:" && local)) return url;
  } catch {}
  console.error("GHL_WEBHOOK_URL is set but is not a valid https URL; scenario delivery is off.");
  return null;
}

export async function sendToGhl(url: URL, payload: GhlScenarioPayload): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
      redirect: "error",
    });
    if (!response.ok) {
      console.error(`GHL webhook responded ${response.status}.`);
      return false;
    }
    return true;
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    console.error(`GHL webhook request failed (${reason}).`);
    return false;
  }
}
