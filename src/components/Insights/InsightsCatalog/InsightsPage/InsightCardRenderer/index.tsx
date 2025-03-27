import { getFeatureFlagValue } from "../../../../../featureFlags";
import { platform } from "../../../../../platform";
import { useLazyGetSpanPercentilesHistogramQuery } from "../../../../../redux/services/digma";
import { isString } from "../../../../../typeGuards/isString";
import {
  FeatureFlag,
  InsightType,
  ScopeChangeEvent
} from "../../../../../types";
import { openURLInDefaultBrowser } from "../../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { openBrowserTabWithContent } from "../../../../../utils/openBrowserTabWithContent";
import { actions } from "../../../actions";
import { getInsightHistogramUrl } from "../../../getInsightHistogramUrl";
import { trackingEvents } from "../../../tracking";
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
  isSpanNexusInsight,
  isSpanNPlusOneInsight,
  isSpanPerformanceAnomalyInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight,
  isSpanUsagesInsight
} from "../../../typeGuards";
import type { Trace } from "../../../types";
import type { OpenHistogramPayload, OpenLiveViewPayload } from "../types";
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
import { SpanDurationBreakdownInsightCard } from "./insightCards/SpanDurationBreakdownInsightCard";
import { SpanDurationsInsightCard } from "./insightCards/SpanDurationsInsightCard";
import { SpanEndpointBottleneckInsightCard } from "./insightCards/SpanEndpointBottleneckInsightCard";
import { SpanNexusInsightCard } from "./insightCards/SpanNexusInsightCard";
import { SpanPerformanceAnomalyInsightCard } from "./insightCards/SpanPerformanceAnomalyInsightCard";
import { SpaNPlusOneInsightCard } from "./insightCards/SpaNPlusOneInsightCard";
import { SpanQueryOptimizationInsightCard } from "./insightCards/SpanQueryOptimizationInsightCard";
import { SpanScalingInsightCard } from "./insightCards/SpanScalingInsightCard";
import { SpanUsagesInsightCard } from "./insightCards/SpanUsagesInsightCard";
import type { InsightCardRendererProps } from "./types";

// TODO: move to common
export const InsightCardRenderer = ({
  insight,
  onJiraTicketCreate,
  isJiraHintEnabled,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  onOpenSuggestion,
  tooltipBoundaryRef,
  backendInfo,
  onScopeChange
}: InsightCardRendererProps) => {
  const [triggerSpanPercentilesHistogramFetch] =
    useLazyGetSpanPercentilesHistogramQuery();

  const handleHistogramButtonClick = (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => {
    const isSpanPercentilesHistogramIsEnabled = getFeatureFlagValue(
      backendInfo,
      FeatureFlag.IsHttpGetMethodSpanPercentilesHistogramEnabled
    );

    if (platform === "Web") {
      const url = getInsightHistogramUrl(
        `${window.location.origin}/api`,
        insightType,
        environmentId,
        spanCodeObjectId,
        backendInfo
      );

      if (url) {
        openURLInDefaultBrowser(url.toString());
      } else if (
        [
          InsightType.EndpointSlowdownSource,
          InsightType.SpanDurations,
          InsightType.SpanPerformanceAnomaly
        ].includes(insightType) &&
        !isSpanPercentilesHistogramIsEnabled
      ) {
        void triggerSpanPercentilesHistogramFetch({
          environment: environmentId,
          spanCodeObjectId
        })
          .unwrap()
          .then((data) => {
            openBrowserTabWithContent(data);
          });
      }

      return;
    }

    window.sendMessageToDigma<OpenHistogramPayload>({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        spanCodeObjectId,
        // TODO: remove after the plugin supports other insights types besides SpanDurations and SpanScaling
        insightType: [
          InsightType.SpanPerformanceAnomaly,
          InsightType.EndpointSlowdownSource
        ].includes(insightType)
          ? InsightType.SpanDurations
          : insightType,
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
    if (
      platform === "Web" &&
      isString(window.jaegerURL) &&
      window.jaegerURL.length > 0
    ) {
      let url = `${window.jaegerURL}/trace/${trace.id}`;

      if (spanCodeObjectId) {
        url = url.concat(`?uiFind=${spanCodeObjectId}`);
      }
      openURLInDefaultBrowser(url);
      return;
    }

    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        trace,
        insightType,
        spanCodeObjectId
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
    onScopeChange({
      span: { spanCodeObjectId },
      context: {
        event: ScopeChangeEvent.InsightsInsightCardAssetLinkClicked
      }
    });
  };

  const handleGoToSpan = (spanCodeObjectId: string) => {
    onScopeChange({
      span: { spanCodeObjectId },
      context: {
        event: ScopeChangeEvent.InsightsInsightCardTitleAssetLinkClicked
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
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <SpanDurationBreakdownInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isEndpointBottleneckInsight(insight)) {
    return (
      <EndpointBottleneckInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <SpanEndpointBottleneckInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        onTraceButtonClick={handleTraceButtonClick}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsightCard
        key={insight.id}
        insight={insight}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isEndpointSlowdownSourceInsight(insight)) {
    return (
      <EndpointSlowdownSourceInsightCard
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
        onHistogramButtonClick={handleHistogramButtonClick}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <EndpointBreakdownInsightCard
        key={insight.id}
        insight={insight}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(insight)) {
    return (
      <EndpointHighNumberOfQueriesInsightCard
        key={insight.id}
        insight={insight}
        onTraceButtonClick={handleTraceButtonClick}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isSpanNexusInsight(insight)) {
    return (
      <SpanNexusInsightCard
        key={insight.id}
        insight={insight}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        onOpenSuggestion={onOpenSuggestion}
        tooltipBoundaryRef={tooltipBoundaryRef}
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
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        onOpenSuggestion={onOpenSuggestion}
        tooltipBoundaryRef={tooltipBoundaryRef}
      />
    );
  }

  if (isSpanPerformanceAnomalyInsight(insight)) {
    return (
      <SpanPerformanceAnomalyInsightCard
        key={insight.id}
        insight={insight}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
        onDismissalChange={onDismissalChange}
        tooltipBoundaryRef={tooltipBoundaryRef}
        onTraceButtonClick={handleTraceButtonClick}
        onHistogramButtonClick={handleHistogramButtonClick}
      />
    );
  }

  return null;
};
