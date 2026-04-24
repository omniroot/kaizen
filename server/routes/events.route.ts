import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { type AppEvent, eventEmitter } from "../utils/events.ts";

export const eventsRouter = new Hono().get("/", (c) => {
  return streamSSE(c, async (stream) => {
    // 1. Создаем функцию-обработчик отдельно
    const handler = (data: AppEvent) => {
      // stream.writeSSE возвращает Promise, его лучше await'ить
      stream.writeSSE({
        data: JSON.stringify(data),
        event: "message",
      });
    };

    // 2. Подписываемся (БЕЗ return перед ee.on)
    eventEmitter.on("app-event", handler);

    // 3. Чистим за собой при дисконнекте
    stream.onAbort(() => {
      console.log("SSE Connection closed");
      eventEmitter.off("app-event", handler); // Теперь типы сойдутся
    });

    // 4. Keep-alive цикл, чтобы соединение не закрывалось по таймауту
    while (true) {
      await stream.sleep(30000);
      // Можно слать пустой ping, если браузер капризничает
      await stream.writeSSE({ data: "ping", event: "ping" });
    }
  });
});
