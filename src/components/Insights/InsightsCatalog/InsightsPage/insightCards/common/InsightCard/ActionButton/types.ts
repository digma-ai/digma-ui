import { ComponentType, ReactNode } from "react";
import { IconProps } from "../../../../../../../common/icons/types";

export type ActionButtonType = "icon" | "regular";

export interface ActionButtonProps {
  type?: ActionButtonType;
  icon: ComponentType<IconProps>;
  label: string;
  title?: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}
