import { useEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useGetIssuesFiltersQuery } from "../../../redux/services/digma";
import type { GetIssuesFiltersPayload } from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { FeatureFlag } from "../../../types";
import { ViewMode, type InsightFilterType } from "../InsightsCatalog/types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useIssuesFilters = () => {
  const {
    issuesFilters: data,
    search,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope,
    viewMode,
    filters
  } = useInsightsSelector();
  const { setInsightsIssuesFilters: setData } = useStore.getState();
  const { environment, scope, backendInfo, selectedServices } =
    useConfigSelector();
  const environmentId = environment?.id;
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const filteredInsightTypes = useMemo(
    () =>
      spanCodeObjectId
        ? filteredInsightTypesInSpanScope
        : filteredInsightTypesInGlobalScope,
    [
      spanCodeObjectId,
      filteredInsightTypesInSpanScope,
      filteredInsightTypesInGlobalScope
    ]
  );
  const filteredCriticalityLevels = useMemo(
    () =>
      spanCodeObjectId
        ? filteredCriticalityLevelsInSpanScope
        : filteredCriticalityLevelsInGlobalScope,
    [
      spanCodeObjectId,
      filteredCriticalityLevelsInSpanScope,
      filteredCriticalityLevelsInGlobalScope
    ]
  );

  const isCriticalityLevelsFilterEnabled = Boolean(
    backendInfo &&
      getFeatureFlagValue(
        backendInfo,
        FeatureFlag.IS_ISSUES_CRITICALITY_LEVELS_FILTER_ENABLED
      )
  );

  const queryFilters = useMemo(
    () =>
      [
        ...(!isCriticalityLevelsFilterEnabled && filters.includes("criticality")
          ? ["criticality"]
          : []),
        ...(filters.includes("unread") ? ["unread"] : [])
      ] as InsightFilterType[],
    [isCriticalityLevelsFilterEnabled, filters]
  );

  const query: GetIssuesFiltersPayload = useMemo(
    () => ({
      displayName: search.length > 0 ? search : undefined,
      filters: queryFilters.length > 0 ? queryFilters : undefined,
      insightTypes:
        filteredInsightTypes.length > 0 ? filteredInsightTypes : undefined,
      showDismissed: viewMode === ViewMode.OnlyDismissed,
      services:
        selectedServices && selectedServices.length > 0
          ? selectedServices
          : undefined,
      environment: environmentId,
      scopedSpanCodeObjectId: spanCodeObjectId,
      criticalityFilter:
        isCriticalityLevelsFilterEnabled && filteredCriticalityLevels.length > 0
          ? filteredCriticalityLevels
          : undefined
    }),
    [
      search,
      queryFilters,
      filteredInsightTypes,
      viewMode,
      spanCodeObjectId,
      filteredCriticalityLevels,
      environmentId,
      selectedServices,
      isCriticalityLevelsFilterEnabled
    ]
  );

  const { data: issuesFiltersData } = useGetIssuesFiltersQuery(query, {
    pollingInterval: REFRESH_INTERVAL
  });

  useEffect(() => {
    if (issuesFiltersData) {
      setData(issuesFiltersData);
    }
  }, [issuesFiltersData, setData]);

  return {
    data
  };
};
