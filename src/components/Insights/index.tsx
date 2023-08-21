import { useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { Button } from "../common/Button";
import { CircleLoader } from "../common/CircleLoader";
import { CircleLoaderProps } from "../common/CircleLoader/types";
import { EmptyState } from "../common/EmptyState";
import { CardsIcon } from "../common/icons/CardsIcon";
import { DocumentWithMagnifierIcon } from "../common/icons/DocumentWithMagnifierIcon";
import { LightBulbSmallCrossedIcon } from "../common/icons/LightBulbSmallCrossedIcon";
import { LightBulbSmallIcon } from "../common/icons/LightBulbSmallIcon";
import { OpenTelemetryLogoCrossedSmallIcon } from "../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { InsightList } from "./InsightList";
import { Preview } from "./Preview";
import * as s from "./styles";
import {
  InsightsData,
  InsightsProps,
  InsightsStatus,
  Method,
  ViewMode
} from "./types";

const REFRESH_INTERVAL = isNumber(window.insightsRefreshInterval)
  ? window.insightsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "INSIGHTS";

export const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GO_TO_ERRORS: "GO_TO_ERRORS",
  GO_TO_ERROR: "GO_TO_ERROR",
  GO_TO_METHOD: "GO_TO_METHOD",
  GO_TO_TRACE: "GO_TO_TRACE",
  GO_TO_TRACE_COMPARISON: "GO_TO_TRACE_COMPARISON",
  GO_TO_ASSET: "GO_TO_ASSET",
  OPEN_HISTOGRAM: "OPEN_HISTOGRAM",
  OPEN_LIVE_VIEW: "OPEN_LIVE_VIEW",
  RECALCULATE: "RECALCULATE",
  AUTOFIX_MISSING_DEPENDENCY: "AUTOFIX_MISSING_DEPENDENCY",
  ADD_ANNOTATION: "ADD_ANNOTATION",
  REFRESH_ALL: "REFRESH_ALL"
});

const getCircleLoaderColors = (
  theme: DefaultTheme
): CircleLoaderProps["colors"] => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#fff"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#2b2d30"
      };
  }
};

export const Insights = (props: InsightsProps) => {
  const [data, setData] = useState<InsightsData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  // const [isInitialLoading, setIsInitialLoading] = useState(false);
  const theme = useTheme();
  const circleLoaderColors = getCircleLoaderColors(theme);
  const [isAutofixing, setIsAutofixing] = useState(false);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });
    // setIsInitialLoading(true);

    const handleInsightsData = (data: unknown, timeStamp: number) => {
      setData(data as InsightsData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleInsightsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleInsightsData);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_DATA
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [props.data]);

  // useEffect(() => {
  //   if (!previousData && data) {
  //     setIsInitialLoading(false);
  //   }
  // }, [previousData, data]);

  useEffect(() => {
    if (previousData && data && previousData.assetId !== data.assetId) {
      setIsAutofixing(false);
    }
  }, [previousData, data]);

  const handleMethodSelect = (method: Method) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_METHOD,
      payload: {
        ...method
      }
    });
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleAddAnnotationButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.ADD_ANNOTATION,
      payload: {
        methodId: data?.assetId
      }
    });
  };

  const handleAutofixLinkClick = () => {
    if (!isAutofixing) {
      window.sendMessageToDigma({
        action: actions.AUTOFIX_MISSING_DEPENDENCY,
        payload: {
          methodId: data?.assetId
        }
      });
      setIsAutofixing(true);
    }
  };

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "insights"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const renderDefaultContent = (data?: InsightsData): JSX.Element => {
    if (data?.viewMode === ViewMode.PREVIEW) {
      return (
        <Preview methods={data.methods} onMethodSelect={handleMethodSelect} />
      );
    }

    if (data?.viewMode === ViewMode.INSIGHTS && data.assetId) {
      return (
        <InsightList
          key={data.assetId}
          insights={data.insights}
          spans={data.spans}
          environment={data.environment}
          assetId={data.assetId}
          serviceName={data.serviceName}
          hasMissingDependency={data.hasMissingDependency}
          canInstrumentMethod={data.canInstrumentMethod}
          hasObservability={!data.needsObservabilityFix}
        />
      );
    }

    return <></>;
  };

  const renderContent = (data?: InsightsData): JSX.Element => {
    switch (data?.insightsStatus) {
      case InsightsStatus.STARTUP:
        return (
          <EmptyState
            title={"Nothing to show"}
            icon={DocumentWithMagnifierIcon}
            content={
              <>
                <s.StartupText>
                  <s.EmptyStateDescription>
                    Navigate to any code file in your workspace,
                  </s.EmptyStateDescription>
                  <s.EmptyStateDescription>
                    or click a recent activity,
                  </s.EmptyStateDescription>
                  <s.EmptyStateDescription>
                    to see runtime data and insights here.
                  </s.EmptyStateDescription>
                </s.StartupText>
                <s.SlackLink onClick={handleSlackLinkClick}>
                  <SlackLogoIcon />
                  Join Our Slack Channel for Support
                </s.SlackLink>
              </>
            }
          />
        );

      case InsightsStatus.NO_INSIGHTS:
        return (
          <EmptyState icon={LightBulbSmallCrossedIcon} title={"No insights"} />
        );
      case InsightsStatus.INSIGHT_PENDING:
        return (
          <EmptyState
            icon={LightBulbSmallIcon}
            title={"Processing insights..."}
          />
        );
      case InsightsStatus.NO_SPANS_DATA:
        return (
          <EmptyState
            icon={CardsIcon}
            title={"No data yet"}
            content={
              <>
                <s.EmptyStateDescription>
                  Trigger actions that call this application to learn more about
                  its runtime behavior
                </s.EmptyStateDescription>
                <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
                  Not seeing your application data?
                </s.TroubleshootingLink>
              </>
            }
          />
        );
      case InsightsStatus.NO_OBSERVABILITY:
        return (
          <EmptyState
            icon={OpenTelemetryLogoCrossedSmallIcon}
            title={"No observability"}
            content={
              <>
                <s.EmptyStateDescription>
                  Add an annotation to observe this method and collect data
                  about its runtime behavior
                </s.EmptyStateDescription>
                {data.hasMissingDependency && (
                  <s.MissingDependencyContainer>
                    <s.MissingDependencyText>
                      missing dependency: opentelemetry.annotation
                    </s.MissingDependencyText>
                    <s.Link onClick={handleAutofixLinkClick}>Autofix</s.Link>
                  </s.MissingDependencyContainer>
                )}
                {data.canInstrumentMethod && (
                  <Button
                    onClick={handleAddAnnotationButtonClick}
                    disabled={data.hasMissingDependency}
                  >
                    Add annotation
                  </Button>
                )}
              </>
            }
          />
        );
      case InsightsStatus.LOADING:
        return (
          <EmptyState
            content={<CircleLoader colors={circleLoaderColors} size={32} />}
          />
        );
      case InsightsStatus.DEFAULT:
      default:
        return renderDefaultContent(data);
    }
  };

  return <s.Container>{renderContent(data)}</s.Container>;
};
