import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { ConfigContext } from "../../common/App/ConfigContext";
import { GetHighlightsPerformanceDataPayload, PerformanceData } from "./types";
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const usePerformanceData = () => {
  const [data, setData] = useState<PerformanceData>();
  const config = useContext(ConfigContext);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    window.sendMessageToDigma<GetHighlightsPerformanceDataPayload>({
      action: mainActions.GET_HIGHLIGHTS_PERFORMANCE_DATA,
      payload: {
        query: {
          scopedSpanCodeObjectId: config.scope?.span?.spanCodeObjectId || null,
          environments:
            config.environments?.map((env) => env.originalName) || []
        }
      }
    });
  }, [config.scope?.span?.spanCodeObjectId, config.environments]);
  const previousGetData = usePrevious(getData);

  useEffect(() => {
    if (previousGetData && previousGetData !== getData) {
      window.clearTimeout(refreshTimerId.current);

      getData();
    }
  }, [previousGetData, getData]);

  useEffect(() => {
    if (
      previousLastSetDataTimeStamp &&
      previousLastSetDataTimeStamp !== lastSetDataTimeStamp
    ) {
      refreshTimerId.current = window.setTimeout(() => {
        getData();
      }, REFRESH_INTERVAL);
    }
  }, [previousLastSetDataTimeStamp, lastSetDataTimeStamp, getData]);

  useEffect(() => {
    const handlePerformanceData = (data: any, timeStamp: number) => {
      setData(data as PerformanceData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_PERFORMANCE_DATA,
      handlePerformanceData
    );

    return () => {
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_PERFORMANCE_DATA,
        handlePerformanceData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
