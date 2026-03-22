import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false, // Default awal
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme-storage', // Nama key di localStorage (bebas ganti)
    }
  )
);

export default useThemeStore;