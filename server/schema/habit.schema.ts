import { z } from "zod";

// Полная схема сущности Habit
export const habitSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	status: z.enum(["active", "paused", "archived"]).default("active").optional(),
	frequency: z.literal("daily").default("daily").optional(),
	target: z.number().optional(),
	unit: z.string().optional(),
	icon_name: z.string().default("🎯").optional(),
	color: z.hex().default("#FFA878").optional(),
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime(),
});

export const queryHabitSchema = z.object({
	status: z.enum(["active", "paused", "archived"]).optional(),
	sortBy: z.string().optional(),
	order: z.enum(["asc", "desc"]).optional(),
	limit: z.string().optional(), // Query всегда приходят как строки
	offset: z.string().optional(),
});

export const createHabitSchema = habitSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});
export const updateHabitSchema = createHabitSchema.partial();
export const deleteHabitSchema = habitSchema.pick({ id: true });

// Автоматически выводим TypeScript типы из схем Zod
export type Habit = z.infer<typeof habitSchema>;
export type Habits = Habit[];
export type HabitCreate = z.infer<typeof createHabitSchema>;
export type HabitUpdate = z.infer<typeof updateHabitSchema>;
export type HabitDelete = z.infer<typeof deleteHabitSchema>;
export type HabitQuery = z.infer<typeof queryHabitSchema>;

// const habit: Habit = {
// 	entries: [{ updated_at }],
// };
