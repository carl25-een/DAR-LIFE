// DAR LIFE — Supabase browser client.
//
// Used by client components (the sign-in / sign-up forms, the sign-out
// button). Returns null when Supabase is not configured yet (no env vars),
// so the UI can show a friendly "sign-in is not switched on yet" message
// instead of crashing.

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

export function createClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createBrowserClient(config.url, config.anonKey);
}
