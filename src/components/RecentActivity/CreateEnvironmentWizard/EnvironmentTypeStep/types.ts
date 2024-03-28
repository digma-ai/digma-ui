import { EnvironmentType } from "../../../common/App/types";

export interface EnvironmentTypeStepProps {
  handleEnvironmentTypeSelect: (type: EnvironmentType) => void;
  onNext: () => void;
}
