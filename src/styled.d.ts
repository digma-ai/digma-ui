import "styled-components";
import { Mode } from "./globals";

export interface ButtonThemeColors {
  background?: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  border?: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    focus: string;
    disabled: string;
  };
}

export interface ThemeColors {
  button: {
    primary: ButtonThemeColors;
    secondary: ButtonThemeColors;
    tertiary: ButtonThemeColors;
  };
}

declare module "styled-components" {
  export interface DefaultTheme {
    mode: Mode;
    mainFont: string;
    codeFont: string;
    colors: ThemeColors;
  }
}
