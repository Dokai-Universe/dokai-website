import { createTheme } from "@vanilla-extract/css";
import { grayscale } from "./palette";
import { fontSize } from "./font";

export const [themeClass, vars] = createTheme({
  color: {
    bg: grayscale.white,
    fg: grayscale.black,
    text: grayscale.black,
  },
  radius: {
    full: "999px",
  },
  fontSize: fontSize,
});
