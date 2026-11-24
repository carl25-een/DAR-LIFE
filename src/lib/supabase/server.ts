// DAR LIFE — Supabase server client.
//
// Used by Server Components (e.g. the /account page) to read the current
// session from cookies. Follows the @supabase/ssr guidance for Next.js:
// `cookies()` is awaited (Next 16 made it async), and cookie writes are
// wrapped in try/catch because a Server Component cannot set cookies —
// the session refresh happens in src/proxy.ts instead.
//
// Returns null when Supabase is not configured yet (no env vars), so
// pages can render a signed-out state instead of crashing.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

export async function createClient(): Promise<SupabaseClient | null> {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component, which cannot set cookies.
          // Safe to ignore: src/proxy.ts refreshes the session cookie.
        }
      },
    },
  });
}
