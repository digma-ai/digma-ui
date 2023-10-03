import { useEffect } from "react";
import { useTheme } from "styled-components";
import { isString } from "../../typeGuards/isString";
import { getThemeKind } from "../common/App/styles";
import { DigmaLogoIcon } from "../common/icons/DigmaLogoIcon";
import { SlowQueries } from "./SlowQueries";
import { actions } from "./actions";
import * as s from "./styles";
import { DashboardProps } from "./types";

const environment = isString(window.dashboardEnvironment)
  ? window.dashboardEnvironment
  : "";

export const Dashboard = (props: DashboardProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  return (
    <s.Container>
      <s.Header>
        <s.Title>
          <s.LogoContainer>
            <DigmaLogoIcon size={16} themeKind={themeKind} />
          </s.LogoContainer>
          Dashboard
          {isString(environment) && environment.length > 0 && (
            <s.EnvironmentName>{environment}</s.EnvironmentName>
          )}
        </s.Title>
      </s.Header>
      <s.ContentContainer>
        <s.DashboardCard>
          <SlowQueries environment={environment} />
        </s.DashboardCard>
      </s.ContentContainer>
    </s.Container>
  );
};
