import { CheckmarkIcon } from "../../../../common/icons/12px/CheckmarkIcon";
import { ErrorIcon } from "../../../../common/icons/16px/ErrorIcon";
import type { StepStatus } from "../../types";
import * as s from "./styles";
import type { TabProps } from "./types";

const getState = (index: number, state: StepStatus) => {
  switch (state) {
    case "completed":
      return (
        <s.CheckMarkIconContainer>
          <CheckmarkIcon color={"currentColor"} />
        </s.CheckMarkIconContainer>
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
