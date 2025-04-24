import type { EnvironmentType } from "../../../../redux/services/types";
import { EnvironmentTypePanel } from "./EnvironmentTypePanel";
import * as s from "./styles";
import type { EnvironmentTypeStepProps } from "./types";

export const EnvironmentTypeStep = ({
  handleEnvironmentTypeSelect,
  isCentralizedDeployment,
  onNext
}: EnvironmentTypeStepProps) => (
  <s.Container>
    <EnvironmentTypePanel
      isCentralizedDeployment={isCentralizedDeployment}
      onEnvironmentTypeSelect={(type: EnvironmentType) => {
        handleEnvironmentTypeSelect(type);
        onNext();
      }}
    />
  </s.Container>
);
