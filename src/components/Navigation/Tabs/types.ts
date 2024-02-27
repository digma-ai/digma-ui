import { TabData } from "../types";

export interface TabsProps {
  tabs: TabData[];
  onSelect: (tabId: string) => void;
}

export interface TabProps {
  $isSelected: boolean;
  $isDisabled: boolean;
}

export interface IndicatorProps {
  type: "new" | "errors";
}
