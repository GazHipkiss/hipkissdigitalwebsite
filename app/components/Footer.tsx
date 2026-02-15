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
      className="panel border-t border-border"
      role="contentinfo"
    >
      <div className="container-narrow py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity duration-200 hover:opacity-90"
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
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-10 md:flex-row md:justify-between">
          <p className="text-sm text-muted">
            © {year} Hipkiss Digital. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Web & App Development — Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
