import { useEffect, useMemo, useRef } from "react";
import { actions as globalActions } from "../../../../actions";
import { usePersistence } from "../../../../hooks/usePersistence";
import { platform } from "../../../../platform";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../store/insights/useInsightsSelector";
import { useStore } from "../../../../store/useStore";
import { trackingEvents as globalEvents } from "../../../../trackingEvents";
import { isNumber } from "../../../../typeGuards/isNumber";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { InsightType } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TAB_IDS } from "../../../Navigation/Tabs/types";
import type { Scope } from "../../../common/App/types";
import { NewButton } from "../../../common/v3/NewButton";
import { actions as insightsActions } from "../../actions";
import { trackingEvents } from "../../tracking";
import type {
  CodeObjectInsight,
  GenericCodeObjectInsight,
  InsightViewType
} from "../../types";
import { ViewMode } from "../types";
import { EmptyState } from "./EmptyState";
import { InsightCardRenderer } from "./InsightCardRenderer";
import { actions } from "./InsightCardRenderer/insightCards/common/InsightCard/hooks/useDismissal";
import * as s from "./styles";
import type {
  InsightsPageProps,
  MarkInsightTypesAsViewedPayload,
  isInsightJiraTicketHintShownPayload
} from "./types";

export const getInsightToShowJiraHint = (
  insights: CodeObjectInsight[]
): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.EndpointBottleneck,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimizationV2,
    InsightType.SpanScaling,
    InsightType.EndpointScaling
  ];

  return insights.findIndex((insight) =>
    insightsWithJiraButton.includes(insight.type)
  );
};

const renderEmptyState = (
  viewMode: ViewMode,
  areAnyFiltersApplied: boolean,
  search: string,
  scope: Scope | null,
  insightsViewType: InsightViewType | null,
  onGoToTab: (tabId: string) => void,
  onFiltersClear: (spanCodeObjectId?: string) => void,
  hasIssues?: boolean
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
    onGoToTab(TAB_IDS.ANALYTICS);
  };

  const handleSeeAllAssetsClick = () => {
    sendUserActionTrackingEvent(globalEvents.GO_TO_ALL_ASSETS_CLICKED, {
      source: "Analytics tab"
    });

    onGoToTab(TAB_IDS.ASSETS);
  };

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_CLEAR_FILTERS_BUTTON_CLICKED
    );
    onFiltersClear(scope?.span?.spanCodeObjectId);
  };

  if (search.length > 0) {
    return <EmptyState preset={"noSearchResults"} />;
  }

  if (
    insightsViewType === "Issues" &&
    areAnyFiltersApplied &&
    hasIssues === true
  ) {
    return (
      <EmptyState
        preset={"noFilteredIssues"}
        customContent={
          <NewButton
            onClick={handleClearFiltersButtonClick}
            label={"Clear filters"}
          />
        }
      />
    );
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

  if (!scope?.span?.spanCodeObjectId && insightsViewType === "Analytics") {
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
        platform === "JetBrains" ? (
          <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
            Not seeing your application data?
          </s.TroubleshootingLink>
        ) : null
      }
    />
  );
};

export const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const InsightsPage = ({
  onJiraTicketCreate,
  onRefresh,
  isMarkAsReadButtonEnabled,
  onScopeChange,
  onGoToTab
}: InsightsPageProps) => {
  const { scope, environment, backendInfo } = useConfigSelector();
  const {
    page,
    data,
    insightViewType,
    viewMode,
    search,
    filters,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope
  } = useInsightsSelector();
  const { setInsightsViewMode: setMode, clearInsightsFilters } =
    useStore.getState();
  const isAtSpan = Boolean(scope?.span);
  const filteredInsightTypes = isAtSpan
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const filteredCriticalityLevels = isAtSpan
    ? filteredCriticalityLevelsInSpanScope
    : filteredCriticalityLevelsInGlobalScope;
  const areAnyFiltersApplied =
    (insightViewType === "Issues"
      ? filters.length > 0 ||
        filteredInsightTypes.length > 0 ||
        filteredCriticalityLevels.length > 0
      : 0) || search.length > 0;
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );
  const listRef = useRef<HTMLDivElement>(null);
  const insights = useMemo(() => data?.insights ?? [], [data?.insights]);

  const insightIndexWithJiraHint = getInsightToShowJiraHint(insights);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [scope?.span?.spanCodeObjectId, environment?.id, page]);

  useEffect(() => {
    window.sendMessageToDigma<MarkInsightTypesAsViewedPayload>({
      action: insightsActions.MARK_INSIGHT_TYPES_AS_VIEWED,
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

  const handleDismissalChange = (action: string, insightId: string) => {
    if (
      action === actions.UNDISMISS &&
      insights.length === 1 &&
      insightId === insights[0].id
    ) {
      setMode(ViewMode.All);
    }
    onRefresh();
  };

  return (
    <s.Container ref={listRef}>
      {environment && insights.length > 0
        ? insights.map((insight, j) => (
            <InsightCardRenderer
              key={insight.id}
              insight={insight}
              onJiraTicketCreate={handleShowJiraTicket}
              isJiraHintEnabled={
                platform !== "Visual Studio" &&
                !isUndefined(isInsightJiraTicketHintShown) &&
                !isInsightJiraTicketHintShown?.value &&
                j === insightIndexWithJiraHint
              }
              isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
              viewMode={isAtSpan ? "full" : "compact"}
              onDismissalChange={handleDismissalChange}
              tooltipBoundaryRef={listRef}
              backendInfo={backendInfo}
              onScopeChange={onScopeChange}
            />
          ))
        : renderEmptyState(
            viewMode,
            areAnyFiltersApplied,
            search,
            scope,
            insightViewType,
            onGoToTab,
            clearInsightsFilters,
            data?.hasIssuesIgnoringFilters
          )}
    </s.Container>
  );
};
