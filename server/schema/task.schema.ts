import z from "zod";

export const TaskStatusSchema = z.enum(["todo", "active", "completed"]);

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: TaskStatusSchema.default("todo"),
  date: z.iso.date().optional(),
  is_archived: z.boolean().default(false).optional(),

  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const createTaskSchema = taskSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateTaskSchema = createTaskSchema.partial();
export const deleteTaskSchema = taskSchema.pick({ id: true });

export type Task = z.infer<typeof taskSchema>;
export type Tasks = Task[];
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type DeleteTask = z.infer<typeof deleteTaskSchema>;
