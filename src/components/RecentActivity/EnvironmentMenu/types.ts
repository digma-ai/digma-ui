import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";

export interface EnvironmentMenuItem {
  label: string;
  value: string;
  icon: MemoExoticComponent<(props: IconProps) => JSX.Element>;
}

export interface EnvironmentMenuProps {
  items: EnvironmentMenuItem[];
  onSelect: (value: string) => void;
}
