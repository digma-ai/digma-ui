import { useEffect, useRef } from "react";
import { actions as globalActions } from "../../../../actions";
import { usePersistence } from "../../../../hooks/usePersistence";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../store/insights/useInsightsSelector";
import { trackingEvents as globalEvents } from "../../../../trackingEvents";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { InsightType, SCOPE_CHANGE_EVENTS } from "../../../../types";
import { changeScope } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../../../Main/useHistory";
import { TAB_IDS } from "../../../Navigation/Tabs/types";
import type { Scope } from "../../../common/App/types";
import { NewButton } from "../../../common/v3/NewButton";
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
import type {
  CodeObjectInsight,
  GenericCodeObjectInsight,
  InsightViewType,
  Trace
} from "../../types";
import { ViewMode } from "../types";
import { EmptyState } from "./EmptyState";
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
import type { InsightCardViewMode } from "./insightCards/common/InsightCard/types";
import * as s from "./styles";
import type {
  InsightsPageProps,
  MarkInsightTypesAsViewedPayload,
  OpenHistogramPayload,
  OpenLiveViewPayload,
  RecalculatePayload,
  isInsightJiraTicketHintShownPayload
} from "./types";

export const INSIGHTS_PAGE_CONTAINER_ID = "insightsPageContainer";

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.EndpointBottleneck,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimizationV2,
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
  isMarkAsReadButtonEnabled: boolean,
  viewMode: InsightCardViewMode
): JSX.Element | undefined => {
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
    changeScope({
      span: { spanCodeObjectId },
      context: {
        event: SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED
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
    changeScope({
      span: { spanCodeObjectId },
      context: {
        event:
          SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED
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
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
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
        viewMode={viewMode}
      />
    );
  }
};

const renderEmptyState = (
  viewMode: ViewMode,
  areAnyFiltersApplied: boolean,
  search: string,
  scope: Scope | null,
  insightsViewType: InsightViewType | null,
  goTo: (location: string) => void
) => {
  const handleTroubleshootingLinkClick = () => {
    sendUserActionTrackingEvent(globalEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "insights"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const handleAnalyticsTabLinkClick = () => {
    goTo(`/${TAB_IDS.ANALYTICS}`);
  };

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GO_TO_ALL_ASSETS_CLICKED, {
      source: "Analytics tab"
    });

    goTo(`/${TAB_IDS.ASSETS}`);
  };

  if (search.length > 0) {
    return <EmptyState preset={"noSearchResults"} />;
  }

  if (areAnyFiltersApplied) {
    return <EmptyState preset={"noFilteredData"} />;
  }

  if (viewMode === ViewMode.OnlyDismissed) {
    return <EmptyState preset={"noDismissedData"} />;
  }

  if (
    scope &&
    isNumber(scope.analyticsInsightsCount) &&
    scope.analyticsInsightsCount > 0
  ) {
    return (
      <EmptyState
        preset={"noInsightsYet"}
        message={
          <>
            Performing more actions that trigger this asset will increase the
            chance of identifying insights. You can also check out the{" "}
            <s.TroubleshootingLink onClick={handleAnalyticsTabLinkClick}>
              analytics
            </s.TroubleshootingLink>{" "}
            tab
          </>
        }
      />
    );
  }

  if (scope?.span) {
    return <EmptyState preset={"noDataYet"} />;
  }

  if (!scope?.span?.spanCodeObjectId && insightsViewType == "Analytics") {
    return (
      <EmptyState
        preset={"analyticsSelectAsset"}
        customContent={
          <NewButton
            buttonType={"primary"}
            onClick={handleSeeAllAssetsClick}
            label={"See all assets"}
          />
        }
      />
    );
  }

  return (
    <EmptyState
      preset={"noDataYet"}
      customContent={
        <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
          Not seeing your application data?
        </s.TroubleshootingLink>
      }
    />
  );
};

export const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const InsightsPage = ({
  page,
  insights,
  onJiraTicketCreate,
  onRefresh,
  isMarkAsReadButtonEnabled,
  insightsViewType
}: InsightsPageProps) => {
  const { scope, environment } = useConfigSelector();
  const { viewMode, search, filters, filteredInsightTypes } =
    useInsightsSelector();
  const areAnyFiltersApplied =
    filters.length > 0 || filteredInsightTypes.length > 0 || search.length > 0;
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );
  const listRef = useRef<HTMLDivElement>(null);
  const { goTo } = useHistory();
  const isAtSpan = Boolean(scope?.span);

  const insightIndexWithJiraHint = getInsightToShowJiraHint(insights);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [scope?.span?.spanCodeObjectId, environment?.id, page]);

  useEffect(() => {
    window.sendMessageToDigma<MarkInsightTypesAsViewedPayload>({
      action: actions.MARK_INSIGHT_TYPES_AS_VIEWED,
      payload: {
        insightTypes: insights.map((x) => ({
          type: x.type,
          reopenCount: x.reopenCount
        }))
      }
    });
  }, [insights]);

  const handleShowJiraTicket = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => {
    onJiraTicketCreate(insight, spanCodeObjectId);
    if (!isInsightJiraTicketHintShown?.value) {
      sendUserActionTrackingEvent(trackingEvents.JIRA_TICKET_HINT_CLOSED, {
        event
      });
    }
    setIsInsightJiraTicketHintShown({ value: true });
  };

  return (
    <s.Container ref={listRef} id={INSIGHTS_PAGE_CONTAINER_ID}>
      {insights.length > 0
        ? insights.map((insight, j) => {
            return renderInsightCard(
              insight,
              handleShowJiraTicket,
              !isUndefined(isInsightJiraTicketHintShown) &&
                !isInsightJiraTicketHintShown?.value &&
                j === insightIndexWithJiraHint,
              onRefresh,
              isMarkAsReadButtonEnabled,
              isAtSpan ? "full" : "compact"
            );
          })
        : renderEmptyState(
            viewMode,
            areAnyFiltersApplied,
            search,
            scope,
            insightsViewType,
            goTo
          )}
    </s.Container>
  );
};
