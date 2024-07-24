import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { DigmaMessageError } from "../../api/types";
import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../containers/Main/stores/useInsightsStore";
import { dispatcher } from "../../dispatcher";
import { getFeatureFlagValue } from "../../featureFlags";
import { usePrevious } from "../../hooks/usePrevious";
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
import { InsightsData, InsightViewType } from "./types";

interface GetDataListParams {
  search: string | null;
  page: number;
  sorting: Sorting;
  showDismissed: boolean;
  filters: InsightFilterType[];
  filteredInsightTypes: string[];
  insightViewType: InsightViewType | null;
  spanCodeObjectId: string | null;
  areIssuesFiltersEnabled: boolean;
}

interface GetStatsParams {
  spanCodeObjectId: string | null;
  filteredInsightTypes: string[];
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
      insightTypes: filteredInsightTypes
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
  filteredInsightTypes
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
        insights: filteredInsightTypes
      }
    }
  });
};

export const useInsightsData = () => {
  const data = useInsightsStore.use.data();
  const setData = useInsightsStore.use.setData();
  const isLoading = useInsightsStore.use.isDataLoading();
  const setIsLoading = useInsightsStore.use.setIsDataLoading();
  const isInitialLoading = !data && isLoading;
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const backendInfo = useGlobalStore.use.backendInfo();
  const scope = useGlobalStore.use.scope();
  const environment = useGlobalStore.use.environment();
  const search = useInsightsStore.use.search();
  const page = useInsightsStore.use.page();
  const sorting = useInsightsStore.use.sorting();
  const viewMode = useInsightsStore.use.viewMode();
  const filters = useInsightsStore.use.filters();
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const insightViewType = useInsightsStore.use.insightViewType();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
  const showDismissed = viewMode === ViewMode.OnlyDismissed;

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
      insightViewType,
      spanCodeObjectId,
      areIssuesFiltersEnabled
    ]
  );

  const getStatsParams = useMemo(
    () => ({
      spanCodeObjectId,
      filteredInsightTypes
    }),
    [spanCodeObjectId, filteredInsightTypes]
  );

  const refresh = useCallback(() => {
    getDataList(getDataListParams);
    getStats(getStatsParams);
    setIsLoading(true);
  }, [getDataListParams, getStatsParams, setIsLoading]);

  useEffect(() => {
    window.clearTimeout(refreshTimerId.current);
    refresh();
  }, [spanCodeObjectId, environment?.id, refresh]);

  useEffect(() => {
    const timerId = refreshTimerId.current;

    const handleInsightsData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        setData(data as InsightsData);
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
      window.clearTimeout(timerId);
    };
  }, [setData, setIsLoading]);

  useEffect(() => {
    let timerId = refreshTimerId.current;
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        refresh();
      }, REFRESH_INTERVAL);
    }

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refresh]);

  return {
    data,
    isLoading,
    isInitialLoading,
    refresh
  };
};
