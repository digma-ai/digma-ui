import type { ComponentType } from "react";
import type { IconProps } from "../../../../../../../common/icons/types";

export interface IconButtonProps {
  icon: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  title?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string;
}
