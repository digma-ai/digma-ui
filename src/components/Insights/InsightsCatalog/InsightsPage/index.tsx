import { useContext, useEffect, useRef } from "react";
import { actions as globalActions } from "../../../../actions";
import { usePersistence } from "../../../../hooks/usePersistence";
import { usePrevious } from "../../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../../trackingEvents";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import {
  ChangeScopePayload,
  ChangeViewPayload,
  InsightType
} from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { EmptyState } from "../../../common/EmptyState";
import { CardsIcon } from "../../../common/icons/CardsIcon";
import { actions } from "../../actions";
import { trackingEvents } from "../../tracking";
import {
  isEndpointBottleneckInsight,
  isEndpointBreakdownInsight,
  isEndpointChattyApiV2Insight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointHighUsageInsight,
  isEndpointLowUsageInsight,
  isEndpointNormalUsageInsight,
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
} from "../../typeGuards";
import {
  CodeObjectInsight,
  GenericCodeObjectInsight,
  Trace
} from "../../types";
import { EndpointBottleneckInsightCard } from "./insightCards/EndpointBottleneckInsightCard";
import { EndpointBreakdownInsightCard } from "./insightCards/EndpointBreakdownInsightCard";
import { EndpointChattyApiV2InsightCard } from "./insightCards/EndpointChattyApiV2InsightCard";
import { EndpointHighNumberOfQueriesInsightCard } from "./insightCards/EndpointHighNumberOfQueriesInsightCard";
import { EndpointQueryOptimizationV2InsightCard } from "./insightCards/EndpointQueryOptimizationV2InsightCard";
import { EndpointSessionInViewInsightCard } from "./insightCards/EndpointSessionInViewInsightCard";
import { EndpointSlowdownSourceInsightCard } from "./insightCards/EndpointSlowdownSourceInsightCard";
import { EndpointSpanNPlusOneInsightCard } from "./insightCards/EndpointSpanNPlusOneInsightInsightCard";
import { EndpointUsageInsightCard } from "./insightCards/EndpointUsageInsightCard";
import { SlowEndpointInsightCard } from "./insightCards/SlowEndpointInsightCard";
import { SpaNPlusOneInsightCard } from "./insightCards/SpaNPlusOneInsightCard";
import { SpanDurationBreakdownInsightCard } from "./insightCards/SpanDurationBreakdownInsightCard";
import { SpanDurationsInsightCard } from "./insightCards/SpanDurationsInsightCard";
import { SpanEndpointBottleneckInsightCard } from "./insightCards/SpanEndpointBottleneckInsightCard";
import { SpanNexusInsightCard } from "./insightCards/SpanNexusInsightCard";
import { SpanQueryOptimizationInsightCard } from "./insightCards/SpanQueryOptimizationInsightCard";
import { SpanScalingInsightCard } from "./insightCards/SpanScalingInsightCard";
import { SpanUsagesInsightCard } from "./insightCards/SpanUsagesInsightCard";
import * as s from "./styles";
import {
  InsightsPageProps,
  MarkInsightTypesAsViewedPayload,
  OpenHistogramPayload,
  OpenLiveViewPayload,
  RecalculatePayload,
  isInsightJiraTicketHintShownPayload
} from "./types";

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpaNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.SlowestSpans,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimization,
    InsightType.SpanScaling
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
  onRefresh: () => void,
  isMarkAsReadButtonEnabled: boolean
): JSX.Element | undefined => {
  // const handleErrorSelect = (errorId: string, insightType: InsightType) => {
  //   sendUserActionTrackingEvent(
  //     trackingEvents.INSIGHT_CARD_ASSET_LINK_CLICKED,
  //     {
  //       insightType
  //     }
  //   );
  // };

  // const handleErrorsExpandButtonClick = () => {
  //   window.sendMessageToDigma({
  //     action: actions.GO_TO_ERRORS
  //   });
  // };

  const handleHistogramButtonClick = (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => {
    window.sendMessageToDigma<OpenHistogramPayload>({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        spanCodeObjectId,
        insightType,
        displayName
      }
    });
  };

  const handleLiveButtonClick = (codeObjectId: string) => {
    window.sendMessageToDigma<OpenLiveViewPayload>({
      action: actions.OPEN_LIVE_VIEW,
      payload: {
        codeObjectId
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
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_ASSET_LINK_CLICKED,
      {
        insightType
      }
    );

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
      <SpanDurationsInsightCard
        key={insight.id}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <SpanDurationBreakdownInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanUsagesInsight(insight)) {
    return (
      <SpanUsagesInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointBottleneckInsight(insight)) {
    return (
      <EndpointBottleneckInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <SpanEndpointBottleneckInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsightCard
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (
    isEndpointLowUsageInsight(insight) ||
    isEndpointNormalUsageInsight(insight) ||
    isEndpointHighUsageInsight(insight)
  ) {
    return (
      <EndpointUsageInsightCard
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(insight)) {
    return (
      <EndpointSpanNPlusOneInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanNPlusOneInsight(insight)) {
    return (
      <SpaNPlusOneInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanScalingBadlyInsight(insight)) {
    return (
      <SpanScalingInsightCard
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
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointSlowdownSourceInsight(insight)) {
    return (
      <EndpointSlowdownSourceInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <EndpointBreakdownInsightCard
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSessionInViewEndpointInsight(insight)) {
    return (
      <EndpointSessionInViewInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointChattyApiV2Insight(insight)) {
    return (
      <EndpointChattyApiV2InsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(insight)) {
    return (
      <EndpointHighNumberOfQueriesInsightCard
        key={insight.id}
        insight={insight}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanNexusInsight(insight)) {
    return (
      <SpanNexusInsightCard
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(insight)) {
    return (
      <SpanQueryOptimizationInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(insight)) {
    return (
      <EndpointQueryOptimizationV2InsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
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
          previousConfig?.environment?.id !== config.environment?.id))
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
      sendUserActionTrackingEvent(trackingEvents.JIRA_TICKET_HINT_CLOSED, {
        event
      });
    }
    setIsInsightJiraTicketHintShown({ value: true });
  };

  const handleTroubleshootingLinkClick = () => {
    sendUserActionTrackingEvent(
      globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
      {
        origin: "insights"
      }
    );

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const handleAnalyticsTabLinkClick = () => {
    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: "/analytics"
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
            props.onRefresh,
            props.isMarkAsReadButtonEnabled
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
