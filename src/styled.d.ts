import "styled-components";
import type { TabThemeColors } from "./components/RecentActivity/EnvironmentPanel/EnvironmentTab/types";
import type { ToggleThemeColors } from "./components/RecentActivity/Toggle/types";
import type { RecentActivityThemeColors } from "./components/RecentActivity/types";
import type { IconTagThemeColors } from "./components/common/IconTag/types";
import type { AttachmentTagThemeColors } from "./components/common/JiraTicket/AttachmentTag/types";
import type { FieldThemeColors } from "./components/common/JiraTicket/Field/types";
import type { JiraTicketThemeColors } from "./components/common/JiraTicket/types";
import type { ButtonThemeColors } from "./components/common/NewButton/types";
import type { SelectThemeColors } from "./components/common/Select/types";
import type { TagThemeColors } from "./components/common/Tag/types";
import type { TooltipThemeColors } from "./components/common/Tooltip/types";
import type { Theme } from "./globals";

export interface ThemeColors {
  icon: {
    white: string;
    primary: string;
    disabledAlt: string;
  };
  button: {
    primary: ButtonThemeColors;
    secondary: ButtonThemeColors;
    tertiary: ButtonThemeColors;
  };
  tab: TabThemeColors;
  tabPanel: {
    divider: string;
    background: string;
  };
  tag: TagThemeColors;
  iconTag: IconTagThemeColors;
  toggle: ToggleThemeColors;
  recentActivity: RecentActivityThemeColors;
  tooltip: TooltipThemeColors;
  attachmentTag: AttachmentTagThemeColors;
  jiraTicket: JiraTicketThemeColors;
  field: FieldThemeColors;
  select: SelectThemeColors;
  panel: {
    background: string;
  };
  text: {
    base: string;
    link: string;
    subtext: string;
    success: string;
    disabledAlt: string;
  };
  surface: {
    primary: string;
    primaryLight: string;
    highlight: string;
    card: string;
    brand: string;
    brandDark: string;
    secondary: string;
  };
  stroke: {
    primary: string;
    secondary: string;
    brand: string;
  };
  v3: {
    surface: {
      primary: string;
      primaryLight: string;
      highlight: string;
      gray: string;
      secondary: string;
      brandPrimary: string;
      brandSecondary: string;
      brandTertiary: string;
      brandDark: string;
      brandDarkest: string;
      sidePanelHeader: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      white: string;
      link: string;
    };
    stroke: {
      primary: string;
      primaryLight: string;
      secondary: string;
      tertiary: string;
      dark: string;
      brandPrimary: string;
      brandSecondary: string;
    };
    icon: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      brandPrimary: string;
      brandSecondary: string;
      brandTertiary: string;
      white: string;
    };
    status: {
      backgroundHigh: string;
      high: string;
      backgroundMedium: string;
      medium: string;
      backgroundLow: string;
      low: string;
      backgroundSuccess: string;
      success: string;
    };
    pieChart: {
      pinkFill: string;
      pinkStroke: string;
      brightPurpleFill: string;
      brightPurpleStroke: string;
      azureFill: string;
      azureStroke: string;
      brightOrangeFill: string;
      brightOrangeStroke: string;
      darkRed: string;
      brightGreenFill: string;
      brightRedFill: string;
      brightRedStroke: string;
      brightGreenStroke: string;
    };
    barChart: {
      pink: string;
      purple: string;
      blue: string;
    };
  };
}

interface FontWeights {
  regular: number;
  light: number;
  medium: number;
  semibold: number;
  bold: number;
}

interface FontStyle {
  lineHeight?: number;
  fontSize: number;
  fontWeight: FontWeights;
}

export interface Typographies {
  captionOne: FontStyle;
  captionTwo: FontStyle;
  footNote: FontStyle;
  subscript: FontStyle;
  body: FontStyle;
  subheading1: FontStyle;
  subheading2: FontStyle;
  code: FontStyle;
  heading1: FontStyle;
  heading2: FontStyle;
  display: FontStyle;
}

declare module "styled-components" {
  export interface DefaultTheme {
    mode: Theme;
    mainFont: string;
    codeFont: string;
    colors: ThemeColors;
    typographies: Typographies;
  }
}
