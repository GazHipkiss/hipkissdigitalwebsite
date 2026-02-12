import Link from "next/link";
import Image from "next/image";

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
      className="border-t border-[var(--border)] bg-[var(--card-bg)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-90"
            aria-label="Hipkiss Digital – Home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={140}
              height={42}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-[var(--border)] pt-10 md:flex-row md:justify-between">
          <p className="text-sm text-[var(--muted)]">
            © {year} Hipkiss Digital. All rights reserved.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Web & App Development — Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
