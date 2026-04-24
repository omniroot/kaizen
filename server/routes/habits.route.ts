import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { eventEmitter } from "~/server//utils/events.ts";
import { db } from "~/server/db.ts";
import {
  createHabitSchema,
  type Habit,
  updateHabitSchema,
} from "~/server/schema/habit.schema.ts";

const habitsRouter = new Hono()

  .get("/events", (c) => {
    return streamSSE(c, async (stream) => {
      const listener = () => {
        // Шлем пустой сигнал или просто строку "ping"
        stream.writeSSE({ data: "refetch", event: "update" });
      };

      eventEmitter.on("app-event", listener);
      stream.onAbort(() => {
        eventEmitter.off("app-event", listener);
      });

      while (true) {
        await stream.sleep(30000);
      } // Keep-alive
    });
  })

  // GET /habits
  .get("/", (c) => {
    // const queryParams = c.req.query();
    // const result = processQueryData(db.data.habits, queryParams);
    const result = db.data.habits;
    return c.json(result, 200);
  })

  // POST /habits
  .post("/", zValidator("json", createHabitSchema), async (c) => {
    const body = c.req.valid("json");

    const now = new Date().toISOString();
    const newHabit: Habit = {
      ...body,
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
    };

    db.data.habits.push(newHabit);
    await db.write();

    return c.json(newHabit, 201);
  })

  // PATCH /habits/:id
  .patch("/:id", zValidator("json", updateHabitSchema), async (c) => {
    const id = c.req.param("id");
    const index = db.data.habits.findIndex((h) => h.id === id);

    if (index === -1) return c.json({ error: "Habit not found" }, 404);

    const updates = c.req.valid("json");
    const updatedHabit: Habit = {
      ...db.data.habits[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    db.data.habits[index] = updatedHabit;
    await db.write();
    eventEmitter.emit("app-event", { endpoint: "habits", type: "internal" });

    return c.json(updatedHabit, 200);
  })

  // DELETE /habits/:id
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const index = db.data.habits.findIndex((h) => h.id === id);

    if (index === -1) return c.json({ error: "Habit not found" }, 404);

    db.data.habits.splice(index, 1);
    await db.write();

    return c.json({ message: "Deleted successfully" }, 200);
  });

export default habitsRouter;
