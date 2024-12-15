import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "../../../../../../../common/icons/types";

export type ActionButtonType = "icon" | "regular";

export interface ActionButtonProps {
  type?: ActionButtonType;
  icon: ComponentType<IconProps>;
  label: string;
  title?: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
  tooltip?: ReactNode;
}
