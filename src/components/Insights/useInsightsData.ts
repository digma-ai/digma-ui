import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { DigmaMessageError } from "../../api/types";
import { dispatcher } from "../../dispatcher";
import { getFeatureFlagValue } from "../../featureFlags";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../store/insights/useInsightsSelector";
import { useStore } from "../../store/useStore";
import {
  FeatureFlag,
  GetInsightStatsPayload,
  GetIssuesDataListPayload
} from "../../types";
import { GetInsightsDataListPayload, InsightsQuery } from "../common/App/types";
import { Sorting } from "../common/SortingSelector/types";
import { InsightFilterType, ViewMode } from "./InsightsCatalog/types";
import { actions as issuesActions } from "./Issues/actions";
import { GetIssuesDataListQuery } from "./Issues/types";
import { actions } from "./actions";
import { InsightViewType, WrappedInsightData } from "./types";

interface UseInsightsDataProps {
  areFiltersRehydrated: boolean;
}

interface GetDataListParams {
  search: string | null;
  page: number;
  sorting: Sorting;
  showDismissed: boolean;
  filters: InsightFilterType[];
  filteredInsightTypes: string[];
  filteredServices: string[];
  insightViewType: InsightViewType | null;
  spanCodeObjectId: string | null;
  areIssuesFiltersEnabled: boolean;
}

interface GetStatsParams {
  spanCodeObjectId: string | null;
  filteredInsightTypes: string[];
  filteredServices: string[];
}

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getInsightsDataList = (query: InsightsQuery) => {
  window.sendMessageToDigma<GetInsightsDataListPayload>({
    action: actions.GET_DATA_LIST,
    payload: {
      query
    }
  });
};

const getIssuesDataList = (query: GetIssuesDataListQuery) => {
  window.sendMessageToDigma<GetIssuesDataListPayload>({
    action: issuesActions.GET_DATA_LIST,
    payload: {
      query
    }
  });
};

const getDataList = ({
  search,
  page,
  sorting,
  showDismissed,
  filters,
  filteredInsightTypes,
  filteredServices,
  insightViewType,
  spanCodeObjectId,
  areIssuesFiltersEnabled
}: GetDataListParams) => {
  if (!insightViewType) {
    return;
  }

  if (insightViewType === "Issues" && areIssuesFiltersEnabled) {
    getIssuesDataList({
      displayName: search,
      page,
      sorting,
      filters,
      showDismissed,
      scopedSpanCodeObjectId: spanCodeObjectId,
      insightTypes: filteredInsightTypes,
      services: spanCodeObjectId ? [] : filteredServices
    });
  } else {
    const showUnreadOnly = filters.length === 1 && filters[0] === "unread";
    getInsightsDataList({
      displayName: search,
      page,
      sortBy: sorting.criterion,
      sortOrder: sorting.order,
      filters,
      showDismissed,
      scopedSpanCodeObjectId: spanCodeObjectId,
      insightViewType,
      showUnreadOnly
    });
  }
};

const getStats = ({
  spanCodeObjectId,
  filteredInsightTypes,
  filteredServices
}: GetStatsParams) => {
  window.sendMessageToDigma<GetInsightStatsPayload>({
    action: globalActions.GET_INSIGHT_STATS,
    payload: {
      scope: spanCodeObjectId
        ? {
            span: {
              spanCodeObjectId: spanCodeObjectId
            }
          }
        : null,
      filters: {
        insights: filteredInsightTypes,
        services: spanCodeObjectId ? [] : filteredServices
      }
    }
  });
};

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
    filteredInsightTypes,
    isDataLoading: isLoading,
    insightViewType
  } = useInsightsSelector();
  const { setData, setIsDataLoading: setIsLoading } = useStore.getState();
  const isInitialLoading = !data && isLoading;
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const environmentId = environment?.id;

  const filteredServices = useMemo(
    () => selectedServices ?? [],
    [selectedServices]
  );
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
  const showDismissed = viewMode === ViewMode.OnlyDismissed;
  const isAppReadyToGetData = useMemo(
    () =>
      Boolean(
        backendInfo && areFiltersRehydrated && insightViewType && environment
      ),
    [backendInfo, areFiltersRehydrated, insightViewType, environment]
  );

  const areIssuesFiltersEnabled = useMemo(
    () =>
      Boolean(
        getFeatureFlagValue(backendInfo, FeatureFlag.ARE_ISSUES_FILTERS_ENABLED)
      ),
    [backendInfo]
  );

  const getDataListParams = useMemo(
    () => ({
      search,
      page,
      sorting,
      showDismissed,
      filters,
      filteredInsightTypes,
      filteredServices,
      insightViewType,
      spanCodeObjectId,
      areIssuesFiltersEnabled
    }),
    [
      search,
      page,
      sorting,
      showDismissed,
      filters,
      filteredInsightTypes,
      filteredServices,
      insightViewType,
      spanCodeObjectId,
      areIssuesFiltersEnabled
    ]
  );

  const getStatsParams = useMemo(
    () => ({
      spanCodeObjectId,
      filteredInsightTypes,
      filteredServices
    }),
    [spanCodeObjectId, filteredInsightTypes, filteredServices]
  );

  const refresh = useCallback(() => {
    if (isAppReadyToGetData) {
      getDataList(getDataListParams);
      getStats(getStatsParams);
      setIsLoading(true);
    }
  }, [getDataListParams, getStatsParams, setIsLoading, isAppReadyToGetData]);

  useEffect(() => {
    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    window.clearTimeout(refreshTimerId.current);
    refresh();
  }, [backendInfo, environmentId, spanCodeObjectId, refresh]);

  useEffect(() => {
    const handleInsightsData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      const insightsData = data as WrappedInsightData;

      if (insightViewType !== insightsData.insightsViewMode) {
        return;
      }

      if (!error) {
        setData(insightsData.data);
      }
      setIsLoading(false);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA_LIST, handleInsightsData);
    dispatcher.addActionListener(
      issuesActions.SET_DATA_LIST,
      handleInsightsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA_LIST,
        handleInsightsData
      );
      dispatcher.removeActionListener(
        issuesActions.SET_DATA_LIST,
        handleInsightsData
      );
    };
  }, [setData, setIsLoading, insightViewType]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        refresh();
      }, REFRESH_INTERVAL);
    }
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refresh]);

  return {
    data,
    isLoading,
    isInitialLoading,
    refresh
  };
};
