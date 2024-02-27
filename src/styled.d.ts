import "styled-components";
import { TabThemeColors } from "./components/RecentActivity/EnvironmentPanel/EnvironmentTab/types";
import { ToggleThemeColors } from "./components/RecentActivity/Toggle/types";
import { RecentActivityThemeColors } from "./components/RecentActivity/types";
import { IconTagThemeColors } from "./components/common/IconTag/types";
import { AttachmentTagThemeColors } from "./components/common/JiraTicket/AttachmentTag/types";
import { FieldThemeColors } from "./components/common/JiraTicket/Field/types";
import { JiraTicketThemeColors } from "./components/common/JiraTicket/types";
import { ButtonThemeColors } from "./components/common/NewButton/types";
import { SelectThemeColors } from "./components/common/Select/types";
import { TagThemeColors } from "./components/common/Tag/types";
import { TooltipThemeColors } from "./components/common/Tooltip/types";
import { Mode } from "./globals";

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
      brandDark: string;
      sidePanelHeader: string;
      asyncTag: string;
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
