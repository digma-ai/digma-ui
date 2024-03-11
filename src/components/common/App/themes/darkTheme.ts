import { ThemeColors } from "../../../../styled";
import {
  blueScale,
  grayScale,
  greenScale,
  orangeScale,
  primaryScale,
  redScale
} from "../v2colors";
import { v3colors } from "../v3colors";

export const darkTheme: ThemeColors = {
  icon: {
    white: grayScale[0],
    primary: grayScale[100],
    disabledAlt: grayScale[500]
  },
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
  },
  select: {
    menu: {
      text: {
        primary: grayScale[0]
      },
      background: grayScale[800]
    }
  },
  text: {
    base: grayScale[0],
    subtext: grayScale[400],
    link: primaryScale[100],
    success: greenScale[500],
    disabledAlt: grayScale[500]
  },
  surface: {
    primary: grayScale[1000],
    primaryLight: grayScale[800],
    highlight: grayScale[750],
    card: grayScale[1100],
    brand: primaryScale[300],
    brandDark: primaryScale[700],
    secondary: grayScale[1100]
  },
  stroke: {
    primary: grayScale[750],
    secondary: grayScale[500],
    brand: primaryScale[300]
  },
  v3: {
    surface: {
      primary: v3colors.gray[1300],
      primaryLight: v3colors.gray[1100],
      highlight: v3colors.gray[1000],
      gray: v3colors.gray[900],
      secondary: v3colors.gray[1500],
      brandPrimary: v3colors.primary[500],
      brandSecondary: v3colors.primary[300],
      brandTertiary: v3colors.primary[400],
      brandDark: v3colors.primary[900],
      brandDarkest: v3colors.primary[1000],
      sidePanelHeader: v3colors.gray[1200]
    },
    text: {
      primary: v3colors.gray[0],
      secondary: v3colors.gray[600],
      tertiary: v3colors.gray[700],
      disabled: v3colors.gray[900],
      white: v3colors.gray[0],
      link: v3colors.primary[200]
    },
    stroke: {
      primary: v3colors.gray[1000],
      primaryLight: v3colors.gray[900],
      secondary: v3colors.gray[700],
      tertiary: v3colors.gray[1200],
      dark: v3colors.gray[1100],
      brandPrimary: v3colors.primary[400],
      brandSecondary: v3colors.primary[300]
    },
    icon: {
      primary: v3colors.gray[200],
      secondary: v3colors.gray[600],
      tertiary: v3colors.gray[700],
      disabled: v3colors.gray[900],
      brandPrimary: v3colors.primary[400],
      brandSecondary: v3colors.primary[300],
      brandTertiary: v3colors.primary[200],
      white: v3colors.gray[0]
    },
    status: {
      backgroundHigh: v3colors.red[400],
      high: v3colors.red[300],
      backgroundMedium: v3colors.orange[400],
      medium: v3colors.orange[300],
      backgroundLow: v3colors.blue[400],
      low: v3colors.blue[300],
      backgroundSuccess: v3colors.green[400],
      success: v3colors.green[300]
    },
    barChart: {
      blue: "#4b46a3",
      purple: "#6f46a2",
      pink: "#a24565"
    },
    pieChart: {
      pinkFill: v3colors.pink[200],
      pinkStroke: v3colors.pink[300],
      brightPurpleFill: v3colors.brightPurple[200],
      brightPurpleStroke: v3colors.brightPurple[300],
      azureFill: v3colors.azure[200],
      azureStroke: v3colors.azure[300],
      brightOrangeFill: v3colors.brightOrange[200],
      brightOrangeStroke: v3colors.brightOrange[300],
      darkRed: v3colors.red[500]
    }
  }
};
