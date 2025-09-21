import { queryOptions } from "@tanstack/react-query";
import data from "../data.json";
import type { IUser } from "@/api/data.types.ts";

export const getUsersOptions = queryOptions({
  queryKey: ["users"],
  queryFn: () => {
    return data.users;
  },
});

export const getUserOptions = () =>
  queryOptions<IUser | undefined>({
    queryKey: ["user"],
    queryFn: () => {
      return data.users.find((user) => user.custom_id === "omniroot");
    },
  });
