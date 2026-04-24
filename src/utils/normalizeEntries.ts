// import dayjs from "dayjs";
// import type { HabitEntries } from "~/server/schema/habit.schema.ts";

// export const normalizeEntries = (
//   records: HabitEntries,
//   length = 10,
//   fromDate: null | string = null,
// ): HabitEntries => {
//   const map = new Map<string, HabitEntries>();

//   // кладём все записи в map по дате (YYYY-MM-DD)
//   records.forEach((r) => {
//     const key = dayjs(r.date).format("YYYY-MM-DD");
//     map.set(key, r);
//   });

//   const result: HabitEntries = [];

//   for (let i = 0; i < length; i++) {
//     const date = fromDate
//       ? dayjs(fromDate).subtract(i, "day")
//       : dayjs().subtract(i, "day");
//     const key = date.format("YYYY-MM-DD");

//     const record = map.get(key);

//     result.push(
//       record ?? {
//         ...records[0],
//         id: `null-${generateUniqueId()}`,
//         date: ddate.getDate(date),
//         // completed: false,
//       },
//     );
//   }

//   // чтобы слева старые, справа новые
//   return result.reverse();
// };
