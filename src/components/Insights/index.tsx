import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../store/insights/useInsightsSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { EmptyState } from "./EmptyState";
import { InsightsCatalog } from "./InsightsCatalog";
import type { IssuesFilterQuery } from "./InsightsCatalog/FilterPanel/IssuesFilter/types";
import { EndpointBottleneckInsightTicket } from "./insightTickets/EndpointBottleneckInsightTicket";
import { EndpointHighNumberOfQueriesInsightTicket } from "./insightTickets/EndpointHighNumberOfQueriesInsightTicket";
import { EndpointQueryOptimizationV2InsightTicket } from "./insightTickets/EndpointQueryOptimizationV2InsightTicket";
import { EndpointSpanNPlusOneInsightTicket } from "./insightTickets/EndpointSpanNPlusOneInsightTicket";
import { SpaNPlusOneInsightTicket } from "./insightTickets/SpaNPlusOneInsightTicket";
import { SpanEndpointBottleneckInsightTicket } from "./insightTickets/SpanEndpointBottleneckInsightTicket";
import { SpanQueryOptimizationInsightTicket } from "./insightTickets/SpanQueryOptimizationInsightTicket";
import { SpanScalingByRootCauseInsightTicket } from "./insightTickets/SpanScalingByRootCauseInsightTicket";
import { SpanScalingInsightTicket } from "./insightTickets/SpanScalingInsightTicket";
import * as s from "./styles";
import {
  isEndpointBottleneckInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointQueryOptimizationV2Insight,
  isEndpointSpanNPlusOneInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight
} from "./typeGuards";
import type {
  EndpointBottleneckInsight,
  EndpointHighNumberOfQueriesInsight,
  EndpointQueryOptimizationV2Insight,
  EndpointSpanNPlusOneInsight,
  GenericCodeObjectInsight,
  InsightTicketInfo,
  InsightsData,
  InsightsProps,
  SpaNPlusOneInsight,
  SpanEndpointBottleneckInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight
} from "./types";
import { InsightsStatus } from "./types";
import { useInsightsData } from "./useInsightsData";

