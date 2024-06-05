import { useCallback, useEffect, useRef, useState } from "react";
import { dispatcher } from "../dispatcher";
import { isNumber } from "../typeGuards/isNumber";
import { usePrevious } from "./usePrevious";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export interface DataFetcherConfiguration {
  requestAction: string;
  responseAction: string;
  refreshInterval?: number;
}

export const useFetchData = <T, K>(
  config: DataFetcherConfiguration,
  payload?: T
) => {
  const [data, setData] = useState<K>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const refreshInterval = config.refreshInterval
    ? config.refreshInterval
    : REFRESH_INTERVAL;
  const previousRefreshInterval = usePrevious(refreshInterval);

  const getData = useCallback(() => {
    window.sendMessageToDigma<T>({
      action: config.requestAction,
      payload
    });
  }, [config.requestAction, payload]);
  const previousGetData = usePrevious(getData);

  useEffect(() => {
    if (previousGetData && previousGetData !== getData) {
      window.clearTimeout(refreshTimerId.current);
      getData();
    }
  }, [previousGetData, getData]);

  useEffect(() => {
    if (
      previousLastSetDataTimeStamp !== lastSetDataTimeStamp ||
      (isNumber(previousRefreshInterval) &&
        previousRefreshInterval !== refreshInterval)
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
    getData
  ]);

  useEffect(() => {
    const handleData = (data: any, timeStamp: number) => {
      setData(data as K);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(config.responseAction, handleData);

    return () => {
      dispatcher.removeActionListener(config.responseAction, handleData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, [config.responseAction]);

  return {
    data,
    getData
  };
};
