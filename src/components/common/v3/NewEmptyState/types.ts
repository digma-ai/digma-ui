import { ReactNode } from "react";
import { IconProps } from "../../../common/icons/types";

export interface EmptyStateProps {
  icon?: React.ComponentType<IconProps>;
  title?: string;
  content?: ReactNode;
}
