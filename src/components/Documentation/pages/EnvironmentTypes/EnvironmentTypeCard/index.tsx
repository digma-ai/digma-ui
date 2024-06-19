import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import * as s from "./styles";
import { EnvironmentTypeCardProps } from "./types";

export const EnvironmentTypeCard = ({
  name,
  icon: Icon,
  description
}: EnvironmentTypeCardProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.Title>
        <Icon height={24} themeKind={themeKind} />
        <span>{name}</span>
      </s.Title>
      <span>{description}</span>
      {/* <s.StatusContainer>
        {status === "active" && <StatusChip status={status} />}
        {status === "waiting-for-data" && (
          <>
            <StatusChip status={status} />
            <s.NoDataContainer>
              <InfoCircleIcon size={14} color={"currentColor"} />
              <s.Link>What is this?</s.Link>
            </s.NoDataContainer>
          </>
        )}
        {!status && (
          <s.AddEnvironmentButton
            icon={{ component: PlusIcon, color: "currentColor" }}
          >
            Add Environment
          </s.AddEnvironmentButton>
        )}
      </s.StatusContainer> */}
    </s.Container>
  );
};
