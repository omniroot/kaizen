import data from "./data.json";

export type IUser = (typeof data)["users"][0];

export type IUserInsert = Omit<IUser, "id">;
export type IUserUpdate = Omit<IUser, "id">;
export type IUserDelete = Pick<IUser, "id">;
