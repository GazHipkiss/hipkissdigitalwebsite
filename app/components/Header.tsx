"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-border/80 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-surface-overlay shadow-[var(--shadow-header)] backdrop-blur-md"
            : "bg-surface-overlay/80 backdrop-blur-sm"
        }`}
        role="banner"
      >
        <div className="container-narrow flex h-[4.25rem] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 focus:opacity-90"
            aria-label="Hipkiss Digital – Home"
          >
            <img
              src="/logo.png"
              alt="Hipkiss Digital – Web & App Development"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              fetchPriority="high"
            />
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === href
                    ? "text-brand-mid"
                    : "text-foreground hover:text-brand-accent"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="btn-primary hidden md:inline-flex"
          >
            Get in touch
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-border md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu: overlay + drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden mobile-overlay ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
        onClick={closeMenu}
      >
        <div
          className="mobile-drawer absolute right-0 top-0 h-full w-[min(100vw-3rem,20rem)] bg-surface-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <nav
            className="flex flex-col gap-0 px-6 pt-20 pb-8"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`mobile-drawer-item py-3 text-base font-medium ${
                  pathname === href ? "text-brand-mid" : "text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="btn-primary mobile-drawer-item mt-6 w-full justify-center rounded-button py-3"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
