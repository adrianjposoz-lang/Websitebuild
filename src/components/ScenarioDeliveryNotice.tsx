import { connection } from "next/server";
import { getGhlWebhookUrl } from "@/lib/ghl";
import { site } from "@/lib/site";

/** Reads the env at request time so the notice follows the deployed config, not the build machine's. */
export async function ScenarioDeliveryNotice() {
  await connection();
  if (getGhlWebhookUrl()) return null;

  return (
    <p className="mt-5 text-sm leading-6 text-warm">
      This form does not deliver scenarios yet. Call{" "}
      <a href={site.phoneHref} className="whitespace-nowrap font-semibold text-navy underline">
        {site.phoneDisplay}
      </a>{" "}
      or email{" "}
      <a href={`mailto:${site.email}`} className="break-words font-semibold text-navy underline">
        {site.email}
      </a>{" "}
      to reach the office.
    </p>
  );
}
