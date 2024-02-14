import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions } from "../actions";
import {
  InsightsData,
  InsightsQuery,
  InsightsStatus,
  ViewMode
} from "../types";

interface UseInsightDataProps {
  refreshInterval: number;
  data?: InsightsData;
  query?: InsightsQuery;
}

const getData = (query?: InsightsQuery) => {
  window.sendMessageToDigma({
    action: actions.GET_DATA_LIST,
    payload: {
      query: {
        displayName: query?.searchQuery,
        sortBy: query?.sorting.criterion,
        sortOrder: query?.sorting.order,
        page: query?.page
      }
    }
  });
};

export const useInsightsData = (props: UseInsightDataProps) => {
  const [data, setData] = useState<InsightsData>();
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  useEffect(() => {
    getData(props.query);

    setIsInitialLoading(true);
    const handleInsightsData = (data: unknown, timeStamp: number) => {
      const insightsData = data as InsightsData;
      insightsData.insightsStatus = InsightsStatus.DEFAULT;
      insightsData.viewMode = ViewMode.INSIGHTS;
      insightsData.methods = [];
      insightsData.spans = [];

      console.log(insightsData);
      setIsLoading(false);
      // setIsLoading(insightsData.insightsStatus === InsightsStatus.LOADING);

      // if (insightsData.insightsStatus !== InsightsStatus.LOADING) {
      setData(insightsData);
      //}
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
          getData(props.query);
        },
        props.refreshInterval,
        props.query
      );
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, props.query]);

  useEffect(() => {
    setIsLoading(true);
    getData(props.query);
  }, [props.query]);
  return {
    isInitialLoading,
    previousData,
    data,
    isLoading
  };
};
