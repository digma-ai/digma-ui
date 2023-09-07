import { MemoExoticComponent } from "react";
import { IconProps } from "../../common/icons/types";

export interface EnvironmentMenuProps {
  items: {
    label: string;
    value: string;
    icon?: MemoExoticComponent<(props: IconProps) => JSX.Element>;
  }[];
  onSelect: (value: string) => void;
}
