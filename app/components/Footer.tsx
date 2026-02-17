import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="panel border-t border-border"
      role="contentinfo"
    >
      <div className="container-narrow py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded"
            aria-label="Hipkiss Digital – Home"
          >
            <img
              src="/logo.png"
              alt=""
              width={140}
              height={42}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:justify-end">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between sm:gap-4">
          <p className="text-sm text-muted">
            © {year} Hipkiss Digital. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            <Link href="/privacy" className="underline transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">Privacy</Link>
            <span className="mx-2" aria-hidden="true">•</span>
            <Link href="/terms" className="underline transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
