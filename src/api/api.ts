// import type { IHabit, IHabitUpdate } from "@/api/supabase.interface.ts";
// import { supabase } from "@/api/supabase.ts";
// import { mutationOptions, queryOptions, useQuery } from "@tanstack/react-query";

// interface api {
//   habits: {
//     all: {};
//     one: {};
//     update: {};
//     delete: {};
//   };
// }

// export const api = {
//   habits: {
//     all: {},
//     one: {},
//     update: {},
//     delete: {},
//   },
//   // habits: {
//   // all: async () => {
//   // const { data, error } = await supabase.from("habits").select();
//   // if (error) throw error;
//   // return data;
//   // },
//   // },
// };

// // Query keys and options
// export const keyFactory = {
//   query: {
//     habits: {
//       all: () =>
//         queryOptions<IHabit[]>({
//           queryKey: ["habits", "all"],
//           queryFn: api.habits.all,
//         }),
//     },
//   },
//   mutation: {
//     habits: {
//       all: {
//         update: () => mutationOptions({}),
//       },
//       one: {
//         update: (data: IHabitUpdate) =>
//           mutationOptions<IHabit>({
//             mutationFn: (data) => {},
//           }),
//         delete: () => mutationOptions({}),
//       },
//     },
//   },
// };

// const { data } = useQuery(keyFactory.query.habits.all());
// // const { data } = useQuery({
// //   queryKey: [],
// //   queryFn: api.habits.all,
// // });
// // const {} = useMutation(keyFactory.mutation.habits.one.update({ color: "red" }));

// const test = {};
