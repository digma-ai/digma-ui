import { useCallback, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { actions as mainActions } from "../../Main/actions";
import type {
  GetHighlightsPerformanceDataPayload,
  PerformanceData
} from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const usePerformanceData = () => {
  const [data, setData] = useState<PerformanceData>();
  const { scope, environments } = useConfigSelector();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    if (
      scope?.span?.spanCodeObjectId &&
      environments &&
      environments.length > 0
    ) {
      window.sendMessageToDigma<GetHighlightsPerformanceDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_PERFORMANCE_DATA,
        payload: {
          query: {
            scopedSpanCodeObjectId: scope.span.spanCodeObjectId,
            environments: environments.map((x) => x.id)
          }
        }
      });
    }
  }, [scope?.span?.spanCodeObjectId, environments]);
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
    const handlePerformanceData = (data: unknown, timeStamp: number) => {
      setData(data as PerformanceData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_PERFORMANCE_DATA,
      handlePerformanceData
    );

    return () => {
      window.clearTimeout(refreshTimerId.current);
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
