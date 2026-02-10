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
  wide: "(max-width: 1439px)",
  desktop: "(max-width: 1023px)",
  tablet: "(max-width: 767px)",
  mobile: "(max-width: 479px)",
};
