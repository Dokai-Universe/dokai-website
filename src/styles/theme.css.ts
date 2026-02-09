import { createTheme } from "@vanilla-extract/css";
import { grayscale } from "./palette";
import { fontSize } from "./font";

export const [themeClass, vars] = createTheme({
  color: {
    bg: grayscale.white,
    fg: grayscale.black,
    text: grayscale.black,
    border: grayscale.gray500,
    lightGray: grayscale.gray300,
  },
  radius: {
    full: "999px",
  },
  fontSize: fontSize,
});

export const media = {
  mobile: "(max-width: 540px)",
  tablet: "(max-width: 768px)",
  desktop: "(max-width: 1024px)",
};
