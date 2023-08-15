import { ReactNode } from "react";
import { ThemeableIconProps } from "../../common/icons/types";

export interface EmptyStateProps {
  icon?: React.ComponentType<ThemeableIconProps>;
  title?: string;
  content?: ReactNode;
}
