import type { ButtonHTMLAttributes, ComponentType } from "react";
import type { IconProps } from "../../icons/types";

export type ButtonType =
  | "primary"
  | "secondary"
  | "primaryBorderless"
  | "secondaryBorderless";

export interface BaseButtonProps {
  icon?: ComponentType<IconProps>;
  label?: string;
  buttonType?: ButtonType;
}

export interface ButtonProps extends BaseButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
  iconPosition?: "left" | "right";

  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  form?: ButtonHTMLAttributes<HTMLButtonElement>["form"];
}

export interface ButtonElementProps {
  $type?: ButtonType;
}
