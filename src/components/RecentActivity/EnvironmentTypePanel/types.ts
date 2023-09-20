import { EnvironmentType, ExtendedEnvironment } from "../types";

export interface EnvironmentTypePanelProps {
  environment: ExtendedEnvironment;
  onEnvironmentTypeSelect: (environment: string, type: EnvironmentType) => void;
}
