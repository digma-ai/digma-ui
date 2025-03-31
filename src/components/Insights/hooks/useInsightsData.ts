import { useCallback, useEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import {
  useGetInsightsQuery,
  useGetIssuesQuery,
  useGetSpanEnvironmentsQuery
} from "../../../redux/services/digma";
import {
  InsightsSortingCriterion,
  SortingOrder
} from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { FeatureFlag } from "../../../types";
import { ViewMode } from "../InsightsCatalog/types";
import { useInsightsStats } from "./useInsightsStats";

interface UseInsightsDataProps {
  areFiltersRehydrated: boolean;
}

export const PAGE_SIZE = 10;
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useInsightsData = ({
  areFiltersRehydrated
}: UseInsightsDataProps) => {
  const { scope, backendInfo, environment, selectedServices } =
    useConfigSelector();
  const {
    data,
    search,
    page,
    sorting,
    viewMode,
    filters,
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevels: filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope,
    isDataLoading: isLoading,
    insightViewType
  } = useInsightsSelector();
  const { setInsightsData: setData, setIsInsightsDataLoading: setIsLoading } =
    useStore.getState();
  const isInitialLoading = !data && isLoading;
  const { refresh: refreshInsightStats } = useInsightsStats({
    spanCodeObjectId: scope?.span?.spanCodeObjectId,
    environmentId: environment?.id,
    services: selectedServices ?? undefined
  });
  const environmentId = environment?.id;
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;

  const filteredServices = useMemo(
    () => (spanCodeObjectId ? [] : selectedServices ?? []),
    [selectedServices, spanCodeObjectId]
  );
  const filteredInsightTypes = spanCodeObjectId
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const filteredCriticalityLevels = spanCodeObjectId
    ? filteredCriticalityLevelsInSpanScope
    : filteredCriticalityLevelsInGlobalScope;
  const showDismissed = viewMode === ViewMode.OnlyDismissed;
  const isAppReadyToGetData = useMemo(
    () =>
      Boolean(
        backendInfo && areFiltersRehydrated && insightViewType && environment
      ),
    [backendInfo, areFiltersRehydrated, insightViewType, environment]
  );

  const areIssuesFiltersEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreIssuesFiltersEnabled
  );

  const isCriticalityLevelsFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled
  );

  const areSpanEnvironmentsEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreSpanEnvironmentsEnabled
  );

  const isIssuesQueryActive =
    insightViewType === "Issues" && areIssuesFiltersEnabled;

  const {
    data: insights,
    isFetching: areInsightsLoading,
    refetch: refetchInsights,
    isUninitialized: areInsightsUninitialized
  } = useGetInsightsQuery(
    {
      data: {
        displayName: search.length > 0 ? search : undefined,
        page,
        pageSize: PAGE_SIZE,
        scopedSpanCodeObjectId: spanCodeObjectId ?? undefined,
        environment: environmentId,
        ...(insightViewType === "Issues"
          ? {
              filters: filters.length > 0 ? filters : undefined,
              showDismissed,
              showDismissedOnly: viewMode === ViewMode.OnlyDismissed,
              services:
                filteredServices.length > 0
                  ? filteredServices.join(",")
                  : undefined,
              insights:
                filteredInsightTypes.length > 0
                  ? filteredInsightTypes.join(",")
                  : undefined,
              sortBy: sorting.criterion,
              sortOrder: sorting.order
            }
          : {
              sortBy: InsightsSortingCriterion.Criticality,
              sortOrder: SortingOrder.Desc
            })
      },
      extra: {
        insightViewType: insightViewType ?? undefined
      }
    },
    {
      skip: !isAppReadyToGetData || isIssuesQueryActive,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const {
    data: issues,
    refetch: refetchIssues,
    isUninitialized: areIssuesUninitialized
  } = useGetIssuesQuery(
    {
      displayName: search.length > 0 ? search : undefined,
      page,
      pageSize: PAGE_SIZE,
      sortBy: sorting.criterion,
      sortOrder: sorting.order,
      filters: isCriticalityLevelsFilterEnabled
        ? filters.filter((x) => x !== "criticality")
        : filters,
      showDismissed,
      scopedSpanCodeObjectId: spanCodeObjectId ?? undefined,
      insightTypes: filteredInsightTypes,
      services: spanCodeObjectId ? [] : filteredServices,
      ...(isCriticalityLevelsFilterEnabled
        ? { criticalityFilter: filteredCriticalityLevels }
        : {}),
      environment: environmentId
    },
    {
      skip: !isAppReadyToGetData || !isIssuesQueryActive,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const {
    refetch: refetchSpanEnvironments,
    isUninitialized: areSpanEnvironmentsInitialized
  } = useGetSpanEnvironmentsQuery(
    { spanCodeObjectId: spanCodeObjectId ?? "" },
    {
      skip:
        !isAppReadyToGetData ||
        !spanCodeObjectId ||
        !areSpanEnvironmentsEnabled,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const refresh = useCallback(() => {
    if (isAppReadyToGetData) {
      if (!areInsightsUninitialized) {
        void refetchInsights();
      }
      if (!areIssuesUninitialized) {
        void refetchIssues();
      }
      refreshInsightStats();
      if (!areSpanEnvironmentsInitialized) {
        void refetchSpanEnvironments();
      }
    }
  }, [
    refetchInsights,
    areInsightsUninitialized,
    refetchIssues,
    areIssuesUninitialized,
    refreshInsightStats,
    refetchSpanEnvironments,
    areSpanEnvironmentsInitialized,
    isAppReadyToGetData
  ]);

  useEffect(() => {
    // Do not handle the response if the view mode has been already changed
    if (insights && insightViewType === insights.extra.insightViewType) {
      setData(insights.data);
    }
  }, [insights, setData, insightViewType]);

  useEffect(() => {
    // Do not handle the response if the view mode has been already changed
    if (issues && insightViewType === "Issues") {
      setData(issues);
    }
  }, [issues, setData, insightViewType]);

  useEffect(() => {
    setIsLoading(areInsightsLoading);
  }, [areInsightsLoading, setIsLoading]);

  return {
    data,
    isLoading: areInsightsLoading,
    isInitialLoading,
    refresh
  };
};
