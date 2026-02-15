import Link from "next/link";
import { LogoutButton } from "./components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface-panel">
        <div className="container-narrow flex h-14 items-center justify-between">
          <Link href="/admin" className="font-semibold text-foreground">
            Hipkiss Digital Admin
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-muted hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/admin/work" className="text-sm text-muted hover:text-foreground">
              Work
            </Link>
            <Link href="/admin/testimonials" className="text-sm text-muted hover:text-foreground">
              Testimonials
            </Link>
            <Link href="/admin/enquiries" className="text-sm text-muted hover:text-foreground">
              Enquiries
            </Link>
            <Link href="/" className="text-sm text-muted hover:text-foreground" target="_blank">
              View site
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="container-narrow py-8">{children}</main>
    </div>
  );
}
