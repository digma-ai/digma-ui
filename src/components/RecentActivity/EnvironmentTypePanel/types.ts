import { ComponentType, ReactNode } from "react";
import { EnvironmentType } from "../../common/App/types";
import { IconProps } from "../../common/icons/types";
import { ExtendedEnvironment } from "../types";

export interface EnvironmentTypePanelProps {
  environment: ExtendedEnvironment;
  onEnvironmentTypeSelect: (environment: string, type: EnvironmentType) => void;
}

export interface EnvironmentTypeData {
  type: EnvironmentType;
  title: string;
  description: ReactNode;
  icon: ComponentType<IconProps>;
  button: ReactNode;
}
