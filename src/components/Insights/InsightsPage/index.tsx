import { useContext, useEffect, useRef } from "react";
import { actions as globalActions } from "../../../actions";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ChangeScopePayload, ChangeViewPayload } from "../../Navigation/types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EmptyState } from "../../common/EmptyState";
import { CardsIcon } from "../../common/icons/CardsIcon";
import { actions } from "../actions";
import { DurationBreakdownInsight } from "../common/insights/DurationBreakdownInsight";
import { DurationInsight } from "../common/insights/DurationInsight";
import { EndpointBottleneckInsight } from "../common/insights/EndpointBottleneckInsight";
import { EndpointChattyApiV2Insight } from "../common/insights/EndpointChattyApiV2Insight";
import { EndpointNPlusOneInsight } from "../common/insights/EndpointNPlusOneInsight";
import { EndpointQueryOptimizationInsight } from "../common/insights/EndpointQueryOptimizationInsight";
import { EndpointQueryOptimizationV2Insight } from "../common/insights/EndpointQueryOptimizationV2Insight";
import { EndpointSlowdownSourceInsight } from "../common/insights/EndpointSlowdownSourceInsight";
import { ExcessiveAPICallsInsight } from "../common/insights/ExcessiveAPICallsInsight";
import { HighNumberOfQueriesInsight } from "../common/insights/HighNumberOfQueriesInsight";
import { RequestBreakdownInsight } from "../common/insights/RequestBreakdownInsight";
import { ScalingIssueInsight } from "../common/insights/ScalingIssueInsight";
import { SessionInViewInsight } from "../common/insights/SessionInViewInsight";
import { SlowEndpointInsight } from "../common/insights/SlowEndpointInsight";
import { SpanEndpointBottleneckInsight } from "../common/insights/SpanEndpointBottleneckInsight";
import { SpanNPlusOneInsight } from "../common/insights/SpanNPlusOneInsight";
import { SpanNexusInsight } from "../common/insights/SpanNexusInsight";
import { SpanQueryOptimizationInsight } from "../common/insights/SpanQueryOptimizationInsight";
import { TopUsageInsight } from "../common/insights/TopUsageInsight";
import { TrafficInsight } from "../common/insights/TrafficInsight";
import { trackingEvents } from "../tracking";
import {
  isChattyApiEndpointInsight,
  isEndpointBottleneckInsight,
  isEndpointBreakdownInsight,
  isEndpointChattyApiV2Insight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointHighUsageInsight,
  isEndpointLowUsageInsight,
  isEndpointNormalUsageInsight,
  isEndpointQueryOptimizationInsight,
  isEndpointQueryOptimizationV2Insight,
  isEndpointSlowdownSourceInsight,
  isEndpointSpanNPlusOneInsight,
  isSessionInViewEndpointInsight,
  isSlowEndpointInsight,
  isSpanDurationBreakdownInsight,
  isSpanDurationsInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanNexusInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight,
  isSpanUsagesInsight
} from "../typeGuards";
import { CodeObjectInsight, GenericCodeObjectInsight, Trace } from "../types";
import * as s from "./styles";
import {
  InsightsPageProps,
  MarkInsightTypesAsViewedPayload,
  RecalculatePayload,
  isInsightJiraTicketHintShownPayload
} from "./types";

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpanNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.SlowestSpans,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimization,
    InsightType.SpanScalingBadly
  ];

  return insights.findIndex((insight) =>
    insightsWithJiraButton.includes(insight.type)
  );
};

