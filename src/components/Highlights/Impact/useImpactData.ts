import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { ConfigContext } from "../../common/App/ConfigContext";
import { GetHighlightsImpactDataPayload, ImpactData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useImpactData = () => {
  const [data, setData] = useState<ImpactData>();
  const config = useContext(ConfigContext);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    if (
      config.scope?.span?.spanCodeObjectId &&
      config.environments &&
      config.environments.length > 0
    ) {
      window.sendMessageToDigma<GetHighlightsImpactDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_IMPACT_DATA,
        payload: {
          query: {
            scopedSpanCodeObjectId: config.scope.span.spanCodeObjectId,
            environments: config.environments.map((x) => x.id)
          }
        }
      });
    }
  }, [config.scope?.span?.spanCodeObjectId, config.environments]);
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
    const handleImpactData = (data: unknown, timeStamp: number) => {
      setData(data as ImpactData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_IMPACT_DATA,
      handleImpactData
    );

    return () => {
      window.clearTimeout(refreshTimerId.current);
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_IMPACT_DATA,
        handleImpactData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
