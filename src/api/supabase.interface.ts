import type { Database } from "@/api/supabase.types.ts";

export type IHabit = Database["public"]["Tables"]["habits"]["Row"];
export type IHabitInsert = Database["public"]["Tables"]["habits"]["Insert"];
export type IHabitUpdate = Database["public"]["Tables"]["habits"]["Update"];
