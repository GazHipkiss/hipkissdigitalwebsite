const ADMIN_COOKIE = "admin_session";

export function getAdminCookie(request: Request): string | null {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${ADMIN_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAdminCookieHeader(password: string): string {
  const value = encodeURIComponent(password);
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  return `${ADMIN_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearAdminCookieHeader(): string {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function checkAdminAuth(request: Request, envPassword: string | undefined): boolean {
  if (!envPassword) return false;
  const cookie = getAdminCookie(request);
  return cookie === envPassword;
}
