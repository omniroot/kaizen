import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { api, tanstackQueryClient } from "@/api/api.ts";
import type { Habit, HabitCreate, HabitUpdate } from "~/server/schema/habit.schema.ts";

export interface HabitsFilters {
	status?: "all" | "active" | "paused" | "archived";
}

type UseHabits = {
	filters?: HabitsFilters;
};

const queryKey = ["habits"];

export const useHabits = ({ filters }: UseHabits = { filters: { status: "all" } }) => {
	const refetchHabits = () =>
		tanstackQueryClient.invalidateQueries({ queryKey: ["list", queryKey] });
	const { data: habits, isLoading: habitsIsLoading } = useQuery({
		queryKey: ["list", queryKey],
		queryFn: async () => {
			const res = await api.habits.$get();

			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json();
		},
	});

	const { mutateAsync: createHabit, isPending: createHabitPending } = useMutation<
		Habit,
		unknown,
		HabitCreate
	>({
		mutationFn: async (habit) => {
			const res = await api.habits.$post({ json: habit });
			if (res.status !== 201) {
				throw new Error(res.statusText);
			}

			return res.json();
		},
		onSuccess: () => {
			refetchHabits();
		},
	});

	const { mutateAsync: updateHabit, isPending: updateHabitPending } = useMutation<
		Habit,
		unknown,
		{ id: string; habit: HabitUpdate }
	>({
		mutationFn: async ({ id, habit }) => {
			const res = await api.habits[":id"].$patch({ param: { id }, json: habit });

			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json();
		},
		onSuccess: () => {
			refetchHabits();
		},
	});

	const filteredHabits = useMemo(() => {
		if (!habits) return [];

		return habits
			.filter((habit) => {
				if (filters?.status === "all") return true;
				return habit.status === filters?.status;
			})
			.filter(Boolean);
	}, [habits, filters]);
	console.log({ habits, filteredHabits, filters });

	return {
		habits: filteredHabits,
		isLoading: habitsIsLoading,
		actions: { createHabit, updateHabit },
		actionsStatus: { createHabitPending, updateHabitPending },
	};
};

interface UseHabit {
	id?: Habit["id"];
}

export const useHabit = ({ id }: UseHabit) => {
	const { habits } = useHabits({ filters: { status: "all" } });

	const selectedHabit = habits.filter((h) => h.id === id)[0];
	return { habit: selectedHabit };
};
