import { ButtonHTMLAttributes } from "react";
import { IconProps } from "../../icons/types";

export type ButtonType = "primary" | "secondary" | "tertiary";

export interface ButtonProps {
  icon?: React.ComponentType<IconProps>;
  label?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  buttonType?: ButtonType;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  form?: ButtonHTMLAttributes<HTMLButtonElement>["form"];
}

export interface ButtonElementProps {
  $type?: ButtonType;
}
