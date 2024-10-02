import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../dispatcher";
import { useMount } from "./useMount";
import { usePrevious } from "./usePrevious";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export interface DataFetcherConfiguration {
  requestAction: string;
  responseAction: string;
  refreshInterval?: number;
  refreshWithInterval?: boolean;
  refreshOnPayloadChange?: boolean;
  isEnabled?: boolean;
  fetchOnMount?: boolean;
  refreshWithDebounce?: boolean;
  debounceDelay?: number;
}

export interface FetchDataState {
  data?: unknown;
  getData: () => void;
}

const sendMessage = <T>(action: string, payload?: T) => {
  window.sendMessageToDigma<T>({
    action,
    payload
  });
};

export const useFetchData = <T, K>(
  {
    requestAction,
    responseAction,
    refreshWithInterval = false,
    refreshOnPayloadChange = false,
    refreshInterval = REFRESH_INTERVAL,
    isEnabled = true,
    fetchOnMount = true,
    refreshWithDebounce = false,
    debounceDelay = 0
  }: DataFetcherConfiguration,
  payload?: T
) => {
  const [data, setData] = useState<K>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const previousRequestAction = usePrevious(requestAction);
  const previousRefreshInterval = usePrevious(refreshInterval);
  const previousRefreshWithInterval = usePrevious(refreshWithInterval);
  const previousIsEnabled = usePrevious(isEnabled);
  const previousPayload = usePrevious(payload);
  const [isMounted, setIsMounted] = useState(false);

  useMount(() => {
    if (isEnabled && fetchOnMount) {
      sendMessage(requestAction, payload);
    }
    setIsMounted(true);
  });

  // Clear timer and get data on request action change
  useEffect(() => {
    if (isEnabled && isMounted && previousRequestAction !== requestAction) {
      window.clearTimeout(refreshTimerId.current);

      sendMessage(requestAction, payload);
    }
  }, [
    refreshOnPayloadChange,
    isEnabled,
    requestAction,
    payload,
    isMounted,
    previousRequestAction
  ]);

  // Restart timer and get data on payload change
  useEffect(() => {
    if (
      isEnabled &&
      refreshOnPayloadChange &&
      isMounted &&
      previousPayload !== payload
    ) {
      window.clearTimeout(refreshTimerId.current);

      if (refreshWithDebounce && debounceDelay >= 0) {
        refreshTimerId.current = window.setTimeout(() => {
          sendMessage<T>(requestAction, payload);
        }, debounceDelay);
      } else {
        sendMessage<T>(requestAction, payload);
      }
    }
  }, [
    previousPayload,
    payload,
    isMounted,
    requestAction,
    refreshOnPayloadChange,
    isEnabled,
    debounceDelay,
    refreshWithDebounce
  ]);

  // Toggle fetching on isEnabled change
  useEffect(() => {
    if (isMounted && previousIsEnabled !== isEnabled) {
      window.clearTimeout(refreshTimerId.current);

      if (isEnabled) {
        sendMessage(requestAction, payload);
      }
    }
  }, [isMounted, previousIsEnabled, requestAction, payload, isEnabled]);

  // Toggle fetching on refreshWithInterval change
  useEffect(() => {
    if (isMounted && previousRefreshWithInterval !== refreshWithInterval) {
      window.clearTimeout(refreshTimerId.current);

      if (isEnabled) {
        sendMessage(requestAction, payload);
      }
    }
  }, [
    isMounted,
    previousRefreshWithInterval,
    refreshWithInterval,
    refreshInterval,
    requestAction,
    payload,
    isEnabled
  ]);

  // Restart timer on new data arrival (data timestamp change)
  useEffect(() => {
    if (
      isEnabled &&
      refreshWithInterval &&
      refreshInterval > 0 &&
      previousLastSetDataTimeStamp !== lastSetDataTimeStamp
    ) {
      window.clearTimeout(refreshTimerId.current);

      refreshTimerId.current = window.setTimeout(() => {
        sendMessage(requestAction, payload);
      }, refreshInterval);
    }
  }, [
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    refreshInterval,
    requestAction,
    payload,
    refreshWithInterval,
    isEnabled
  ]);

  // Restart timer on refresh interval duration change
  useEffect(() => {
    if (
      isEnabled &&
      isMounted &&
      refreshWithInterval &&
      previousRefreshInterval !== refreshInterval
    ) {
      window.clearTimeout(refreshTimerId.current);

      if (refreshInterval > 0) {
        refreshTimerId.current = window.setTimeout(() => {
          sendMessage(requestAction, payload);
        }, refreshInterval);
      }
    }
  }, [
    isMounted,
    previousRefreshInterval,
    refreshInterval,
    requestAction,
    payload,
    refreshWithInterval,
    isEnabled
  ]);

  // Add/Remove message listeners
  useEffect(() => {
    const handleData = (data: unknown, timeStamp: number) => {
      if (isEnabled) {
        setData(data as K);
        setLastSetDataTimeStamp(timeStamp);
      }
    };

    dispatcher.addActionListener(responseAction, handleData);

    return () => {
      dispatcher.removeActionListener(responseAction, handleData);
      window.clearTimeout(refreshTimerId.current);
    };
  }, [responseAction, isEnabled]);

  return {
    data,
    getData: () => sendMessage(requestAction, payload)
  };
};
