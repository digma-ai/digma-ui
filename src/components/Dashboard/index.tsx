import { useEffect } from "react";
import { useTheme } from "styled-components";
import { isString } from "../../typeGuards/isString";
import { addPrefix } from "../../utils/addPrefix";
import { getThemeKind } from "../common/App/styles";
import { DigmaLogoIcon } from "../common/icons/DigmaLogoIcon";
import * as s from "./styles";
import { DashboardProps } from "./types";

const ACTION_PREFIX = "DASHBOARD";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE"
});

const environment = window.dashboardEnvironment;

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
        <s.DashboardCard>Slow queries</s.DashboardCard>
        <s.DashboardCard>Slow endpoints</s.DashboardCard>
        <s.DashboardCard>Slow endpoints</s.DashboardCard>
      </s.ContentContainer>
    </s.Container>
  );
};
