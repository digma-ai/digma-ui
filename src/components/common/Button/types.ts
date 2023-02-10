import { ComponentType } from "react";
import { IconProps } from "../icons/types";

export interface ButtonProps {
  icon?: ComponentType<IconProps>;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
