import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { useStore } from "../../../store/useStore";
import { FeatureFlag, type GetIssuesFiltersPayload } from "../../../types";
import type { IssuesFiltersData } from "../InsightsCatalog/FilterPanel/IssuesFilter/types";
import { ViewMode } from "../InsightsCatalog/types";
import { actions as issuesActions } from "./actions";
import type { GetIssuesFiltersQuery } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getFilters = (query: GetIssuesFiltersQuery) => {
  window.sendMessageToDigma<GetIssuesFiltersPayload>({
    action: issuesActions.GET_FILTERS,
    payload: {
      query
    }
  });
};

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
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const { environment, scope, backendInfo } = useConfigSelector();
  const environmentId = environment?.id;
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
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

  const query: GetIssuesFiltersQuery = useMemo(
    () => ({
      displayName: search,
      filters,
      insightTypes: filteredInsightTypes,
      showDismissed: viewMode === ViewMode.OnlyDismissed,
      scopedSpanCodeObjectId: spanCodeObjectId,
      ...(isCriticalityLevelsFilterEnabled
        ? { criticalityFilter: filteredCriticalityLevels }
        : {})
    }),
    [
      search,
      filters,
      filteredInsightTypes,
      viewMode,
      spanCodeObjectId,
      filteredCriticalityLevels,
      isCriticalityLevelsFilterEnabled
    ]
  );

  const refresh = useCallback(() => {
    if (environmentId) {
      getFilters(query);
    }
  }, [query, environmentId]);

  useEffect(() => {
    window.clearTimeout(refreshTimerId.current);
    refresh();
  }, [refresh, scope?.span?.spanCodeObjectId, environmentId, backendInfo]);

  useEffect(() => {
    const handleIssueFiltersData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        const insightsData = data as IssuesFiltersData;
        setData(insightsData);
      }

      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      issuesActions.SET_FILTERS,
      handleIssueFiltersData
    );

    return () => {
      dispatcher.removeActionListener(
        issuesActions.SET_FILTERS,
        handleIssueFiltersData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, [setData]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        refresh();
      }, REFRESH_INTERVAL);
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refresh]);

  return {
    data,
    refresh,
    getData: getFilters
  };
};
