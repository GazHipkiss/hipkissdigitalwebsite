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
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
