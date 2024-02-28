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

export const lightTheme: ThemeColors = {
  icon: {
    white: grayScale[0],
    primary: grayScale[800],
    disabledAlt: grayScale[500]
  },
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
  panel: { background: grayScale[150] },
  select: {
    menu: {
      text: {
        primary: grayScale[900]
      },
      background: grayScale[100]
    }
  },
  text: {
    base: grayScale[900],
    subtext: grayScale[600],
    link: primaryScale[300],
    success: grayScale[900],
    disabledAlt: grayScale[500]
  },
  surface: {
    primary: grayScale[150],
    primaryLight: grayScale[50],
    highlight: grayScale[150],
    card: grayScale[0],
    brand: primaryScale[300],
    brandDark: grayScale[50],
    secondary: grayScale[50]
  },
  stroke: {
    primary: grayScale[300],
    secondary: grayScale[800],
    brand: primaryScale[300]
  },
  v3: {
    surface: {
      primary: v3colors.gray[200],
      primaryLight: v3colors.gray[300],
      highlight: v3colors.gray[400],
      gray: v3colors.gray[500],
      secondary: v3colors.gray[0],
      brandPrimary: v3colors.primary[500],
      brandSecondary: v3colors.primary[300],
      brandDark: v3colors.primary[150],
      sidePanelHeader: v3colors.gray[300]
    },
    text: {
      primary: v3colors.gray[1200],
      secondary: v3colors.gray[700],
      tertiary: v3colors.gray[600],
      disabled: v3colors.gray[500],
      white: v3colors.gray[0],
      link: v3colors.primary[400]
    },
    stroke: {
      primary: v3colors.gray[500],
      primaryLight: v3colors.gray[600],
      secondary: v3colors.gray[1100],
      tertiary: v3colors.gray[300],
      dark: v3colors.gray[700],
      brandPrimary: v3colors.primary[400],
      brandSecondary: v3colors.primary[300]
    },
    icon: {
      primary: v3colors.gray[1100],
      secondary: v3colors.gray[900],
      tertiary: v3colors.gray[700],
      disabled: v3colors.gray[500],
      brandPrimary: v3colors.primary[400],
      brandSecondary: v3colors.primary[300],
      brandTertiary: v3colors.primary[200],
      white: v3colors.gray[0]
    },
    status: {
      backgroundHigh: v3colors.red[100],
      high: v3colors.red[200],
      backgroundMedium: v3colors.orange[100],
      medium: v3colors.orange[200],
      backgroundLow: v3colors.blue[100],
      low: v3colors.blue[200],
      backgroundSuccess: v3colors.green[100],
      success: v3colors.green[200]
    }
  }
};
