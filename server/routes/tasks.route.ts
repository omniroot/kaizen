import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "~/server/db.ts";
import {
  createTaskSchema,
  updateTaskSchema,
  type Task,
} from "~/server/schema/task.schema.ts";
import { eventEmitter } from "../utils/events";

export const tasksRouter = new Hono()
  .get("/", (c) => {
    const tasks = db.data.tasks;
    return c.json(tasks);
  })
  .post("/", zValidator("json", createTaskSchema), async (c) => {
    const body = c.req.valid("json");

    const now = new Date().toISOString();
    const newTask: Task = {
      ...body,
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
    };

    db.data.tasks.push(newTask);
    await db.write();
    eventEmitter.emit("app-event", { endpoint: "habits", type: "internal" });

    return c.json(newTask, 201);
  })
  .patch("/:id", zValidator("json", updateTaskSchema), async (c) => {
    const id = c.req.param("id");
    const index = db.data.tasks.findIndex((t) => t.id === id);

    if (index === -1) return c.json({ error: "Task not found" }, 404);

    const updates = c.req.valid("json");
    const updatedTask: Task = {
      ...db.data.tasks[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    db.data.tasks[index] = updatedTask;
    await db.write();
    eventEmitter.emit("app-event", { endpoint: "habits", type: "internal" });

    return c.json(updatedTask, 200);
  });
