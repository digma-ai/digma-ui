import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { GetInsightStatsPayload } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import {
  GlobalState,
  InsightsQuery as InsightsDataQuery
} from "../common/App/types";
import { actions } from "./actions";
import {
  InsightsData,
  InsightsQuery,
  InsightsStatus,
  ScopedInsightsQuery,
  ViewMode
} from "./types";

interface UseInsightDataProps {
  refreshInterval: number;
  query: InsightsQuery;
}

const getData = (scopedQuery: ScopedInsightsQuery, state?: GlobalState) => {
  const getDataQuery: InsightsDataQuery = {
    displayName: scopedQuery.searchQuery,
    sortBy: scopedQuery.sorting.criterion,
    sortOrder: scopedQuery.sorting.order,
    page: scopedQuery.page,
    scopedSpanCodeObjectId: scopedQuery.scopedSpanCodeObjectId,
    showDismissed: scopedQuery.showDismissed,
    insightViewType: scopedQuery.insightViewType,
    showUnreadOnly: scopedQuery.showUnreadOnly,
    filters: scopedQuery.filters
  };

  window.sendMessageToDigma({
    action: actions.GET_DATA_LIST,
    payload: {
      query: getDataQuery
    }
  });

  const globalStateSlice =
    scopedQuery.insightViewType === "Analytics" ? "analytics" : "insights";

  window.sendMessageToDigma<GlobalState>({
    action: globalActions.UPDATE_STATE,
    payload: {
      ...state,
      [globalStateSlice]: {
        ...state?.[globalStateSlice],
        query: getDataQuery
      }
    }
  });
};

const getStats = (spanCodeObjectId: string | null) => {
  window.sendMessageToDigma<GetInsightStatsPayload>({
    action: globalActions.GET_INSIGHT_STATS,
    payload: {
      scope: spanCodeObjectId
        ? {
            span: {
              spanCodeObjectId: spanCodeObjectId
            }
          }
        : null
    }
  });
};

export const useInsightsData = ({
  refreshInterval,
  query
}: UseInsightDataProps) => {
  const [data, setData] = useState<InsightsData>();
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const config = useContext(ConfigContext);
  const { scope, environment, state } = config;

  const scopedQuery = useMemo(
    () => ({
      ...query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
    }),
    [query, scope]
  );

  useEffect(() => {
    getData(scopedQuery, state);

    setIsInitialLoading(true);
    setIsLoading(true);
    const handleInsightsData = (data: unknown, timeStamp: number) => {
      const insightsData = data as InsightsData;
      insightsData.insightsStatus = InsightsStatus.DEFAULT;
      insightsData.viewMode = ViewMode.INSIGHTS;

      setIsLoading(false);
      setData(insightsData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA_LIST, handleInsightsData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA_LIST,
        handleInsightsData
      );
    };
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(scopedQuery, state);
        getStats(scopedQuery.scopedSpanCodeObjectId);
      }, refreshInterval);
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    environment,
    scopedQuery,
    refreshInterval
  ]);

  useEffect(() => {
    getData(scopedQuery, state);
    getStats(scopedQuery.scopedSpanCodeObjectId);
    setIsLoading(true);
  }, [scopedQuery, scope?.span?.spanCodeObjectId, environment?.id]);

  return {
    isInitialLoading,
    data,
    isLoading,
    refresh: () => {
      getData(scopedQuery, state);
      getStats(scopedQuery.scopedSpanCodeObjectId);
    }
  };
};
