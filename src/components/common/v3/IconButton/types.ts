import { ComponentType, MouseEventHandler } from "react";
import { IconProps } from "../../icons/types";

export interface IconButtonProps {
  icon: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}
