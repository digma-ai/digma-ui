import type { EnvironmentType } from "../../../common/App/types";
import { EnvironmentTypePanel } from "../EnvironmentTypePanel";
import * as s from "./styles";
import type { EnvironmentTypeStepProps } from "./types";

export const EnvironmentTypeStep = ({
  handleEnvironmentTypeSelect,
  onNext
}: EnvironmentTypeStepProps) => {
  return (
    <s.Container>
      <EnvironmentTypePanel
        onEnvironmentTypeSelect={(type: EnvironmentType) => {
          handleEnvironmentTypeSelect(type);
          onNext();
        }}
      />
    </s.Container>
  );
};
