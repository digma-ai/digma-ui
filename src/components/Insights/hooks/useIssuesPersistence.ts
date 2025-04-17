import { useEffect, useState } from "react";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { initialState as insightsInitialState } from "../../../store/insights/insightsSlice";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { isUndefined } from "../../../typeGuards/isUndefined";
import type { InsightType } from "../../../types";
import { areBackendInfosEqual } from "../../../utils/areBackendInfosEqual";
import type { IssuesFilterQuery } from "../InsightsCatalog/FilterPanel/IssuesFilter/types";

export const ISSUES_FILTERS_PERSISTENCE_KEY = "issuesFilters";

export const useIssuesPersistence = () => {
  const [areFiltersRehydrated, setAreFiltersRehydrated] = useState(false);

  const { backendInfo, scope } = useConfigSelector();
  const {
    setInsightsFilteredInsightTypes: setFilteredInsightTypes,
    setInsightsFilteredInsightTypesInGlobalScope:
      setFilteredInsightTypesInGlobalScope,
    setInsightsFilteredCriticalityLevels: setFilteredCriticalityLevels,
    setInsightsFilteredCriticalityLevelsInGlobalScope:
      setFilteredCriticalityLevelsInGlobalScope,
    setInsightsFilters: setFilters,
    setInsightsLastDays: setLastDays
  } = useStore.getState();
  const {
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope,
    filters,
    lastDays
  } = useInsightsSelector();

  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(
      ISSUES_FILTERS_PERSISTENCE_KEY,
      "project"
    );

  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const filteredInsightTypes = scopeSpanCodeObjectId
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const previousPersistedFilters = usePrevious(persistedFilters);
  const previousFilteredInsightTypes = usePrevious(filteredInsightTypes);
  const filteredCriticalityLevels = scopeSpanCodeObjectId
    ? filteredCriticalityLevelsInSpanScope
    : filteredCriticalityLevelsInGlobalScope;
  const previousFilteredCriticalityLevels = usePrevious(
    filteredCriticalityLevels
  );
  const previousFilters = usePrevious(filters);
  const previousLastDays = usePrevious(lastDays);
  const previousBackendInfo = usePrevious(backendInfo);

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
      setLastDays(persistedFilters?.lastDays ?? insightsInitialState.lastDays);
      setAreFiltersRehydrated(true);
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    setFilters,
    setFilteredInsightTypes,
    setFilteredInsightTypesInGlobalScope,
    setFilteredCriticalityLevelsInGlobalScope,
    setLastDays
  ]);

  // Persist filters on its change
  useEffect(() => {
    if (
      (previousFilteredInsightTypes !== filteredInsightTypes ||
        previousFilters !== filters ||
        previousFilteredCriticalityLevels !== filteredCriticalityLevels ||
        previousLastDays !== lastDays) &&
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
        filters,
        lastDays
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
    scopeSpanCodeObjectId,
    lastDays,
    previousLastDays
  ]);

  // Reset insight type, criticality and unread filters (for span and global scopes) on backend instance change
  useEffect(() => {
    if (
      areFiltersRehydrated &&
      Boolean(
        previousBackendInfo &&
          !areBackendInfosEqual(previousBackendInfo, backendInfo)
      )
    ) {
      setFilteredInsightTypes([]);
      setFilteredInsightTypesInGlobalScope([]);
      setFilteredCriticalityLevels(
        insightsInitialState.filteredCriticalityLevels
      );
      setFilteredCriticalityLevelsInGlobalScope(
        insightsInitialState.filteredCriticalityLevelsInGlobalScope
      );
      setFilters([]);
    }
  }, [
    previousBackendInfo,
    backendInfo,
    areFiltersRehydrated,
    setFilteredInsightTypes,
    setFilteredInsightTypesInGlobalScope,
    setFilteredCriticalityLevels,
    setFilteredCriticalityLevelsInGlobalScope,
    setFilters
  ]);

  return {
    areFiltersRehydrated: persistedFilters !== null
  };
};
