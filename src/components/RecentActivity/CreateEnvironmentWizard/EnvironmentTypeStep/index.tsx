import { EnvironmentTypePanel } from "../../EnvironmentTypePanel";
import * as s from "./styles";
import { EnvironmentTypeStepProps } from "./types";

export const EnvironmentTypeStep = ({
  handleEnvironmentTypeSelect,
  environment
}: EnvironmentTypeStepProps) => {
  return (
    <s.Container>
      <EnvironmentTypePanel
        environment={environment}
        onEnvironmentTypeSelect={handleEnvironmentTypeSelect}
      />
    </s.Container>
  );
};
