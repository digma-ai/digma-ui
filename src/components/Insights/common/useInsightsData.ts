import { useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { ConfigContext } from "../../common/App/ConfigContext";
import { actions } from "../actions";
import {
  InsightsData,
  InsightsQuery,
  InsightsStatus,
  ScopedInsightsQuery,
  ViewMode
} from "../types";

interface UseInsightDataProps {
  refreshInterval: number;
  data?: InsightsData;
  query: InsightsQuery;
}

const getData = (query: ScopedInsightsQuery) => {
  window.sendMessageToDigma({
    action: actions.GET_DATA_LIST,
    payload: {
      query: {
        displayName: query.searchQuery,
        sortBy: query.sorting.criterion,
        sortOrder: query.sorting.order,
        page: query.page,
        scopedSpanCodeObjectId: query.scopedSpanCodeObjectId
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
  const { scope, environment } = useContext(ConfigContext);

  useEffect(() => {
    getData({
      ...props.query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
    });

    setIsInitialLoading(true);
    setIsLoading(true);
    const handleInsightsData = (data: unknown, timeStamp: number) => {
      const insightsData = data as InsightsData;
      insightsData.insightsStatus = InsightsStatus.DEFAULT;
      insightsData.viewMode = ViewMode.INSIGHTS;
      // insightsData.methods = [];
      // insightsData.spans = [];

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
    if (!props.data) {
      return;
    }

    setData(props.data);
  }, [data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(
        () => {
          getData({
            ...props.query,
            scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
          });
        },
        props.refreshInterval,
        props.query
      );
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    props.query,
    scope,
    environment
  ]);

  useEffect(() => {
    setIsLoading(true);
    getData({
      ...props.query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId || null
    });
  }, [props.query, scope, environment]);
  return {
    isInitialLoading,
    previousData,
    data,
    isLoading
  };
};
