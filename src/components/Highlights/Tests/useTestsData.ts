import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { ConfigContext } from "../../common/App/ConfigContext";
import { GetHighlightsTestsDataPayload, TestsData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useTestsData = () => {
  const [data, setData] = useState<TestsData>();
  const config = useContext(ConfigContext);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    window.sendMessageToDigma<GetHighlightsTestsDataPayload>({
      action: mainActions.GET_HIGHLIGHTS_TESTS_DATA,
      payload: {
        query: {
          scopedSpanCodeObjectId: config.scope?.span?.spanCodeObjectId || null,
          environments: config.environments?.map((x) => x.id) || []
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
    const handleTestsData = (data: any, timeStamp: number) => {
      setData(data as TestsData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_TESTS_DATA,
      handleTestsData
    );

    return () => {
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_TESTS_DATA,
        handleTestsData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
