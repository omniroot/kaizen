import type { IHabit, IHabitInsert } from "@/api/supabase.interface.ts";
import { supabase } from "@/api/supabase.ts";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

// interface IHabit {
//   id: number;
//   title: string;
//   type: "task" | "time" | "count";
//   icon: string;
//   color: string;
//   repeat: string[]; // ["monday", "tuesday"]
//   date_start: Date;
//   date_end: Date;
//   target: number | null;
//   unit: string | null;
//   user_id: string;
//   created_at: Date;
//   updated_at: Date;
// }

// interface IHabitRecords {
//   id: number;
//   habit_id: IHabit["id"];
//   date: Date;
//   completed: boolean;
//   value: number;
//   user_id: string;
//   created_at: Date;
//   updated_at: Date;
// }

interface IUseHabits {}
interface IUseHabit {
  id?: IHabit["id"];
}

export const useHabits = ({}: IUseHabits = {}) => {
  return useQuery({
    queryKey: ["get-habits"],
    queryFn: async () => {
      const { data, error } = await supabase.from("habits").select();
      if (error) throw error;
      return data;
    },
  });
};

const getHabitOptions = ({ filterByAbs = false }) =>
  queryOptions({
    queryKey: ["get-habits", filterByAbs],
    queryFn: async () => {
      const { data, error } = await supabase.from("habits").select();
      if (error) throw error;
      return data;
    },
  });

export const useHabit = ({ id }: IUseHabit = {}) => {
  return useQuery({
    queryKey: ["get-habit", id],
    queryFn: async () => {
      let query = supabase.from("habits").select();
      if (id) query.eq("id", id);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useHabitCreate = () => {
  return useMutation<null, unknown, IHabitInsert>({
    mutationKey: ["create-habit"],
    mutationFn: async (habit) => {
      let query = supabase.from("habits").insert(habit);

      const { data, error } = await query;
      // console.log("@useHabitCreate ", habit, data, error, status, statusText);
      if (error) throw error;
      return data;
    },
  });
};
