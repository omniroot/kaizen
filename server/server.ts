import path from "node:path";
import { serve } from "@hono/node-server";
import chokidar from "chokidar";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { db } from "~/server/db.ts";
import { eventsRouter } from "~/server/routes/events.route.ts";
import habitsRouter from "~/server/routes/habits.route.ts";
import { tasksRouter } from "~/server/routes/tasks.route.ts";
import utilsRouter from "~/server/routes/utils.route.ts";
import { eventEmitter } from "~/server/utils/events.ts";

const __dirname = path.resolve();

const app = new Hono({}).use("*", cors()).use("*", logger());
const app_data_folder = path.resolve(__dirname,"server", "data");

const routes = app
	.route("/habits", habitsRouter)
	.route("/tasks", tasksRouter)
	.route("/utils", utilsRouter)
	.route("/events", eventsRouter);

export type AppType = typeof routes;

chokidar.watch(app_data_folder).on("change", async () => {
	console.log("Файл изменен. Читаю...");
	await db.read(); // Обновить lowdb в памяти
	eventEmitter.emit("app-event", { endpoint: "global", type: "external" }); // Пинок для SSE
});

// Глобальный обработчик ошибок (опционально)
app.onError((err, c) => {
	console.error(err);
	return c.json({ error: "Internal Server Error" }, 500);
});

serve({
	hostname: "0.0.0.0",
	port: 3000,
	fetch: app.fetch,
});
