import { useState } from "react";
import { HabitsList } from "@/components/habits/HabitsList";
import { Button, Section } from "@/kumi-ui/index.ts";
import type { HabitsFilters } from "~/server/api/habits.api.ts";

export const HabitsSection = () => {
	const [filters, setFilters] = useState<HabitsFilters>({ status: "active" });
	return (
		<Section
			title={`Habits`}
			actions={
				<>
					<Button onClick={() => setFilters({ status: "all" })}>All</Button>
					<Button onClick={() => setFilters({ status: "active" })}>Active</Button>
					<Button onClick={() => setFilters({ status: "paused" })}>Paused</Button>
					<Button onClick={() => setFilters({ status: "archived" })}>Archived</Button>
				</>
			}
		>
			<HabitsList filters={filters} />
		</Section>
	);
};
