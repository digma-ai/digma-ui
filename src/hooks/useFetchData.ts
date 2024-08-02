import { useCallback, useEffect, useRef, useState } from "react";
import { dispatcher } from "../dispatcher";
import { isBoolean } from "../typeGuards/isBoolean";
import { isNumber } from "../typeGuards/isNumber";
import { usePrevious } from "./usePrevious";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export interface DataFetcherConfiguration {
  requestAction: string;
  responseAction: string;
  refreshInterval?: number;
  refreshWithInterval?: boolean;
  refreshOnPayloadChange?: boolean;
}

export const useFetchData = <T, K>(
  {
    requestAction,
    responseAction,
    refreshWithInterval = false,
    refreshOnPayloadChange = false,
    refreshInterval = REFRESH_INTERVAL
  }: DataFetcherConfiguration,
  payload?: T
) => {
  const [data, setData] = useState<K>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const previousRefreshInterval = usePrevious(refreshInterval);
  const previousRefreshWithInterval = usePrevious(refreshWithInterval);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [handleResponse, setHandleResponse] = useState<boolean>(true);

  const getData = useCallback(() => {
    window.sendMessageToDigma<T>({
      action: requestAction,
      payload
    });
    setIsInProgress(true);
  }, [requestAction, payload]);

  const previousGetData = usePrevious(getData);

  useEffect(() => {
    if (
      refreshOnPayloadChange &&
      previousGetData &&
      previousGetData !== getData
    ) {
      window.clearTimeout(refreshTimerId.current);
      getData();
    }
  }, [previousGetData, getData, refreshOnPayloadChange]);

  useEffect(() => {
    if (
      isBoolean(previousRefreshWithInterval) &&
      previousRefreshWithInterval !== refreshWithInterval
    ) {
      if (refreshWithInterval) {
        getData();
      } else {
        setHandleResponse(false);
        window.clearTimeout(refreshTimerId.current);
      }
    }
  }, [
    previousRefreshWithInterval,
    refreshWithInterval,
    refreshInterval,
    getData
  ]);

  useEffect(() => {
    if (
      refreshWithInterval &&
      (previousLastSetDataTimeStamp !== lastSetDataTimeStamp ||
        (isNumber(previousRefreshInterval) &&
          previousRefreshInterval !== refreshInterval))
    ) {
      window.clearTimeout(refreshTimerId.current);

      refreshTimerId.current = window.setTimeout(() => {
        getData();
      }, refreshInterval);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    previousRefreshInterval,
    refreshInterval,
    getData,
    refreshWithInterval
  ]);

  useEffect(() => {
    const handleData = (data: unknown, timeStamp: number) => {
      if (isInProgress) {
        if (handleResponse) {
          setData(data as K);
          setLastSetDataTimeStamp(timeStamp);
        }
        setIsInProgress(false);
      }
    };

    dispatcher.addActionListener(responseAction, handleData);

    return () => {
      dispatcher.removeActionListener(responseAction, handleData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, [responseAction, isInProgress, handleResponse]);

  return {
    data,
    getData
  };
};
