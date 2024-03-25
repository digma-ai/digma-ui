import { EnvironmentType } from "../../../common/App/types";
import { EnvironmentTypePanel } from "../../EnvironmentTypePanel";
import * as s from "./styles";
import { EnvironmentTypeStepProps } from "./types";

export const EnvironmentTypeStep = ({
  handleEnvironmentTypeSelect,
  environment,
  onNext
}: EnvironmentTypeStepProps) => {
  return (
    <s.Container>
      <EnvironmentTypePanel
        environment={environment}
        onEnvironmentTypeSelect={(type: EnvironmentType) => {
          handleEnvironmentTypeSelect(type);
          onNext();
        }}
      />
    </s.Container>
  );
};
