"use client";

import { useEffect } from "react";
import { darkThemeClass, lightThemeClass } from "@styles/theme.css";

const ThemeProvider = () => {
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (theme: "light" | "dark") => {
      root.classList.remove(lightThemeClass, darkThemeClass);
      root.classList.add(theme === "dark" ? darkThemeClass : lightThemeClass);
    };

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(mediaQuery.matches ? "dark" : "light");

    const listener = (e: MediaQueryListEvent) => {
      const latest = localStorage.getItem("theme");
      if (latest === "dark" || latest === "light") return;
      applyTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return null;
};

export default ThemeProvider;
