import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { CheckIcon } from "../../../../common/icons/12px/CheckIcon";
import { ErrorIcon } from "../../../../common/icons/16px/ErrorIcon";
import { StepStatus } from "../../types";
import * as s from "./styles";
import { TabProps } from "./types";

const getState = (index: number, theme: DefaultTheme, state: StepStatus) => {
  switch (state) {
    case "completed":
      return <CheckIcon color={theme.colors.v3.status.success} />;
    case "error":
      return <ErrorIcon size={20} color={theme.colors.v3.status.high} />;
    default:
      return index;
  }
};

export const Tab = ({ index, name, state }: TabProps) => {
  const theme = useTheme();
  return (
    <s.Container>
      <s.Index $state={state}>{getState(index, theme, state)}</s.Index>
      <s.Name $isActive={state === "active"}>{name}</s.Name>
    </s.Container>
  );
};
