import { ComponentType, MouseEventHandler } from "react";
import { IconProps } from "../../icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";

export interface IconButtonProps {
  icon: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
  buttonType?: ButtonType;
}

export interface ButtonElementProps {
  $type?: ButtonType;
}
