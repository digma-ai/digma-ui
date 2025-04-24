import type { EnvironmentType } from "../../../../redux/services/types";

export interface EnvironmentTypeStepProps {
  handleEnvironmentTypeSelect: (type: EnvironmentType) => void;
  onNext: () => void;
  isCentralizedDeployment: boolean;
}
