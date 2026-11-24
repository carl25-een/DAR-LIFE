// DAR LIFE — Supabase configuration check.
//
// Phase 5 wires the app to Supabase (PostgreSQL + Auth), but the site must
// keep building and rendering with its dummy data before Carleen has
// created the Supabase project. So every Supabase helper in this folder
// first checks whether the two environment variables exist, and callers
// gracefully fall back (signed-out state) when they do not.
//
// Values come from `.env.local` locally and from the Vercel project's
// Environment Variables in production. See `.env.example`.

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}
