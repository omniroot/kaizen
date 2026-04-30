import path from "node:path";
import { JSONFilePreset } from "lowdb/node";
import type { Habits } from "~/server/schema/habit.schema.ts";
import type { Tasks } from "~/server/schema/task.schema.ts";

export interface KaizenDB {
	habits: Habits;
	tasks: Tasks;
}

const __dirname = path.resolve();

export const db = await JSONFilePreset<KaizenDB>(
	path.join(__dirname,"server", "data", "db.json"),
	{
		habits: [],
		tasks: [],
		// diary: [] as any[],
		// photos: [] as any[],
	},
);
