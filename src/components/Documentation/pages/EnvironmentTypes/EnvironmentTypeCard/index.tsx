import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import * as s from "./styles";
import { EnvironmentTypeCardProps } from "./types";

export const EnvironmentTypeCard = (props: EnvironmentTypeCardProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.Title>
        <props.icon height={24} themeKind={themeKind} />
        <span>{props.name}</span>
      </s.Title>
      <span>{props.description}</span>
      {/* <s.StatusContainer>
        {props.status === "active" && <StatusChip status={props.status} />}
        {props.status === "waiting-for-data" && (
          <>
            <StatusChip status={props.status} />
            <s.NoDataContainer>
              <InfoCircleIcon size={14} color={"currentColor"} />
              <s.Link>What is this?</s.Link>
            </s.NoDataContainer>
          </>
        )}
        {!props.status && (
          <s.AddEnvironmentButton
            icon={{ component: PlusIcon, color: "#b9c2eb" }}
          >
            Add Environment
          </s.AddEnvironmentButton>
        )}
      </s.StatusContainer> */}
    </s.Container>
  );
};
