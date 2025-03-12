import { useEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useGetIssuesFiltersQuery } from "../../../redux/services/digma";
import type { GetIssuesFiltersPayload } from "../../../redux/services/types";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { FeatureFlag } from "../../../types";
import { ViewMode, type InsightFilterType } from "../InsightsCatalog/types";

interface UseIssuesFiltersProps {
  isEnabled: boolean;
}

export const useIssuesFilters = ({ isEnabled }: UseIssuesFiltersProps) => {
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

  const isCriticalityLevelsFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled
  );

  const payload: GetIssuesFiltersPayload = useMemo(() => {
    const filteredInsightTypes = spanCodeObjectId
      ? filteredInsightTypesInSpanScope
      : filteredInsightTypesInGlobalScope;

    const filteredCriticalityLevels = spanCodeObjectId
      ? filteredCriticalityLevelsInSpanScope
      : filteredCriticalityLevelsInGlobalScope;

    const payloadFilters = [
      ...(!isCriticalityLevelsFilterEnabled && filters.includes("criticality")
        ? ["criticality"]
        : []),
      ...(filters.includes("unread") ? ["unread"] : [])
    ] as InsightFilterType[];

    return {
      displayName: search.length > 0 ? search : undefined,
      filters: payloadFilters.length > 0 ? payloadFilters : undefined,
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
    };
  }, [
    search,
    filters,
    viewMode,
    spanCodeObjectId,
    environmentId,
    selectedServices,
    isCriticalityLevelsFilterEnabled,
    filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    filteredCriticalityLevelsInSpanScope,
    filteredCriticalityLevelsInGlobalScope
  ]);

  const { data: issuesFiltersData } = useGetIssuesFiltersQuery(payload, {
    skip: !isEnabled
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
