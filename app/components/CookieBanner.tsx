"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const CONSENT_KEY = "hipkissdigital_cookie_consent";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) setVisible(true);
  }, [mounted]);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "analytics-accepted");
    setVisible(false);
    // If you add analytics (e.g. Google Analytics), enable it here:
    // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface-panel/95 px-4 py-4 shadow-[var(--shadow-lg)] backdrop-blur-sm sm:px-6"
    >
      <div className="container-narrow mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We use cookies for essential operation and, with your consent, analytics to improve the site. See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline transition-colors hover:text-brand-mid focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={accept}
            className="btn-primary rounded-full px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2"
          >
            Accept analytics cookies
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, "essential-only");
              setVisible(false);
            }}
            className="rounded-full border border-border bg-surface-panel px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-overlay focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
