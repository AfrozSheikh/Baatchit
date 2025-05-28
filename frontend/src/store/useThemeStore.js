import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("ConnectEra-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("ConnectEra-theme", theme);
    set({ theme });
  },
}));
