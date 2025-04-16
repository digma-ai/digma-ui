import { useCallback, useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useGetInsightsStatsQuery } from "../../../redux/services/digma";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { FeatureFlag } from "../../../types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export interface UseInsightStatsProps {
  spanCodeObjectId?: string;
  environmentId?: string;
  services?: string[];
}

export const useInsightsStats = ({
  spanCodeObjectId,
  environmentId,
  services
}: UseInsightStatsProps) => {
  const { backendInfo } = useConfigSelector();

  const {
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope,
    search,
    lastDays
  } = useInsightsSelector();

  const isIssuesLastDaysFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsIssuesLastDaysFilterEnabled
  );

  const filteredInsightTypes = spanCodeObjectId
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;
  const filteredServices = useMemo(
    () => (spanCodeObjectId ? [] : services ?? []),
    [services, spanCodeObjectId]
  );

  const { data, refetch, isUninitialized } = useGetInsightsStatsQuery(
    {
      scopedSpanCodeObjectId: spanCodeObjectId,
      environment: environmentId,
      insights:
        filteredInsightTypes.length > 0
          ? filteredInsightTypes.join(",")
          : undefined,
      services:
        filteredServices.length > 0 ? filteredServices.join(",") : undefined,
      displayName: search.length > 0 ? search : undefined,
      lastDays: isIssuesLastDaysFilterEnabled ? lastDays : undefined
    },
    {
      skip: !environmentId,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const refresh = useCallback(() => {
    if (!isUninitialized) {
      void refetch();
    }
  }, [isUninitialized, refetch]);

  return {
    data,
    refresh
  };
};
