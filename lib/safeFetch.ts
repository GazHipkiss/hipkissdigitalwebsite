/**
 * Parse response as JSON without throwing. Use for all client-side fetch() responses
 * so 500/502 HTML error pages or malformed bodies don't cause "JSON Parse error".
 */
export async function safeJson<T = unknown>(r: Response): Promise<T | null> {
  let text: string;
  try {
    text = await r.text();
  } catch {
    return null;
  }
  const trimmed = text.trim();
  if (!trimmed) return null;
  // Only attempt parse if body looks like JSON (array or object); avoids "Unexpected identifier" on HTML/plain text
  const first = trimmed.charAt(0);
  if (first !== "[" && first !== "{") return null;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return null;
  }
}
