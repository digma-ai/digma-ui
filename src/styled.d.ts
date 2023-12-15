import "styled-components";
import { AttachmentTagThemeColors } from "./components/Insights/JiraTicket/AttachmentTag/types";
import { FieldThemeColors } from "./components/Insights/JiraTicket/Field/types";
import { JiraTicketThemeColors } from "./components/Insights/JiraTicket/types";
import { TabThemeColors } from "./components/RecentActivity/EnvironmentPanel/EnvironmentTab/types";
import { ToggleThemeColors } from "./components/RecentActivity/Toggle/types";
import { RecentActivityThemeColors } from "./components/RecentActivity/types";
import { IconTagThemeColors } from "./components/common/IconTag/types";
import { ButtonThemeColors } from "./components/common/NewButton/types";
import { TagThemeColors } from "./components/common/Tag/types";
import { TooltipThemeColors } from "./components/common/Tooltip/types";
import { Mode } from "./globals";

export interface ThemeColors {
  icon: string;
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
}

declare module "styled-components" {
  export interface DefaultTheme {
    mode: Mode;
    mainFont: string;
    codeFont: string;
    colors: ThemeColors;
  }
}
