"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button type="button" onClick={handleLogout} className="text-sm text-muted hover:text-foreground">
      Log out
    </button>
  );
}
