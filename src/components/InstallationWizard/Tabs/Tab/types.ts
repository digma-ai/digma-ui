import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "../../../common/icons/types";

export interface TabProps {
  isSelected: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  icon?: ComponentType<IconProps>;
  children: ReactNode;
  fullWidth?: boolean;
}

export interface ContainerProps {
  $isSelected: boolean;
  $isDisabled?: boolean;
  $fullWidth?: boolean;
}
