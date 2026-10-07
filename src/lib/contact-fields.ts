/** Splits a full name on its first space: `"Jane Mary Doe"` gives `Jane` and `Mary Doe`. */
export function splitName(name: string): { firstName: string; lastName: string } {
  const collapsed = name.trim().replace(/\s+/g, " ");
  const space = collapsed.indexOf(" ");
  if (space === -1) return { firstName: collapsed, lastName: "" };
  return { firstName: collapsed.slice(0, space), lastName: collapsed.slice(space + 1) };
}

/** Returns a US number in E.164 (`+1XXXXXXXXXX`), or null when it isn't 10 digits or 1 plus 10 digits. */
export function toUsE164(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}
