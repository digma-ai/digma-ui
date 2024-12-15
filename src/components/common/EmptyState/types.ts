import type { ComponentType, ReactNode } from "react";
import type { ThemeableIconProps } from "../../common/icons/types";

export interface EmptyStateProps {
  icon?: ComponentType<ThemeableIconProps>;
  title?: string;
  content?: ReactNode;
}
