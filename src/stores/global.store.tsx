import { create } from "zustand";

interface IGlobalStore {
  isDaySelectOpen: boolean;
  setDaySelectOpen: (newState: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>((set) => ({
  isDaySelectOpen: false,
  setDaySelectOpen: (newState) => {
    set({ isDaySelectOpen: newState });
  },
}));
