import { useCallback, useEffect, useRef, useState } from "react";
import { useScopeStore } from "../../../containers/Main/stores/useScopeStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { GetHighlightsSpanInfoDataPayload, SpanInfoData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useSpanInfoData = () => {
  const [data, setData] = useState<SpanInfoData>();
  const scope = useScopeStore().scope;
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    if (scope?.span?.spanCodeObjectId) {
      window.sendMessageToDigma<GetHighlightsSpanInfoDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_SPAN_INFO_DATA,
        payload: {
          query: {
            spanCodeObjectId: scope?.span?.spanCodeObjectId
          }
        }
      });
    }
  }, [scope?.span?.spanCodeObjectId]);
  const previousGetData = usePrevious(getData);

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
