import { useCallback, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { Environment } from "../common/App/types";
import { actions as mainActions } from "../Main/actions";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export interface GetHighlightsSpanInfoDataPayload {
  query: {
    spanCodeObjectId: string | null;
  };
}

export interface SpanInfoData {
  displayName: string;
  services: string[];
  environments: Environment[];
  assetTypeId: string;
  firstSeen?: string;
  lastSeen?: string;
}

export const useSpanInfoData = () => {
  const [data, setData] = useState<SpanInfoData>();
  const { scope } = useConfigSelector();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;

  const getData = useCallback(() => {
    if (scopeSpanCodeObjectId) {
      window.sendMessageToDigma<GetHighlightsSpanInfoDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_SPAN_INFO_DATA,
        payload: {
          query: {
            spanCodeObjectId: scopeSpanCodeObjectId
          }
        }
      });
    }
  }, [scopeSpanCodeObjectId]);
  const previousGetData = usePrevious(getData);

  useEffect(() => {
    if (!scopeSpanCodeObjectId) {
      setData(undefined);
    }
  }, [scopeSpanCodeObjectId]);

  useEffect(() => {
    if (previousGetData && previousGetData !== getData) {
      window.clearTimeout(refreshTimerId.current);

      getData();
    }
  }, [previousGetData, getData]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData();
      }, REFRESH_INTERVAL);
    }
  }, [previousLastSetDataTimeStamp, lastSetDataTimeStamp, getData]);

  useEffect(() => {
    const handleSpanInfoData = (data: unknown, timeStamp: number) => {
      setData(data as SpanInfoData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_SPAN_INFO_DATA,
      handleSpanInfoData
    );

    return () => {
      window.clearTimeout(refreshTimerId.current);
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_SPAN_INFO_DATA,
        handleSpanInfoData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
