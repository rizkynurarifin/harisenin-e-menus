import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Definisi Interface untuk State dan Action
interface ThemeState {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

// 2. Terapkan Interface pada create store
const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            darkMode: false,
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        }),
        {
            name: 'theme-storage',
        }
    )
);

export default useThemeStore;