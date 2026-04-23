import { createTheme, createThemeContract } from "@vanilla-extract/css";
import { grayscale } from "./palette";
import { fontSize } from "./font";

export const vars = createThemeContract({
  color: {
    bg: null,
    bgSub: null,
    bg100: null,
    fg: null,
    text: null,
    border: null,
    lightGray: null,
    input: null,
  },
  radius: {
    full: null,
  },
  fontSize: fontSize,
});

export const lightThemeClass = createTheme(vars, {
  color: {
    bg: grayscale.white,
    bgSub: grayscale.gray300,
    bg100: "#EFEFEF",
    fg: grayscale.black,
    text: grayscale.black,
    border: grayscale.gray500,
    lightGray: grayscale.gray300,
    input: "#EFEFEF",
  },
  radius: {
    full: "999px",
  },
  fontSize,
});

export const darkThemeClass = createTheme(vars, {
  color: {
    bg: grayscale.black,
    bgSub: grayscale.gray900,
    bg100: "#202020",
    fg: grayscale.white,
    text: grayscale.white,
    border: grayscale.gray300,
    lightGray: grayscale.gray700,
    input: "#303030",
  },
  radius: {
    full: "999px",
  },
  fontSize,
});

export const media = {
  wide: "(max-width: 1439px)",
  desktop: "(max-width: 1023px)",
  tablet: "(max-width: 767px)",
  mobile: "(max-width: 479px)",
};
