import { ComponentType, ReactNode } from "react";
import { ThemeableIconProps } from "../../common/icons/types";

export interface EmptyStateProps {
  icon?: ComponentType<ThemeableIconProps>;
  title?: string;
  content?: ReactNode;
}
