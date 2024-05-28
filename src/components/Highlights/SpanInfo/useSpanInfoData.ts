import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { ConfigContext } from "../../common/App/ConfigContext";
import { GetHighlightsSpanInfoDataPayload, SpanInfoData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useSpanInfoData = () => {
  const [data, setData] = useState<SpanInfoData>();
  const config = useContext(ConfigContext);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    if (config.scope?.span?.spanCodeObjectId) {
      window.sendMessageToDigma<GetHighlightsSpanInfoDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_SPAN_INFO_DATA,
        payload: {
          query: {
            spanCodeObjectId: config.scope?.span?.spanCodeObjectId
          }
        }
      });
    }
  }, [config.scope?.span?.spanCodeObjectId]);
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
    const handleSpanInfoData = (data: any, timeStamp: number) => {
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
