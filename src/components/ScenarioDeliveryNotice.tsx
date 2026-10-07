import { connection } from "next/server";
import { getGhlWebhookUrl } from "@/lib/ghl";
import { site } from "@/lib/site";

/** Reads the env at request time so the notice follows the deployed config, not the build machine's. */
export async function ScenarioDeliveryNotice() {
  await connection();
  if (getGhlWebhookUrl()) return null;

  return (
    <p className="mt-4 text-sm leading-6 text-muted">
      This form does not deliver scenarios yet. Call{" "}
      <a href={site.phoneHref} className="font-semibold text-navy underline underline-offset-4">
        {site.phoneDisplay}
      </a>{" "}
      or email{" "}
      <a href={`mailto:${site.email}`} className="font-semibold text-navy underline underline-offset-4">
        {site.email}
      </a>{" "}
      to reach the office.
    </p>
  );
}
