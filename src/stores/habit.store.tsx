import { create } from "zustand";

interface IHabitStore {
  isHabitDrawerOpen: boolean;
  toggleDrawerOpen: (newState: boolean) => void;
}

export const useHabitStore = create<IHabitStore>((set) => ({
  isHabitDrawerOpen: false,
  toggleDrawerOpen: (newState) => {
    set({ isHabitDrawerOpen: newState });
  },
}));
