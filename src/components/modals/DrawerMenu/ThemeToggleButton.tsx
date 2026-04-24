"use client";

import { useTheme } from "@app/ThemeProvider";
import * as Styles from "./style.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={Styles.ThemeToggleButtonContainer}>
      <button
        type="button"
        onClick={toggleTheme}
        className={Styles.ThemeToggleButton}
        data-is-dark={theme === "dark"}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
