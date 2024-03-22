import { useTheme } from "styled-components";
import { CheckIcon } from "../../../../common/icons/12px/CheckIcon";
import * as s from "./styles";
import { TabProps } from "./types";

export const Tab = ({ index, name, state }: TabProps) => {
  const theme = useTheme();
  return (
    <s.Container>
      <s.Index $state={state}>
        {state === "confirmed" ? (
          <CheckIcon color={theme.colors.v3.status.success} />
        ) : (
          index
        )}
      </s.Index>
      <s.Name $isActive={state === "active"}>{name}</s.Name>
    </s.Container>
  );
};
