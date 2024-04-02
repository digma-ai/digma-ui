import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { getFeatureFlagValue } from "../../featureFlags";
import { platform } from "../../platform";
import { isString } from "../../typeGuards/isString";
import { FeatureFlag } from "../../types";
import { openURLInDefaultBrowser } from "../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { formatEnvironmentName } from "../../utils/formatEnvironmentName";
import { ConfigContext } from "../common/App/ConfigContext";
import { getThemeKind } from "../common/App/styles";
import { DeploymentType } from "../common/App/types";
import { CircleLoader } from "../common/CircleLoader";
import { DigmaLogoIcon } from "../common/icons/DigmaLogoIcon";
import { OpenLinkIcon } from "../common/icons/OpenLinkIcon";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { EnvironmentInfoData } from "./types";
import { ClientSpansPerformanceImpact } from "./widgets/ClientSpansPerformanceImpact";
import { SlowQueries } from "./widgets/SlowQueries";

const DIGMA_UI_DEFAULT_PORT = 5280;

const environment = isString(window.dashboardEnvironment)
  ? window.dashboardEnvironment
  : new URLSearchParams(window.location.search).get("environment") || "";

export const Dashboard = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [environmentName, setEnvironmentName] = useState(
    platform === "Web" ? "" : formatEnvironmentName(environment)
  );

  const isClientSpansOverallImpactEnabled = getFeatureFlagValue(
    config,
    FeatureFlag.IS_DASHBOARD_CLIENT_SPANS_OVERALL_IMPACT_ENABLED
  );

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
    window.sendMessageToDigma({
      action: actions.GET_ENVIRONMENT_INFO
    });

    const handleSetEnvironmentInfoData = (data: unknown) => {
      const environmentInfo = data as EnvironmentInfoData;
      if (environmentInfo.data) {
        setEnvironmentName(environmentInfo.data.displayName);
      } else {
        setEnvironmentName(formatEnvironmentName(environment));
      }
    };

    dispatcher.addActionListener(
      actions.SET_ENVIRONMENT_INFO,
      handleSetEnvironmentInfoData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ENVIRONMENT_INFO,
        handleSetEnvironmentInfoData
      );
    };
  }, []);

  useEffect(() => {
    sendTrackingEvent(trackingEvents.PAGE_LOADED);
  }, []);

  useEffect(() => {
    if (config.backendInfo) {
      setIsInitialLoading(false);
    }
  }, [config.backendInfo]);

  const title = `Dashboard${
    environmentName.length > 0 ? ` - ${environmentName}` : ""
  }`;

  return (
    <s.Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <s.Header>
        <s.Title>
          <s.IconContainer>
            <DigmaLogoIcon size={16} themeKind={themeKind} />
          </s.IconContainer>
          Dashboard
          {environment.length > 0 && (
            <s.EnvironmentName>{environmentName}</s.EnvironmentName>
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
                <OpenLinkIcon color={"currentColor"} size={14} />
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
