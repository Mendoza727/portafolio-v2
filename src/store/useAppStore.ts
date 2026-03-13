"use client";
import { create } from "zustand";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

interface AppState {
  // Menu
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Scroll
  scrollProgress: number; // 0 to 1
  setScrollProgress: (progress: number) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;

  // 3D
  current3DScene: string;
  setCurrent3DScene: (scene: string) => void;

  // Mouse
  mousePosition: MousePosition;
  setMousePosition: (pos: MousePosition) => void;

  // Theme
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;

  // Page load
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Menu
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  // Scroll
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  currentSection: "hero",
  setCurrentSection: (section) => set({ currentSection: section }),

  // 3D
  current3DScene: "hero",
  setCurrent3DScene: (scene) => set({ current3DScene: scene }),

  // Mouse
  mousePosition: { x: 0, y: 0, normalizedX: 0, normalizedY: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),

  // Theme
  theme: "dark",
  setTheme: (theme) => set({ theme }),

  // Loading
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  loadingProgress: 0,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
}));
