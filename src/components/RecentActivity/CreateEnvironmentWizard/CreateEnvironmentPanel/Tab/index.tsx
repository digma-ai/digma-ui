import { CheckIcon } from "../../../../common/icons/12px/CheckIcon";
import { ErrorIcon } from "../../../../common/icons/16px/ErrorIcon";
import { StepStatus } from "../../types";
import * as s from "./styles";
import { TabProps } from "./types";

const getState = (index: number, state: StepStatus) => {
  switch (state) {
    case "completed":
      return (
        <s.CheckIconContainer>
          <CheckIcon color={"currentColor"} />
        </s.CheckIconContainer>
      );
    case "error":
      return (
        <s.ErrorIconContainer>
          <ErrorIcon size={20} color={"currentColor"} />
        </s.ErrorIconContainer>
      );
    default:
      return index;
  }
};

export const Tab = ({ index, name, state }: TabProps) => {
  return (
    <s.Container>
      <s.Index $state={state}>{getState(index, state)}</s.Index>
      <s.Name $isActive={state === "active"}>{name}</s.Name>
    </s.Container>
  );
};
