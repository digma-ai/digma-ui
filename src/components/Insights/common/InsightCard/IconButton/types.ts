import { ComponentType } from "react";
import { IconProps } from "../../../../common/icons/types";

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