const renderInsightTicket = (
  data: InsightTicketInfo<GenericCodeObjectInsight>,
  refreshInsights: () => void,
  onClose: () => void
) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return (
      <SpaNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointSpanNPlusOneInsight>;
    return (
      <EndpointSpanNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return (
      <SpanEndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointBottleneckInsight>;
    return (
      <EndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanQueryOptimizationInsight>;
    return (
      <SpanQueryOptimizationInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationV2Insight>;
    return (
      <EndpointQueryOptimizationV2InsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointHighNumberOfQueriesInsight>;
    return (
      <EndpointHighNumberOfQueriesInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanScalingBadlyInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanScalingInsight>;
    const selectedRootCause = data.insight.rootCauseSpans.find(
      (r) => r.spanCodeObjectId == data.spanCodeObjectId
    );
    if (selectedRootCause) {
      return (
        <SpanScalingByRootCauseInsightTicket
          rootCauseSpanInfo={selectedRootCause}
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    } else {
      return (
        <SpanScalingInsightTicket
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    }
  }

  return null;
};

export const ISSUES_FILTERS_PERSISTENCE_KEY = "issuesFilters";

export const Insights = ({ insightViewType }: InsightsProps) => {
  const [areFiltersRehydrated, setAreFiltersRehydrated] = useState(false);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(
      ISSUES_FILTERS_PERSISTENCE_KEY,
      "project"
    );
  const previousPersistedFilters = usePrevious(persistedFilters);
  const { data, isLoading, refresh } = useInsightsData({
    areFiltersRehydrated
  });
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const {
    backendInfo,
    environment,
    userRegistrationEmail,
    environments,
    scope
  } = useConfigSelector();
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !userRegistrationEmail;
  const {
    setInsightViewType,
    setInsightsFilteredInsightTypes: setFilteredInsightTypes,
    setInsightsFilters: setFilters,
    resetInsights: reset
  } = useStore.getState();
  const {
    insightViewType: storedInsightViewType,
    filteredInsightTypes,
    filters
  } = useInsightsSelector();

  const previousFilteredInsightTypes = usePrevious(filteredInsightTypes);
  const previousFilters = usePrevious(filters);
  const previousBackendInfo = usePrevious(backendInfo);
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScope = usePrevious(scope);
  const previousScopeSpanCodeObjectId = previousScope?.span?.spanCodeObjectId;
  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    setInsightViewType(insightViewType);
  }, [insightViewType, setInsightViewType]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  // Rehydrate filters from persistence
  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      setFilteredInsightTypes(persistedFilters?.issueTypes ?? []);
      setFilters(persistedFilters?.filters ?? []);
      setAreFiltersRehydrated(true);
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    setFilters,
    setFilteredInsightTypes
  ]);

  // Persist filters on its change
  useEffect(() => {
    if (
      (previousFilteredInsightTypes !== filteredInsightTypes ||
        previousFilters !== filters) &&
      areFiltersRehydrated
    ) {
      setPersistedFilters({
        issueTypes: filteredInsightTypes,
        filters
      });
    }
  }, [
    previousFilteredInsightTypes,
    filteredInsightTypes,
    previousFilters,
    filters,
    setPersistedFilters,
    areFiltersRehydrated,
    persistedFilters
  ]);

  // Reset filters on backend instance, scope or environment change
  useEffect(() => {
    if (
      (areFiltersRehydrated &&
        Boolean(
          previousBackendInfo &&
            !areBackendInfosEqual(previousBackendInfo, backendInfo)
        )) ||
      Boolean(
        previousScope && previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
      ) ||
      Boolean(previousEnvironmentId && previousEnvironmentId !== environmentId)
    ) {
      setFilteredInsightTypes([]);
      setFilters([]);
    }
  }, [
    previousBackendInfo,
    backendInfo,
    previousScope,
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId,
    areFiltersRehydrated,
    persistedFilters,
    setFilteredInsightTypes,
    setFilters,
    previousEnvironmentId,
    environmentId
  ]);

  const handleJiraTicketPopupOpen = useCallback(
    (insight: GenericCodeObjectInsight, spanCodeObjectId?: string) => {
      setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
    },
    []
  );

  const handleJiraTicketPopupClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: globalActions.PERSONALIZE_REGISTER,
      payload: {
        ...formData,
        scope: "insights view jira ticket info"
      }
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationDialogClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setInfoToOpenJiraTicket(undefined);
    }
  };

  const renderContent = (
    data: InsightsData | null,
    isLoading: boolean
  ): JSX.Element => {
    const isInitialLoading =
      (!data && isLoading) ||
      !backendInfo ||
      !storedInsightViewType ||
      !areFiltersRehydrated;
    if (isInitialLoading) {
      return <EmptyState preset={"loading"} />;
    }

    if (!environments?.length) {
      return <EmptyState preset={"noDataYet"} />;
    }

    switch (data?.insightsStatus) {
      case InsightsStatus.STARTUP:
        return <EmptyState preset={"nothingToShow"} />;
      case InsightsStatus.NO_INSIGHTS:
        return <EmptyState preset={"noInsights"} />;
      case InsightsStatus.INSIGHT_PENDING:
        return <EmptyState preset={"processing"} />;
      case InsightsStatus.NO_SPANS_DATA:
        return <EmptyState preset={"noDataYet"} />;
      case InsightsStatus.NO_OBSERVABILITY:
        return <EmptyState preset={"noObservability"} />;
      case InsightsStatus.DEFAULT:
      default:
        return (
          <InsightsCatalog
            onJiraTicketCreate={handleJiraTicketPopupOpen}
            onRefresh={refresh}
          />
        );
    }
  };

  return (
    <s.Container>
      {renderContent(data, isLoading)}
      {infoToOpenJiraTicket && (
        <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
          <s.PopupContainer>
            {isRegistrationRequired ? (
              <RegistrationDialog
                onSubmit={handleRegistrationSubmit}
                onClose={handleRegistrationDialogClose}
                isRegistrationInProgress={isRegistrationInProgress}
              />
            ) : (
              renderInsightTicket(
                infoToOpenJiraTicket,
                refresh,
                handleJiraTicketPopupClose
              )
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
