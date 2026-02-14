import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ ADD THIS CHECK HERE
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase env variables missing!");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
