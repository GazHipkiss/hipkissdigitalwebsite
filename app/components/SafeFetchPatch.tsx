"use client";

import { useEffect } from "react";

/**
 * Patches global fetch so response.json() never throws on HTML/plain text (e.g. 500 error pages).
 * Next.js RSC and other code may call .json() on responses; this prevents "JSON Parse error" crashes.
 */
export function SafeFetchPatch() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.fetch !== "function") return;
    const origFetch = window.fetch;
    window.fetch = function patchedFetch(
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> {
      return origFetch.call(window, input, init).then((res) => {
        const origJson = res.json.bind(res);
        (res as Response & { json?: () => Promise<unknown> }).json = function safeJson() {
          return res.text().then((text) => {
            const trimmed = text.trim();
            if (!trimmed) return null;
            const first = trimmed.charAt(0);
            if (first !== "[" && first !== "{") return null;
            try {
              return JSON.parse(trimmed);
            } catch {
              return null;
            }
          });
        };
        return res;
      });
    };
    return () => {
      window.fetch = origFetch;
    };
  }, []);
  return null;
}
