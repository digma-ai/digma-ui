import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../../common/icons/types";

export interface EmptyStateProps {
  icon?: ComponentType<IconProps>;
  title?: string;
  content?: ReactNode;
}
