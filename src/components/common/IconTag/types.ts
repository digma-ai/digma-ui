import { ComponentType } from "react";
import { IconProps } from "../icons/types";

export type IconTagSize = "small" | "large";

export interface IconTagThemeColors {
  background: string;
  border: string;
  icon: string;
}

export interface IconTagProps {
  icon: ComponentType<IconProps>;
  size?: IconTagSize;
}

export interface ContainerProps {
  $size: IconTagSize;
}
