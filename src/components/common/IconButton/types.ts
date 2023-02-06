import { IconProps } from "../icons/types";

export interface IconButtonProps {
  icon: React.ComponentType<IconProps>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
