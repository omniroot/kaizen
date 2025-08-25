import { create } from "zustand";

interface IIconPickerStore {
  icon: string;
  setIcon: (newIcon: string) => void;
  isIconPickerDrawerOpen: boolean;
  toggleIconPickerDrawerOpen: (newState: boolean) => void;
}

export const useIconPickerStore = create<IIconPickerStore>((set) => ({
  icon: "Heart",
  setIcon: (newIcon) => {
    set({ icon: newIcon });
  },
  isIconPickerDrawerOpen: false,
  toggleIconPickerDrawerOpen: (newState) => {
    set({ isIconPickerDrawerOpen: newState });
  },
}));
