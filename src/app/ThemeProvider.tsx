"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { darkThemeClass, lightThemeClass } from "@styles/theme.css";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [isReady, setIsReady] = useState(false);

  const applyThemeClass = (nextTheme: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove(lightThemeClass, darkThemeClass);
    root.classList.add(nextTheme === "dark" ? darkThemeClass : lightThemeClass);
  };

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyThemeClass(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setThemeState(savedTheme);
      applyThemeClass(savedTheme);
      setIsReady(true);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme: ThemeMode = mediaQuery.matches ? "dark" : "light";

    setThemeState(systemTheme);
    applyThemeClass(systemTheme);
    setIsReady(true);

    const listener = (e: MediaQueryListEvent) => {
      const latest = localStorage.getItem(STORAGE_KEY);
      if (latest === "dark" || latest === "light") return;

      const nextTheme: ThemeMode = e.matches ? "dark" : "light";
      setThemeState(nextTheme);
      applyThemeClass(nextTheme);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [theme],
  );

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
