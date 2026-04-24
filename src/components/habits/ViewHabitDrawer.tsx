import { Drawer } from "@/kumi-ui/components/Drawer/Drawer.tsx";
import { Button, Typo } from "@/kumi-ui/index.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { useHabit } from "~/server/api/habits.api.ts";

export const ViewHabitDrawer = () => {
	const { isOpen, set, payload } = useDrawer("habits", "view");
	// const { selectedHabitId } = useKaizen();
	const { habit } = useHabit({ id: payload?.id });
	const { open: openArchiveDrawer } = useDrawer("habits", "archive");

	return (
		<Drawer open={isOpen} onOpenChange={(v) => set(v)}>
			<Typo>Name: {habit?.name}</Typo>
			<Typo>Status: {habit?.status}</Typo>
			{/* <Typo>Status: {selectedHabit?}</Typo> */}
			<Button onClick={() => openArchiveDrawer({ id: habit.id })}>Archive</Button>
		</Drawer>
	);
};
