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

export const blueScale = {
  300: "#58a5ff",
  400: "#2c344f",
  500: "#2d87da"
};

export const redScale = {
  200: "faf1f3",
  300: "#ff7e7e",
  400: "#3d2327",
  500: "#da2d5f"
};

export const orangeScale = {
  300: "#ff8a58",
  400: "#3c2c23",
  500: "#da802d"
};

export const greenScale = {
  300: "#6ebd9c",
  400: "#233332",
  500: "#2ddabb"
};

const darkThemeColors: ThemeColors = {
  icon: grayScale[200],
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
  },
  tab: {
    text: {
      default: grayScale[400],
      hover: grayScale[400],
      focus: grayScale[200],
      disabled: grayScale[700]
    },
    background: {
      default: "transparent",
      hover: grayScale[800],
      focus: "transparent",
      disabled: "transparent"
    },
    borderBottom: {
      hover: primaryScale[300],
      focus: primaryScale[300]
    }
  },
  tabPanel: {
    background: grayScale[1100],
    divider: grayScale[800]
  },
  tag: {
    default: {
      background: grayScale[850],
      text: grayScale[200]
    },
    highSeverity: {
      background: redScale[400],
      text: redScale[300]
    },
    mediumSeverity: {
      background: orangeScale[400],
      text: orangeScale[300]
    },
    lowSeverity: {
      background: blueScale[400],
      text: blueScale[300]
    },
    success: {
      background: greenScale[400],
      text: greenScale[300]
    }
  },
  iconTag: {
    background: grayScale[1000],
    border: grayScale[700],
    icon: grayScale[200]
  },
  toggle: {
    background: grayScale[1000],
    border: grayScale[850],
    option: {
      default: {
        background: "transparent",
        icon: grayScale[200],
        text: grayScale[100]
      },
      selected: {
        background: primaryScale[300],
        icon: grayScale[200],
        text: grayScale[100]
      }
    }
  },
  recentActivity: {
    background: grayScale[1200],
    header: {
      text: grayScale[100]
    },
    table: {
      header: {
        text: grayScale[400]
      },
      row: {
        default: {
          border: grayScale[850],
          background: grayScale[1100],
          link: primaryScale[100]
        },
        new: {
          border: grayScale[850],
          background: grayScale[900],
          link: primaryScale[100]
        }
      }
    }
  },
  tooltip: {
    background: grayScale[800],
    text: grayScale[100]
  },
  attachmentTag: {
    background: grayScale[1000],
    border: grayScale[850],
    icon: {
      background: primaryScale[300],
      stroke: grayScale[200]
    },
    text: grayScale[0]
  },
  jiraTicket: {
    background: grayScale[1000],
    border: grayScale[900],
    text: {
      primary: grayScale[100],
      secondary: grayScale[500]
    },
    icon: grayScale[200]
  },
  field: {
    border: grayScale[700],
    icon: grayScale[200],
    text: grayScale[100]
  },
  panel: {
    background: grayScale[1000]
  }
};

const lightThemeColors: ThemeColors = {
  icon: grayScale[800],
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
  },
  tab: {
    text: {
      default: grayScale[600],
      hover: grayScale[600],
      focus: grayScale[900],
      disabled: grayScale[300]
    },
    background: {
      default: "transparent",
      hover: grayScale[150],
      focus: "transparent",
      disabled: "transparent"
    },
    borderBottom: {
      hover: primaryScale[300],
      focus: primaryScale[300]
    }
  },
  tabPanel: {
    background: grayScale[50],
    divider: grayScale[300]
  },
  tag: {
    default: {
      background: grayScale[200],
      text: grayScale[800]
    },
    highSeverity: {
      background: redScale[500],
      text: grayScale[0]
    },
    mediumSeverity: {
      background: orangeScale[500],
      text: grayScale[0]
    },
    lowSeverity: {
      background: blueScale[500],
      text: grayScale[0]
    },
    success: {
      background: greenScale[500],
      text: grayScale[0]
    }
  },
  iconTag: {
    background: grayScale[150],
    border: grayScale[0],
    icon: grayScale[800]
  },
  toggle: {
    background: grayScale[100],
    border: grayScale[200],
    option: {
      default: {
        background: "transparent",
        icon: grayScale[800],
        text: grayScale[700]
      },
      selected: {
        background: primaryScale[300],
        icon: grayScale[200],
        text: grayScale[100]
      }
    }
  },
  recentActivity: {
    background: grayScale[0],
    header: {
      text: grayScale[900]
    },
    table: {
      header: {
        text: grayScale[600]
      },
      row: {
        default: {
          border: grayScale[200],
          background: grayScale[50],
          link: primaryScale[300]
        },
        new: {
          border: grayScale[200],
          background: grayScale[150],
          link: primaryScale[300]
        }
      }
    }
  },
  tooltip: {
    background: grayScale[100],
    text: grayScale[900]
  },
  attachmentTag: {
    background: grayScale[150],
    border: grayScale[0],
    icon: {
      background: primaryScale[300],
      stroke: grayScale[200]
    },
    text: grayScale[900]
  },
  jiraTicket: {
    background: grayScale[50],
    border: grayScale[300],
    text: {
      primary: grayScale[900],
      secondary: grayScale[700]
    },
    icon: grayScale[800]
  },
  field: {
    border: grayScale[300],
    icon: grayScale[800],
    text: grayScale[800]
  },
  panel: { background: grayScale[150] }
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
