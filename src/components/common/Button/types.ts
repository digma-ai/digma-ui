import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import type { IconProps } from "../icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";

export interface ButtonProps {
  icon?: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  afterTextIcon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  buttonType?: ButtonType;
}

export interface ButtonElementProps {
  $buttonType?: ButtonType;
}
