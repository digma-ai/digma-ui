import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "../../common/icons/types";

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
  fullWidth?: boolean;
}
