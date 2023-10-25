import { ExtendedEnvironment } from "../../types";

export interface EnvironmentTabProps {
  environment: ExtendedEnvironment;
  isSelected: boolean;
  onClick: (environment: ExtendedEnvironment) => void;
  onEnvironmentDelete: (environment: string) => void;
}

export interface ContainerProps {
  $isSelected: boolean;
  $isPending?: boolean;
}
