/**
 * Cloudflare bindings for OpenNext.
 * Use getCloudflareContext().env in API routes and server components.
 * Minimal types so Next.js build does not depend on worker-configuration.d.ts.
 */

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta: { duration: number; changes: number; last_row_id: number; served_by: string };
  error?: string;
}

export interface R2ObjectBody {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
}

export interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  put(key: string, value: ReadableStream | ArrayBuffer | string, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
}

export type CloudflareEnv = {
  DB: D1Database;
  BUCKET?: R2Bucket;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  ADMIN_PASSWORD?: string;
};
