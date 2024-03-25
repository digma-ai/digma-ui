import { EnvironmentType } from "../../../common/App/types";
import { EnvironmentV2 } from "../../types";

export interface EnvironmentTypeStepProps {
  handleEnvironmentTypeSelect: (type: EnvironmentType) => void;
  environment: EnvironmentV2;
  onNext: () => void;
}
