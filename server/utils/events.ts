import { EventEmitter } from "node:events";

export type AppEvent = {
  endpoint: "habits" | "settings" | "global";
  type: "internal" | "external";
};

// Описываем карту событий: название -> тип данных
type EventMap = {
  "app-event": [AppEvent]; // Массив, так как аргументов может быть несколько
};

// Создаем типизированный класс
class AppEventEmitter extends EventEmitter {
  // Переопределяем emit для типизации
  emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
    return super.emit(event, ...args);
  }

  // Переопределяем on для типизации
  on<K extends keyof EventMap>(
    event: K,
    listener: (...args: EventMap[K]) => void,
  ): this {
    return super.on(event, listener);
  }

  // Переопределяем off для типизации
  off<K extends keyof EventMap>(
    event: K,
    listener: (...args: EventMap[K]) => void,
  ): this {
    return super.off(event, listener);
  }
}

export const eventEmitter = new AppEventEmitter();
