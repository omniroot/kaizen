import { ArchiveHabitDrawer } from "@/components/habits/ArchiveHabitDrawer";
import { CreateHabitDrawer } from "@/components/habits/CreateHabitDrawer.tsx";
import { ViewHabitDrawer } from "@/components/habits/ViewHabitDrawer.tsx";

export const HabitDrawers = () => {
	return (
		<>
			<ViewHabitDrawer />
			<ArchiveHabitDrawer />
			<CreateHabitDrawer />
		</>
	);
};