const renderInsightCard = (
  insight: GenericCodeObjectInsight,
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void,
  isJiraHintEnabled: boolean,
  onRefresh: () => void
): JSX.Element | undefined => {
  // const handleErrorSelect = (errorId: string, insightType: InsightType) => {
  //   sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
  //     action: `Follow ${insightType} link`
  //   });
  //   window.sendMessageToDigma({
  //     action: actions.GO_TO_ERROR,
  //     payload: {
  //       errorId
  //     }
  //   });
  // };

  // const handleErrorsExpandButtonClick = () => {
  //   window.sendMessageToDigma({
  //     action: actions.GO_TO_ERRORS
  //   });
  // };

  const handleHistogramButtonClick = (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => {
    window.sendMessageToDigma({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        instrumentationLibrary,
        name,
        insightType,
        displayName
      }
    });
  };

  const handleLiveButtonClick = (prefixedCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.OPEN_LIVE_VIEW,
      payload: {
        prefixedCodeObjectId
      }
    });
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        trace,
        insightType,
        spanCodeObjectId
      }
    });
  };

  const handleCompareButtonClick = (
    traces: [Trace, Trace],
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE_COMPARISON,
      payload: {
        traces,
        insightType
      }
    });
  };

  const handleAssetLinkClick = (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      action: `Follow ${insightType} link`
    });
    window.sendMessageToDigma({
      action: actions.GO_TO_ASSET,
      payload: {
        spanCodeObjectId
      }
    });
  };

  const handleRecalculate = (insightId: string) => {
    window.sendMessageToDigma<RecalculatePayload>({
      action: actions.RECALCULATE,
      payload: {
        id: insightId
      }
    });
  };

  const handleGoToSpan = (spanCodeObjectId: string) => {
    window.sendMessageToDigma<ChangeScopePayload>({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        span: {
          spanCodeObjectId
        }
      }
    });
  };

  if (isSpanDurationsInsight(insight)) {
    return (
      <DurationInsight
        key={insight.id}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <DurationBreakdownInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanUsagesInsight(insight)) {
    return (
      <TopUsageInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointBottleneckInsight(insight)) {
    return (
      <EndpointBottleneckInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <SpanEndpointBottleneckInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
      />
    );
  }

  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (
    isEndpointLowUsageInsight(insight) ||
    isEndpointNormalUsageInsight(insight) ||
    isEndpointHighUsageInsight(insight)
  ) {
    return (
      <TrafficInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(insight)) {
    return (
      <EndpointNPlusOneInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanNPlusOneInsight(insight)) {
    return (
      <SpanNPlusOneInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanScalingBadlyInsight(insight)) {
    return (
      <ScalingIssueInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointSlowdownSourceInsight(insight)) {
    return (
      <EndpointSlowdownSourceInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <RequestBreakdownInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSessionInViewEndpointInsight(insight)) {
    return (
      <SessionInViewInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  // deprecated
  if (isChattyApiEndpointInsight(insight)) {
    return (
      <ExcessiveAPICallsInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointChattyApiV2Insight(insight)) {
    return (
      <EndpointChattyApiV2Insight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(insight)) {
    return (
      <HighNumberOfQueriesInsight
        key={insight.id}
        insight={insight}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanNexusInsight(insight)) {
    return (
      <SpanNexusInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(insight)) {
    return (
      <SpanQueryOptimizationInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  // deprecated
  if (isEndpointQueryOptimizationInsight(insight)) {
    return (
      <EndpointQueryOptimizationInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(insight)) {
    return (
      <EndpointQueryOptimizationV2Insight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
      />
    );
  }
};

const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const InsightsPage = (props: InsightsPageProps) => {
  const config = useContext(ConfigContext);
  const previousConfig = usePrevious(config);
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );
  const listRef = useRef<HTMLDivElement>(null);
  const previousPage = usePrevious(props.page);

  const insightIndexWithJiraHint = getInsightToShowJiraHint(props.insights);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== props.page) ||
      (previousConfig &&
        (previousConfig?.scope?.span !== config?.scope?.span ||
          previousConfig?.environment?.originalName !==
            config.environment?.originalName))
    ) {
      listRef.current?.scrollTo(0, 0);
    }
  }, [previousPage, props.page, config, previousConfig]);

  useEffect(() => {
    window.sendMessageToDigma<MarkInsightTypesAsViewedPayload>({
      action: actions.MARK_INSIGHT_TYPES_AS_VIEWED,
      payload: {
        insightTypes: props.insights.map((x) => ({
          type: x.type,
          reopenCount: x.reopenCount
        }))
      }
    });
  }, [props.insights]);

  const handleShowJiraTicket = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => {
    props.onJiraTicketCreate(insight, spanCodeObjectId);
    if (!isInsightJiraTicketHintShown?.value) {
      sendTrackingEvent(trackingEvents.JIRA_TICKET_HINT_CLOSED, { event });
    }
    setIsInsightJiraTicketHintShown({ value: true });
  };

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "insights"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const handleAnalyticsTabLinkClick = () => {
    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: "analytics"
      }
    });
  };

  return (
    <s.Container ref={listRef}>
      {props.insights.length > 0 ? (
        props.insights.map((insight, j) => {
          return renderInsightCard(
            insight,
            handleShowJiraTicket,
            !isUndefined(isInsightJiraTicketHintShown) &&
              !isInsightJiraTicketHintShown?.value &&
              j === insightIndexWithJiraHint,
            props.onRefresh
          );
        })
      ) : props.isFilteringEnabled ? (
        <EmptyState
          icon={CardsIcon}
          title={"No data found"}
          content={
            <s.EmptyStateDescription>
              There are no insights for this criteria
            </s.EmptyStateDescription>
          }
        />
      ) : config.scope &&
        isNumber(config.scope.analyticsInsightsCount) &&
        config.scope.analyticsInsightsCount > 0 ? (
        <EmptyState
          icon={CardsIcon}
          title={"No insights yet"}
          content={
            <s.EmptyStateDescription>
              Performing more actions that trigger this asset will increase the
              chance of identifying insights. You can also check out the{" "}
              <s.TroubleshootingLink onClick={handleAnalyticsTabLinkClick}>
                analytics
              </s.TroubleshootingLink>{" "}
              tab
            </s.EmptyStateDescription>
          }
        />
      ) : config.scope?.span ? (
        <EmptyState
          icon={CardsIcon}
          title={"No data yet"}
          content={
            <s.EmptyStateDescription>
              No data received yet for this span, please trigger some actions
              using this code to see more insights.
            </s.EmptyStateDescription>
          }
        />
      ) : (
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
      )}
    </s.Container>
  );
};
