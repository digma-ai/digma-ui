import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../common/icons/types";

type EmptyStateType = "default" | "success" | "lowSeverity";

export interface EmptyStateCardProps {
  type?: EmptyStateType;
  icon: ComponentType<IconProps>;
  title?: string;
  text?: string;
  customContent?: ReactNode;
  blurredContent?: JSX.Element;
}

export interface ContainerProps {
  $blurredContent?: boolean;
  $height: number;
}

export interface IconContainerProps {
  $type?: EmptyStateType;
}

export interface CardProps {
  $blurredBackground?: boolean;
}
