import { ComponentType, ReactNode } from "react";
import { EnvironmentType } from "../../common/App/types";
import { IconProps } from "../../common/icons/types";
import { EnvironmentV2 } from "../types";

export interface EnvironmentTypePanelProps {
  environment: EnvironmentV2;
  onEnvironmentTypeSelect: (type: EnvironmentType) => void;
}

export interface EnvironmentTypeData {
  type: EnvironmentType;
  title: string;
  description: ReactNode;
  icon: ComponentType<IconProps>;
  button: ReactNode;
}
