import { useCallback, useMemo } from "react";
import { useGetInsightsStatsQuery } from "../../../redux/services/digma";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useGetInsightsStats = () => {
  const { scope, environment, selectedServices } = useConfigSelector();
  const {
    filteredInsightTypes: filteredInsightTypesInSpanScope,
    filteredInsightTypesInGlobalScope
  } = useInsightsSelector();

  const environmentId = environment?.id;

  const filteredServices = useMemo(
    () => selectedServices ?? [],
    [selectedServices]
  );
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
  const filteredInsightTypes = spanCodeObjectId
    ? filteredInsightTypesInSpanScope
    : filteredInsightTypesInGlobalScope;

  const { data, refetch, isUninitialized } = useGetInsightsStatsQuery(
    {
      scopedSpanCodeObjectId: spanCodeObjectId ?? undefined,
      environment: environmentId,
      insights:
        filteredInsightTypes.length > 0
          ? filteredInsightTypes.join(",")
          : undefined,
      services:
        spanCodeObjectId && filteredServices.length > 0
          ? filteredInsightTypes.join(",")
          : undefined
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
