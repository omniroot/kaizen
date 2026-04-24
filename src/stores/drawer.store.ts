// import { create } from "zustand";

import { createDrawersSystem } from "@/kumi-ui/utils/createDrawersSystem.ts";

interface HabitPayloads {
	general: { id: string };
}

export const { useDrawer } = createDrawersSystem({
	habits: {
		view: {} as HabitPayloads["general"],
		create: {} as unknown,
		update: {} as HabitPayloads["general"],
		archive: {} as HabitPayloads["general"],
	},
	tasks: {
		view: {} as HabitPayloads["general"],
		create: {} as unknown,
		update: {} as HabitPayloads["general"],
		archive: {} as HabitPayloads["general"],
	},
});
