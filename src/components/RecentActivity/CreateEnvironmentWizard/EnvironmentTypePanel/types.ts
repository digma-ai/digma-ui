import type { ComponentType, ReactNode } from "react";
import type { EnvironmentType } from "../../../../redux/services/types";
import type { IconProps } from "../../../common/icons/types";

export interface EnvironmentTypePanelProps {
  onEnvironmentTypeSelect: (type: EnvironmentType) => void;
}

export interface EnvironmentTypeData {
  type: EnvironmentType;
  title: string;
  description: ReactNode;
  icon: ComponentType<IconProps>;
  button: ReactNode;
}
