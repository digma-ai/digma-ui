import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { GetHighlightsImpactDataPayload, ImpactData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useImpactData = () => {
  const [data, setData] = useState<ImpactData>();
  const scope = useGlobalStore.use.scope();
  const environments = useGlobalStore.use.environments();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    if (
      scope?.span?.spanCodeObjectId &&
      environments &&
      environments.length > 0
    ) {
      window.sendMessageToDigma<GetHighlightsImpactDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_IMPACT_DATA,
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
