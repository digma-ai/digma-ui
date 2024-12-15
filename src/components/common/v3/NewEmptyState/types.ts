import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "../../../common/icons/types";

export interface EmptyStateProps {
  icon?: ComponentType<IconProps>;
  title?: string;
  content?: ReactNode;
}
