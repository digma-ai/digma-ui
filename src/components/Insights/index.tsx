import { useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { actions as globalActions } from "../common/App";
import { Button } from "../common/Button";
import { CircleLoader } from "../common/CircleLoader";
import { CircleLoaderProps } from "../common/CircleLoader/types";
import { CardsIcon } from "../common/icons/CardsIcon";
import { DocumentWithMagnifierIcon } from "../common/icons/DocumentWithMagnifierIcon";
import { LightBulbSmallCrossedIcon } from "../common/icons/LightBulbSmallCrossedIcon";
import { LightBulbSmallIcon } from "../common/icons/LightBulbSmallIcon";
import { OpenTelemetryLogoCrossedSmallIcon } from "../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { EmptyState } from "./EmptyState";
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
  ADD_ANNOTATION: "ADD_ANNOTATION"
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
        background: "#3d3f41"
      };
  }
};

export const Insights = (props: InsightsProps) => {
  const [data, setData] = useState<InsightsData>();
  // const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  // const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const theme = useTheme();
  const circleLoaderColors = getCircleLoaderColors(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });
    // setIsLoaderVisible(true);

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
  //     setIsLoaderVisible(false);
  //   }
  // }, [previousData, data]);

  const handleMethodSelect = (method: Method) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_METHOD,
      payload: {
        ...method
      }
    });
  };

  const handleSlackLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: SLACK_WORKSPACE_URL
      }
    });
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
    window.sendMessageToDigma({
      action: actions.AUTOFIX_MISSING_DEPENDENCY,
      payload: {
        methodId: data?.assetId
      }
    });
  };

  const renderInsightsContent = (data: InsightsData): JSX.Element => {
    switch (data.insightsStatus) {
      case InsightsStatus.STARTUP:
        return (
          <EmptyState
            title={"Nothing to show"}
            icon={DocumentWithMagnifierIcon}
            content={
              <>
                <s.StartupText>
                  <s.Description>
                    Navigate to any code file in your workspace,
                  </s.Description>
                  <s.Description>or click a recent activity,</s.Description>
                  <s.Description>
                    to see runtime data and insights here.
                  </s.Description>
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
              <s.Description>
                Trigger actions that call this code object to learn more about
                its runtime behavior
              </s.Description>
            }
          />
        );
      case InsightsStatus.NO_OBSERVABILITY:
        return data.assetId && data.insights.length > 0 ? (
          <InsightList
            insights={data.insights}
            spans={data.spans}
            environment={data.environment}
            assetId={data.assetId}
            serviceName={data.serviceName}
            hasMissingDependency={data.hasMissingDependency}
            hasObservability={false}
          />
        ) : (
          <EmptyState
            icon={OpenTelemetryLogoCrossedSmallIcon}
            title={"No observability"}
            content={
              <>
                <s.Description>
                  Add an annotation to observe this method and collect data
                  about its runtime behavior
                </s.Description>
                {data.hasMissingDependency && (
                  <s.MissingDependencyContainer>
                    <s.MissingDependencyText>
                      missing dependency: opentelemetry.annotation
                    </s.MissingDependencyText>
                    <s.Link onClick={handleAutofixLinkClick}>Autofix</s.Link>
                  </s.MissingDependencyContainer>
                )}
                <Button
                  onClick={handleAddAnnotationButtonClick}
                  disabled={data.hasMissingDependency}
                >
                  Add annotation
                </Button>
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
        return data.assetId ? (
          <InsightList
            insights={data.insights}
            spans={data.spans}
            environment={data.environment}
            assetId={data.assetId}
            serviceName={data.serviceName}
            hasMissingDependency={data.hasMissingDependency}
            hasObservability={true}
          />
        ) : (
          <></>
        );
    }
  };

  return (
    <s.Container>
      {data?.viewMode === ViewMode.PREVIEW && (
        <Preview methods={data.methods} onMethodSelect={handleMethodSelect} />
      )}
      {data?.viewMode === ViewMode.INSIGHTS && renderInsightsContent(data)}
    </s.Container>
  );
};
