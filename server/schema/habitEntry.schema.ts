import { z } from "zod";

export const habitEntrySchema = z.array(
  z.object({
    id: z.number(),
    date: z.string(),
    value: z.number(),
    target: z.number(),
    unit: z.string(),
    notes: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
);

// export const createHabitSchema = habitSchema.omit({
//   id: true,
//   created_at: true,
//   updated_at: true,
// });
