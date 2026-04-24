import { QueryClient } from "@tanstack/react-query";
import { hc } from "hono/client";
import type { AppType } from "~/server/server.ts";

export const tanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 20000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const API_URL = `${window.location.protocol}//${window.location.hostname}:3000`;
export const api = hc<AppType>(API_URL);

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
