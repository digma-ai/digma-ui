import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import {
  initialState as insightsInitialState,
  type InsightsData
} from "../../store/insights/insightsSlice";
import { useInsightsSelector } from "../../store/insights/useInsightsSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { SCOPE_CHANGE_EVENTS } from "../../types";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { EmptyState } from "./EmptyState";
import { useInsightsData } from "./hooks/useInsightsData";
import { InsightsCatalog } from "./InsightsCatalog";
import type { IssuesFilterQuery } from "./InsightsCatalog/FilterPanel/IssuesFilter/types";
import { InsightTicketRenderer } from "./InsightTicketRenderer";
import * as s from "./styles";
import type {
  GenericCodeObjectInsight,
  InsightTicketInfo,
  InsightType,
  InsightsProps
} from "./types";

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
    setInsightsFilteredInsightTypesInGlobalScope:
      setFilteredInsightTypesInGlobalScope,
    setInsightsFilteredCriticalityLevels: setFilteredCriticalityLevels,
    setInsightsFilteredCriticalityLevelsInGlobalScope:
      setFilteredCriticalityLevelsInGlobalScope,
    setInsightsFilters: setFilters,
    resetInsights: reset
  } = useStore.getState();
  const {
    insightViewType: storedInsightViewType,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope,
    filters
  } = useInsightsSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const filteredInsightTypes = scopeSpanCodeObjectId
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const previousFilteredInsightTypes = usePrevious(filteredInsightTypes);
  const filteredCriticalityLevels = scopeSpanCodeObjectId
    ? filteredCriticalityLevelsInSpanScope
    : filteredCriticalityLevelsInGlobalScope;
  const previousFilteredCriticalityLevels = usePrevious(
    filteredCriticalityLevels
  );
  const previousFilters = usePrevious(filters);
  const previousBackendInfo = usePrevious(backendInfo);
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
      setFilteredInsightTypes(
        (persistedFilters?.issueTypes as InsightType[]) ?? []
      );
      setFilteredInsightTypesInGlobalScope(
        (persistedFilters?.issueTypesInGlobalScope as InsightType[]) ?? []
      );
      setFilteredCriticalityLevelsInGlobalScope(
        persistedFilters?.criticalityFilterInGlobalScope ??
          insightsInitialState.filteredCriticalityLevelsInGlobalScope
      );
      setFilters(persistedFilters?.filters ?? []);
      setAreFiltersRehydrated(true);
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    setFilters,
    setFilteredInsightTypes,
    setFilteredInsightTypesInGlobalScope,
    setFilteredCriticalityLevelsInGlobalScope
  ]);

  // Persist filters on its change
  useEffect(() => {
    if (
      (previousFilteredInsightTypes !== filteredInsightTypes ||
        previousFilters !== filters ||
        previousFilteredCriticalityLevels !== filteredCriticalityLevels) &&
      areFiltersRehydrated
    ) {
      setPersistedFilters({
        ...(scopeSpanCodeObjectId
          ? {
              issueTypes: filteredInsightTypes ?? [],
              issueTypesInGlobalScope:
                persistedFilters?.issueTypesInGlobalScope ?? [],
              criticalityFilterInGlobalScope:
                persistedFilters?.criticalityFilterInGlobalScope ?? []
            }
          : {
              issueTypes: persistedFilters?.issueTypes ?? [],
              issueTypesInGlobalScope: filteredInsightTypes,
              criticalityFilterInGlobalScope: filteredCriticalityLevels
            }),
        filters
      });
    }
  }, [
    previousFilteredCriticalityLevels,
    filteredCriticalityLevels,
    previousFilteredInsightTypes,
    filteredInsightTypes,
    previousFilters,
    filters,
    setPersistedFilters,
    areFiltersRehydrated,
    persistedFilters,
    scopeSpanCodeObjectId
  ]);

  // Reset insight type and criticality filters (for span and global scopes) on backend instance, environment change
  useEffect(() => {
    if (
      (areFiltersRehydrated &&
        Boolean(
          previousBackendInfo &&
            !areBackendInfosEqual(previousBackendInfo, backendInfo)
        )) ||
      Boolean(previousEnvironmentId && previousEnvironmentId !== environmentId)
    ) {
      setFilteredInsightTypes([]);
      setFilteredInsightTypesInGlobalScope([]);
      setFilteredCriticalityLevels(
        insightsInitialState.filteredCriticalityLevels
      );
      setFilteredCriticalityLevelsInGlobalScope(
        insightsInitialState.filteredCriticalityLevelsInGlobalScope
      );
    }
  }, [
    previousBackendInfo,
    backendInfo,
    areFiltersRehydrated,
    setFilteredInsightTypes,
    setFilteredInsightTypesInGlobalScope,
    setFilteredCriticalityLevels,
    setFilteredCriticalityLevelsInGlobalScope,
    previousEnvironmentId,
    environmentId
  ]);

  // Reset insight type and criticality filters (for span scope) on scope change from span to global and vice versa
  useEffect(() => {
    if (
      (previousScopeSpanCodeObjectId && !scopeSpanCodeObjectId) ||
      (!previousScopeSpanCodeObjectId && scopeSpanCodeObjectId)
    ) {
      setFilteredInsightTypes([]);

      // Reset criticality levels filter if the scope change event is not related to Metrics report
      if (
        scope?.context?.event &&
        ![
          SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
          SCOPE_CHANGE_EVENTS.METRICS_ENDPOINT_SELECTED
        ].includes(scope?.context?.event as SCOPE_CHANGE_EVENTS)
      ) {
        setFilteredCriticalityLevels(
          insightsInitialState.filteredCriticalityLevels
        );
      }
    }
  }, [
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId,
    setFilteredInsightTypes,
    setFilteredCriticalityLevels,
    scope?.context?.event
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
    setFilteredInsightTypesInGlobalScope,
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

    // switch (data?.insightsStatus) {
    //   case InsightsStatus.STARTUP:
    //     return <EmptyState preset={"nothingToShow"} />;
    //   case InsightsStatus.NO_INSIGHTS:
    //     return <EmptyState preset={"noInsights"} />;
    //   case InsightsStatus.INSIGHT_PENDING:
    //     return <EmptyState preset={"processing"} />;
    //   case InsightsStatus.NO_SPANS_DATA:
    //     return <EmptyState preset={"noDataYet"} />;
    //   case InsightsStatus.NO_OBSERVABILITY:
    //     return <EmptyState preset={"noObservability"} />;
    //   case InsightsStatus.DEFAULT:
    //   default:
    return (
      <InsightsCatalog
        onJiraTicketCreate={handleJiraTicketPopupOpen}
        onRefresh={refresh}
      />
    );
    // }
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
              <InsightTicketRenderer
                data={infoToOpenJiraTicket}
                onClose={handleJiraTicketPopupClose}
                backendInfo={backendInfo}
              />
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
