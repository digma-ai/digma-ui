import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { gte, valid } from "semver";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../actions";
import { platform } from "../../platform";
import { isString } from "../../typeGuards/isString";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { ConfigContext } from "../common/App/ConfigContext";
import { getThemeKind } from "../common/App/styles";
import { DeploymentType } from "../common/App/types";
import { CircleLoader } from "../common/CircleLoader";
import { DigmaLogoIcon } from "../common/icons/DigmaLogoIcon";
import { OpenLinkIcon } from "../common/icons/OpenLinkIcon";
import { actions } from "./actions";
import * as s from "./styles";
import { ClientSpansPerformanceImpact } from "./widgets/ClientSpansPerformanceImpact";
import { SlowQueries } from "./widgets/SlowQueries";

const DIGMA_UI_DEFAULT_PORT = 5280;

const formatEnvironmentName = (environment: string) => {
  const suffixes = ["LOCAL", "LOCAL-TESTS"];

  for (const suffix of suffixes) {
    if (environment.endsWith(`[${suffix}]`)) {
      return suffix;
    }
  }

  return environment;
};

const environment = isString(window.dashboardEnvironment)
  ? window.dashboardEnvironment
  : new URLSearchParams(window.location.search).get("environment") || "";

export const Dashboard = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const backendVersion = config.backendInfo?.applicationVersion;
  const formattedEnvironmentName = formatEnvironmentName(environment);

  const isClientSpansOverallImpactEnabled =
    backendVersion &&
    (backendVersion === "unknown" ||
      (valid(backendVersion) && gte(backendVersion, "v0.2.172-alpha.8")));

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

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
    window.sendMessageToDigma({
      action: globalActions.GET_BACKEND_INFO
    });
  }, []);

  useEffect(() => {
    if (config.backendInfo) {
      setIsInitialLoading(false);
    }
  }, [config.backendInfo]);

  return (
    <s.Container>
      <Helmet>
        <title>Dashboard - {formattedEnvironmentName}</title>
      </Helmet>
      <s.Header>
        <s.Title>
          <s.IconContainer>
            <DigmaLogoIcon size={16} themeKind={themeKind} />
          </s.IconContainer>
          Dashboard
          {environment.length > 0 && (
            <s.EnvironmentName>{formattedEnvironmentName}</s.EnvironmentName>
          )}
        </s.Title>
        {platform !== "Web" &&
          config.backendInfo &&
          !(
            [
              DeploymentType.DOCKER_COMPOSE,
              DeploymentType.DOCKER_EXTENSION
            ] as string[]
          ).includes(config.backendInfo.deploymentType) && (
            <s.OpenInBrowserLink onClick={handleOpenInBrowserLinkClick}>
              Open in browser
              <s.IconContainer>
                <OpenLinkIcon color="currentColor" size={14} />
              </s.IconContainer>
            </s.OpenInBrowserLink>
          )}
      </s.Header>
      <s.ContentContainer>
        {isInitialLoading ? (
          <s.LoaderContainer>
            <CircleLoader size={32} />
          </s.LoaderContainer>
        ) : (
          <>
            <SlowQueries environment={environment} />
            {isClientSpansOverallImpactEnabled && (
              <ClientSpansPerformanceImpact environment={environment} />
            )}
          </>
        )}
      </s.ContentContainer>
    </s.Container>
  );
};
