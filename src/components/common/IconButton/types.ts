import { ComponentType, MouseEventHandler } from "react";
import { IconProps } from "../icons/types";

export interface IconButtonProps {
  icon: ComponentType<IconProps>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
