import type { ComponentType } from "react";
import type { Platform } from "../../../globals";
import type { IconProps } from "../../common/icons/types";

export interface TabsProps {
  selectedTabId: string;
  onTabSelect: (tabId: string) => void;
  spanCodeObjectId?: string;
  unreadInsightsCount?: number;
  hasErrors?: boolean;
  environmentId?: string;
  services?: string[];
}

export interface TabProps {
  $isSelected: boolean;
  $isDisabled: boolean;
  $width?: number;
}

export interface IndicatorProps {
  type: "new" | "errors";
}

export interface BaseTabData {
  title?: string;
  id: string;
  /**
   * Width of the tab in pixels
   */
  width?: number;
  icon?: ComponentType<IconProps>;
  platforms: Platform[];
}

export interface TabData extends BaseTabData {
  isSelected: boolean;
  isDisabled: boolean;
  hasNewData: boolean;
  tooltipMessage?: string;
}

export const TAB_IDS = {
  HIGHLIGHTS: "highlights",
  ISSUES: "issues",
  ASSETS: "assets",
  ANALYTICS: "analytics",
  ERRORS: "errors",
  TESTS: "tests"
};
