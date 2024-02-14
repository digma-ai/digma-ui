import { useEffect } from "react";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Card } from "../../common/Card";
import { BottleneckInsight } from "../BottleneckInsight";
import { DurationBreakdownInsight } from "../DurationBreakdownInsight";
import { DurationInsight } from "../DurationInsight";
import { DurationSlowdownSourceInsight } from "../DurationSlowdownSourceInsight";
import { EndpointNPlusOneInsight } from "../EndpointNPlusOneInsight";
import { EndpointQueryOptimizationInsight } from "../EndpointQueryOptimizationInsight";
import { ErrorsInsight } from "../ErrorsInsight";
import { ExcessiveAPICallsInsight } from "../ExcessiveAPICallsInsight";
import { HighNumberOfQueriesInsight } from "../HighNumberOfQueriesInsight";
import { InsightCard } from "../InsightCard";
import { NPlusOneInsight } from "../NPlusOneInsight";
import { NoScalingIssueInsight } from "../NoScalingIssueInsight";
import { PerformanceAtScaleInsight } from "../PerformanceAtScaleInsight";
import { QueryOptimizationInsight } from "../QueryOptimizationInsight";
import { RequestBreakdownInsight } from "../RequestBreakdownInsight";
import { ScalingIssueInsight } from "../ScalingIssueInsight";
import { SessionInViewInsight } from "../SessionInViewInsight";
import { SlowEndpointInsight } from "../SlowEndpointInsight";
import { SpanBottleneckInsight } from "../SpanBottleneckInsight";
import { SpanNexusInsight } from "../SpanNexusInsight";
import { TopUsageInsight } from "../TopUsageInsight";
import { TrafficInsight } from "../TrafficInsight";
import { actions } from "../actions";
import { Description } from "../styles";
import { trackingEvents } from "../tracking";
import {
  isChattyApiEndpointInsight,
  isCodeObjectErrorsInsight,
  isCodeObjectHotSpotInsight,
  isEndpointBreakdownInsight,
  isEndpointDurationSlowdownInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointHighUsageInsight,
  isEndpointLowUsageInsight,
  isEndpointNormalUsageInsight,
  isEndpointQueryOptimizationInsight,
  isEndpointSlowestSpansInsight,
  isEndpointSuspectedNPlusOneInsight,
  isSessionInViewEndpointInsight,
  isSlowEndpointInsight,
  isSpanDurationBreakdownInsight,
  isSpanDurationsInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanNexusInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight,
  isSpanScalingInsufficientDataInsight,
  isSpanScalingWellInsight,
  isSpanUsagesInsight
} from "../typeGuards";
import { CodeObjectInsight, GenericCodeObjectInsight, Trace } from "../types";
import * as s from "./styles";
import { InsightPageProps, isInsightJiraTicketHintShownPayload } from "./types";

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpanNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.SlowestSpans,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimization
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
  isJiraHintEnabled: boolean
): JSX.Element | undefined => {
  const handleErrorSelect = (errorId: string, insightType: InsightType) => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      action: `Follow ${insightType} link`
    });
    window.sendMessageToDigma({
      action: actions.GO_TO_ERROR,
      payload: {
        errorId
      }
    });
  };

  const handleErrorsExpandButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.GO_TO_ERRORS
    });
  };

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

  const handleRecalculate = (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.RECALCULATE,
      payload: {
        prefixedCodeObjectId,
        insightType
      }
    });
  };

  const handleRefresh = (insightType: InsightType) => {
    window.sendMessageToDigma({
      action: actions.REFRESH_ALL,
      payload: {
        insightType
      }
    });
  };

  if (isSpanDurationsInsight(insight)) {
    return (
      <DurationInsight
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <DurationBreakdownInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanUsagesInsight(insight)) {
    return (
      <TopUsageInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <BottleneckInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isEndpointSlowestSpansInsight(insight)) {
    return (
      <SpanBottleneckInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsight
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
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
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isCodeObjectErrorsInsight(insight)) {
    return (
      <ErrorsInsight
        insight={insight}
        onErrorSelect={handleErrorSelect}
        onExpandButtonClick={handleErrorsExpandButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isEndpointSuspectedNPlusOneInsight(insight)) {
    return (
      <EndpointNPlusOneInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSpanNPlusOneInsight(insight)) {
    return (
      <NPlusOneInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSpanScalingBadlyInsight(insight)) {
    return (
      <ScalingIssueInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isCodeObjectHotSpotInsight(insight)) {
    return (
      <InsightCard
        data={insight}
        content={
          <Description>
            Major errors occur or propagate through this function
          </Description>
        }
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isEndpointDurationSlowdownInsight(insight)) {
    return (
      <DurationSlowdownSourceInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <RequestBreakdownInsight
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isSpanScalingWellInsight(insight)) {
    return (
      <NoScalingIssueInsight
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isSpanScalingInsufficientDataInsight(insight)) {
    return (
      <PerformanceAtScaleInsight
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isSessionInViewEndpointInsight(insight)) {
    return (
      <SessionInViewInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isChattyApiEndpointInsight(insight)) {
    return (
      <ExcessiveAPICallsInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(insight)) {
    return (
      <HighNumberOfQueriesInsight
        insight={insight}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }

  if (isSpanNexusInsight(insight)) {
    return (
      <SpanNexusInsight
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(insight)) {
    return (
      <QueryOptimizationInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }

  if (isEndpointQueryOptimizationInsight(insight)) {
    return (
      <EndpointQueryOptimizationInsight
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
      />
    );
  }
};

const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const InsightsPage = (props: InsightPageProps) => {
  const previousInsights = usePrevious(props.insights);
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );

  const insightIndexWithJiraHint = getInsightToShowJiraHint(props.insights);

  useEffect(() => {
    if (props.insights !== previousInsights) {
      window.scrollTo(0, 0);
    }
  }, [props.insights, previousInsights]);

  useEffect(() => {
    window.sendMessageToDigma({
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

  return (
    <s.Container>
      {props.insights.length > 0 ? (
        props.insights.map((insight, j) => {
          return renderInsightCard(
            insight,
            handleShowJiraTicket,
            j === insightIndexWithJiraHint
          );
        })
      ) : (
        <Card
          header={<>No data yet</>}
          content={
            <Description>
              No data received yet for this span, please trigger some actions
              using this code to see more insights.
            </Description>
          }
        />
      )}
    </s.Container>
  );
};
