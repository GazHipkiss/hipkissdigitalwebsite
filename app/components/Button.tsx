import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-button px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-brand-mid text-text-on-brand shadow-[var(--shadow-sm)] hover:bg-brand-accent hover:scale-[1.03] hover:shadow-[var(--shadow-button-hover)]",
  secondary:
    "bg-surface-panel text-brand-deep border border-border hover:bg-brand-primary-light/50 hover:border-brand-accent/30",
  outline:
    "border-2 border-brand-mid text-brand-mid hover:bg-brand-mid hover:text-text-on-brand hover:scale-[1.03] hover:shadow-[var(--shadow-button-hover)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
