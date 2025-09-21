import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./_generated/server";
import { randomUUID } from "crypto"; // Для генерации suffix в customId

// Helper: Проверка авторизации и возврат userId
function requireUser(ctx: any) {
  const user = auth.getUserIdentity(ctx);
  if (!user) throw new Error("Unauthorized");
  return user.subject; // Convex userId (sub)
}

// Query: Получить профиль по customId (для публичного просмотра /users/omniroot)
export const getProfileByCustomId = query({
  args: { customId: v.string() },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const user = await db
      .query("users")
      .withIndex("by_custom_id", (q) => q.eq("custom_id", args.customId))
      .first();
    if (!user) throw new Error("User not found");
    return user;
  },
});

// Query: Получить свой профиль (по auth)
export const getMyProfile = query({
  handler: async (ctx) => {
    const userId = requireUser(ctx);
    const { db } = ctx;
    // Получаем по githubId (из token)
    const identity = auth.getUserIdentity(ctx);
    const user = await db
      .query("users")
      .withIndex("by_github_id", (q) => q.eq("github_id", identity.github_id!))
      .first();
    if (!user) throw new Error("Profile not found");
    return user;
  },
});

// Mutation: Создать/обновить профиль после GitHub login (internal, вызывается в auth hook или отдельно)
export const upsertProfileFromAuth = mutation({
  args: {
    github_id: v.string(),
    email: v.optional(v.string()),
    name: v.string(), // Из GitHub
    avatar: v.string(), // Из GitHub
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const existing = await db
      .query("users")
      .withIndex("by_github_id", (q) => q.eq("github_id", args.github_id))
      .first();

    let custom_id =
      args.name.toLowerCase().replace(/[^a-z0-9]/g, "") +
      "-" +
      randomUUID().slice(0, 4); // e.g. "johnsmith-abcd"
    if (existing) {
      // Проверяем уникальность custom_id
      while (
        await db
          .query("users")
          .withIndex("by_custom_id", (q) => q.eq("custom_id", custom_id))
          .first()
      ) {
        custom_id += Math.random().toString(36).slice(-2);
      }
      return await db.patch(existing._id, {
        ...args,
        custom_id: custom_id, // Обновляем, если изменилось
        updatedAt: Date.now(),
      });
    } else {
      // Создаём новый
      return await db.insert("users", {
        ...args,
        custom_id,
        description: "",
        banner: "", // Default empty
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Mutation: Обновить профиль (ник, описание, баннер, аватар, customId)
// export const updateProfile = mutation({
//   args: {
//     name: v.optional(v.string()),
//     customId: v.optional(v.string()), // Editable, но уникальный
//     description: v.optional(v.string()),
//     avatar: v.optional(v.string()),
//     banner: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const userId = requireUser(ctx); // Проверяем авторизацию
//     const { db } = ctx;
//     const identity = auth.getUserIdentity(ctx);
//     const user = await db
//       .query("users")
//       .withIndex("by_githubId", (q) => q.eq("githubId", identity.githubId!))
//       .first();
//     if (!user) throw new Error("Profile not found");

//     // Проверяем уникальность customId, если меняем
//     if (args.customId && args.customId !== user.customId) {
//       const conflict = await db
//         .query("users")
//         .withIndex("by_customId", (q) => q.eq("customId", args.customId))
//         .first();
//       if (conflict) throw new Error("Custom ID already taken");
//     }

//     return await db.patch(user._id, {
//       ...(args.name && { name: args.name }),
//       ...(args.customId && { customId: args.customId }),
//       ...(args.description !== undefined && { description: args.description }),
//       ...(args.avatar && { avatar: args.avatar }),
//       ...(args.banner !== undefined && { banner: args.banner }),
//       updatedAt: Date.now(),
//     });
//   },
// });
