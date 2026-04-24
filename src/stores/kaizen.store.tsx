import { create } from "zustand";
import type { Habit } from "~/server/schema/habit.schema.ts";

interface KaizenStore {
	selectedHabitId: Habit["id"] | undefined;
	setSelectedHabitId: (habit: Habit["id"] | undefined) => void;
}

export const useKaizenStore = create<KaizenStore>((set) => ({
	selectedHabitId: undefined,
	setSelectedHabitId: (habit) => set({ selectedHabitId: habit }),
}));

export const useKaizen = () => {
	const { selectedHabitId, setSelectedHabitId } = useKaizenStore();

	return { selectedHabitId, setSelectedHabitId };
};
