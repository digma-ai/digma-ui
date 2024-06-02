import { useCallback, useEffect, useRef, useState } from "react";
import { dispatcher } from "../dispatcher";
import { usePrevious } from "./usePrevious";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useRefreshData = <T, K>(props: {
  request: {
    action: string;
    payload?: T;
  };
  response: {
    action: string;
  };
  refreshInterval?: number;
  dependencies?: any[];
}) => {
  const [data, setData] = useState<K>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const refreshInterval = props.refreshInterval
    ? props.refreshInterval
    : REFRESH_INTERVAL;
  const previousRefreshInterval = usePrevious(refreshInterval);

  const getData = useCallback(() => {
    window.sendMessageToDigma<T>(props.request);
  }, [
    props.request,
    // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-assignment
    ...(props.dependencies ? props.dependencies : [])
  ]);

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
      refreshInterval !== previousRefreshInterval
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

    dispatcher.addActionListener(props.response.action, handleData);

    return () => {
      window.clearTimeout(refreshTimerId.current);
      dispatcher.removeActionListener(props.response.action, handleData);
    };
  }, []);

  return {
    data,
    getData
  };
};
