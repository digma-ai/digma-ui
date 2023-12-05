import { ReactNode } from "react";
import { EnvironmentType, ExtendedEnvironment } from "../types";

export interface EnvironmentTypePanelProps {
  environment: ExtendedEnvironment;
  onEnvironmentTypeSelect: (environment: string, type: EnvironmentType) => void;
}

export interface EnvironmentTypeData {
  type: EnvironmentType;
  title: string;
  description: ReactNode;
  icon: ReactNode;
  button: ReactNode;
}
