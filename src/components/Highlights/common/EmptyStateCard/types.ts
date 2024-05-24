import { ComponentType } from "react";
import { IconProps } from "../../../common/icons/types";

type EmptyStateType = "default" | "success" | "lowSeverity";

export interface EmptyStateCardProps {
  type?: EmptyStateType;
  icon: ComponentType<IconProps>;
  title?: string;
  text?: string;
  customContent?: React.ReactNode;
}

export interface IconContainerProps {
  $type?: EmptyStateType;
}
