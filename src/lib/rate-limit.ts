import "server-only";

/**
 * Fixed-window counter held in this server instance's memory. It resets on every
 * restart and is not shared between serverless instances or regions, so it only
 * slows down a single noisy client.
 */
const windows = new Map<string, { start: number; count: number }>();

const MAX_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (windows.size >= MAX_KEYS) {
    for (const [k, w] of windows) {
      if (now - w.start >= windowMs) windows.delete(k);
    }
    if (windows.size >= MAX_KEYS) windows.clear();
  }

  const current = windows.get(key);
  if (!current || now - current.start >= windowMs) {
    windows.set(key, { start: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}
