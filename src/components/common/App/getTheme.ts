import { DefaultTheme } from "styled-components";
import { Mode } from "../../../globals";
import { ThemeColors } from "../../../styled";
import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";

const getColors = (mode: Mode): ThemeColors => {
  switch (mode) {
    case "light":
      return lightTheme;
    case "dark":
    case "dark-jetbrains":
      return darkTheme;
  }
};

export const getTheme = (
  mode: Mode,
  mainFont: string,
  codeFont: string
): DefaultTheme => {
  return {
    mode,
    mainFont,
    codeFont,
    colors: getColors(mode)
  };
};
