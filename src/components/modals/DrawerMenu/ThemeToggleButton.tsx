"use client";

import { useTheme } from "@app/ThemeProvider";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggleButton;
