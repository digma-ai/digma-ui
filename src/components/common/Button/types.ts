import { ComponentType, MouseEventHandler, ReactNode } from "react";
import { IconProps } from "../icons/types";

export type ButtonType = "primary" | "secondary";

export interface ButtonProps {
  icon?: {
    component: ComponentType<IconProps>;
    color?: string;
    size?: number;
  };
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  buttonType?: ButtonType;
}

export interface ButtonElementProps {
  buttonType?: ButtonType;
}
