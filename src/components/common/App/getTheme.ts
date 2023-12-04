import { DefaultTheme } from "styled-components";
import { Mode } from "../../../globals";
import { ThemeColors } from "../../../styled";

export const grayScale = {
  0: "#fff",
  50: "#f7f8fc",
  100: "#f0f1f7",
  150: "#e6e8f2",
  200: "#d3d6e5",
  300: "#c3c6d9",
  400: "#acafbf",
  500: "#828599",
  600: "#565966",
  700: "#4c4e59",
  800: "#2c2e33",
  850: "#37383f",
  900: "#2b2c33",
  1000: "#222326",
  1100: "#1e1f22",
  1200: "#1a1b1e"
};

export const primaryScale = {
  100: "#a1b5ff",
  200: "#7c90f8",
  300: "#6063f6",
  400: "#393cea",
  500: "#2628a6",
  600: "#22235e",
  700: "#28293e"
};

export const redScale = {
  200: "faf1f3",
  300: "#ff7e7e",
  400: "#3d2327",
  500: "#da2d5f"
};

export const greenScale = {
  300: "#6ebd9c",
  400: "#233332",
  500: "#2ddabb"
};

const lightThemeColors: ThemeColors = {
  button: {
    primary: {
      background: {
        default: primaryScale[300],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[200]
      },
      icon: {
        default: grayScale[200],
        hover: grayScale[200],
        focus: grayScale[200],
        disabled: grayScale[500]
      },
      text: {
        default: grayScale[0],
        hover: grayScale[0],
        focus: grayScale[0],
        disabled: grayScale[500]
      }
    },
    secondary: {
      background: {
        default: grayScale[50],
        hover: grayScale[50],
        focus: grayScale[50],
        disabled: "transparent"
      },
      border: {
        default: primaryScale[300],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[200]
      },
      icon: {
        default: primaryScale[300],
        hover: primaryScale[300],
        focus: primaryScale[300],
        disabled: grayScale[400]
      },
      text: {
        default: grayScale[900],
        hover: grayScale[900],
        focus: grayScale[900],
        disabled: grayScale[400]
      }
    },
    tertiary: {
      icon: {
        default: grayScale[800],
        hover: primaryScale[300],
        focus: primaryScale[300],
        disabled: grayScale[400]
      },
      text: {
        default: grayScale[900],
        hover: primaryScale[300],
        focus: primaryScale[300],
        disabled: grayScale[400]
      }
    }
  }
};

const darkThemeColors: ThemeColors = {
  button: {
    primary: {
      background: {
        default: primaryScale[300],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[700]
      },
      icon: {
        default: grayScale[200],
        hover: grayScale[200],
        focus: grayScale[200],
        disabled: grayScale[500]
      },
      text: {
        default: grayScale[0],
        hover: grayScale[0],
        focus: grayScale[0],
        disabled: grayScale[500]
      }
    },
    secondary: {
      background: {
        default: primaryScale[700],
        hover: primaryScale[700],
        focus: primaryScale[700],
        disabled: "transparent"
      },
      border: {
        default: primaryScale[300],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[700]
      },
      icon: {
        default: grayScale[200],
        hover: grayScale[200],
        focus: grayScale[200],
        disabled: grayScale[500]
      },
      text: {
        default: grayScale[0],
        hover: grayScale[0],
        focus: grayScale[0],
        disabled: grayScale[500]
      }
    },
    tertiary: {
      icon: {
        default: grayScale[200],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[700]
      },
      text: {
        default: grayScale[0],
        hover: primaryScale[200],
        focus: primaryScale[200],
        disabled: grayScale[700]
      }
    }
  }
};

const getColors = (mode: Mode): ThemeColors => {
  switch (mode) {
    case "light":
      return lightThemeColors;
    case "dark":
    case "dark-jetbrains":
      return darkThemeColors;
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
