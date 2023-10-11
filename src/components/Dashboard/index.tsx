import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { platform } from "../../platform";
import { isString } from "../../typeGuards/isString";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { ConfigContext } from "../common/App/ConfigContext";
import { getThemeKind } from "../common/App/styles";
import { DigmaLogoIcon } from "../common/icons/DigmaLogoIcon";
import { OpenLinkIcon } from "../common/icons/OpenLinkIcon";
import { SlowQueries } from "./SlowQueries";
import { actions } from "./actions";
import * as s from "./styles";
import { DashboardProps } from "./types";

const DIGMA_UI_DEFAULT_PORT = 5280;

const environment = isString(window.dashboardEnvironment)
  ? window.dashboardEnvironment
  : new URLSearchParams(window.location.search).get("environment") || "";

export const Dashboard = (props: DashboardProps) => {
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const handleOpenInBrowserLinkClick = () => {
    const hostname = new URL(config.digmaApiUrl).hostname;
    const digmaUiUrl = `http://${hostname}:${DIGMA_UI_DEFAULT_PORT}`;
    const dashboardUrl = new URL(digmaUiUrl);
    dashboardUrl.pathname = "/dashboard";
    const queryParams = new URLSearchParams({
      environment
    });
    dashboardUrl.search = queryParams.toString();
    openURLInDefaultBrowser(dashboardUrl.toString());
  };

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  return (
    <s.Container>
      <Helmet>
        <title>Dashboard - {environment}</title>
      </Helmet>
      <s.Header>
        <s.Title>
          <s.IconContainer>
            <DigmaLogoIcon size={16} themeKind={themeKind} />
          </s.IconContainer>
          Dashboard
          {environment.length > 0 && (
            <s.EnvironmentName>{environment}</s.EnvironmentName>
          )}
        </s.Title>
        {platform !== "Web" && (
          <s.OpenInBrowserLink onClick={handleOpenInBrowserLinkClick}>
            Open in browser
            <s.IconContainer>
              <OpenLinkIcon color="currentColor" size={14} />
            </s.IconContainer>
          </s.OpenInBrowserLink>
        )}
      </s.Header>
      <s.ContentContainer>
        <s.DashboardCard>
          <SlowQueries environment={environment} />
        </s.DashboardCard>
      </s.ContentContainer>
    </s.Container>
  );
};
