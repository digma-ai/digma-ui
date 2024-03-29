import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
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

const getData = (query: ScopedInsightsQuery, state?: GlobalState) => {
  const getDataQuery: InsightsDataQuery = {
    displayName: query.searchQuery,
    sortBy: query.sorting.criterion,
    sortOrder: query.sorting.order,
    page: query.page,
    scopedSpanCodeObjectId: query.scopedSpanCodeObjectId,
    showDismissed: query.showDismissed,
    insightViewType: query.insightViewType,
    showUnreadOnly: query.showUnreadOnly
  };

  window.sendMessageToDigma({
    action: actions.GET_DATA_LIST,
    payload: {
      query: getDataQuery
    }
  });

  const globalStateSlice =
    query.insightViewType === "Analytics" ? "analytics" : "insights";

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

export const useInsightsData = (props: UseInsightDataProps) => {
  const [data, setData] = useState<InsightsData>({
    insightsStatus: InsightsStatus.LOADING,
    insights: [],
    viewMode: ViewMode.INSIGHTS,
    totalCount: 0
  });
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const config = useContext(ConfigContext);
  const { scope, environment, state } = config;

  const query = useMemo(
    () => ({
      ...props.query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
    }),
    [props.query, scope]
  );

  useEffect(() => {
    getData(query, state);

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
      refreshTimerId.current = window.setTimeout(
        (insightsQuery: ScopedInsightsQuery) => {
          getData(insightsQuery, state);
        },
        props.refreshInterval,
        query
      );
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    query,
    environment,
    props.refreshInterval
  ]);

  useEffect(() => {
    setIsLoading(true);
    getData(
      {
        ...props.query,
        scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
      },
      state
    );
  }, [props.query, scope, environment]);

  return {
    isInitialLoading,
    data,
    isLoading,
    refresh: () => getData(query, state)
  };
};
