import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
