import type { DefaultTheme } from "styled-components";
import type { Theme } from "../../../globals";
import type { ThemeColors } from "../../../styled";
import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";
import { typographies } from "./typographies";

const getColors = (mode: Theme): ThemeColors => {
  switch (mode) {
    case "light":
      return lightTheme;
    case "dark":
    case "dark-jetbrains":
      return darkTheme;
  }
};

export const getStyledComponentsTheme = (
  mode: Theme,
  mainFont: string,
  codeFont: string
): DefaultTheme => {
  return {
    mode,
    mainFont,
    codeFont,
    typographies,
    colors: getColors(mode)
  };
};
