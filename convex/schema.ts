import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Профили пользователей (связаны с auth user_id)
  users: defineTable({
    // Auth fields (из GitHub)
    github_id: v.string(), // GitHub user ID
    email: v.optional(v.string()), // GitHub email
    // Profile fields
    name: v.string(), // Ник (editable)
    custom_id: v.string(), // Кастомный ID (e.g. "omniroot"), уникальный
    description: v.optional(v.string()), // Описание
    avatar: v.string(), // URL аватарки (из GitHub или custom)
    banner: v.optional(v.string()), // URL баннера
    // Timestamps
    createdAt: v.number(), // Unix timestamp
    updatedAt: v.number(),
  })
    .index("by_custom_id", ["custom_id"]) // Для URL /users/omniroot
    .index("by_github_id", ["github_id"]), // Для быстрого поиска по GitHub

  // Ежедневный check-in (сон + начальное настроение)
  daily_checkins: defineTable({
    user_id: v.string(),
    date: v.string(), // YYYY-MM-DD
    sleepHours: v.number(), // часы сна
    mood: v.union(v.literal("good"), v.literal("bad")), // начальное настроение
    note: v.optional(v.string()), // заметка
  }).index("by_user_date", ["user_id", "date"]),

  // Изменения настроения (timeline events)
  mood_changes: defineTable({
    user_id: v.string(),
    timestamp: v.string(), // ISO, e.g. "2025-09-21T08:00:00Z"
    mood: v.union(v.literal("good"), v.literal("bad")),
    note: v.optional(v.string()),
  }).index("by_user_timestamp", ["user_id", "timestamp"]),

  // Дыхательные практики
  breathing_sessions: defineTable({
    user_id: v.string(),
    timestamp: v.string(), // ISO
    breaths: v.number(), // кол-во вдохов
    duration: v.number(), // секунды
  }).index("by_user_timestamp", ["user_id", "timestamp"]),

  // Журналинг (записи)
  journaling_entries: defineTable({
    user_id: v.string(),
    timestamp: v.string(), // ISO
    content: v.string(), // текст записи
  }).index("by_user_timestamp", ["user_id", "timestamp"]),

  // Привычки (мастер-таблица)
  habits: defineTable({
    user_id: v.string(),
    name: v.string(), // название, e.g. "Выпить воду"
    description: v.optional(v.string()),
  }).index("by_user", ["user_id"]),

  // Выполнения привычек (для timeline)
  habit_completions: defineTable({
    user_id: v.string(),
    habitId: v.id("habits"), // ссылка на habit
    timestamp: v.string(), // ISO, момент выполнения
    note: v.optional(v.string()), // опционально, почему/как
  }).index("by_user_timestamp", ["user_id", "timestamp"]),
});
