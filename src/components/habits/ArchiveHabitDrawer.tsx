import { Button, Drawer, HStack } from "@/kumi-ui/index.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { useHabit, useHabits } from "~/server/api/habits.api.ts";

export const ArchiveHabitDrawer = () => {
	const { isOpen, set, payload } = useDrawer("habits", "archive");
	const { habit } = useHabit({ id: payload?.id });
	const {
		actions: { updateHabit },
	} = useHabits();
	const onArchiveClick = () => {
		if (!habit?.id) return null;
		const nextStatus =
			habit?.status === "active"
				? "archived"
				: habit?.status === "archived"
					? "active"
					: "archived";
		updateHabit({ id: habit?.id, habit: { status: nextStatus } });
		set(false);
	};

	return (
		<Drawer
			title={`Archive habit ${habit?.name}`}
			description={"Are you sure you want to archive this habit?"}
			open={isOpen}
			onOpenChange={(v) => set(v)}
		>
			<HStack w="100%" justify="space-between">
				<Button>Cancel</Button>
				<Button variant="tertiary" onClick={onArchiveClick}>
					{habit?.status === "active" && "Archive"}
					{habit?.status === "archived" && "Resume"}
				</Button>
			</HStack>
		</Drawer>
	);
};
