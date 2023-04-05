import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../common/icons/types";

export interface TabsProps {
  tabs: {
    title: string;
    icon?: ComponentType<IconProps>;
    content: ReactNode;
    disabled?: boolean;
  }[];
  selectedTab: number;
  onSelect: (tabIndex: number) => void;
  className?: string;
}

export interface TabProps {
  isSelected: boolean;
  disabled?: boolean;
}
