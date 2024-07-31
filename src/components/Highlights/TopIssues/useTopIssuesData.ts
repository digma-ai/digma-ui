import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { GetHighlightsTopIssuesDataPayload } from "../../Main/types";
import { TopIssuesData } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useTopIssuesData = () => {
  const [data, setData] = useState<TopIssuesData>();
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
      window.sendMessageToDigma<GetHighlightsTopIssuesDataPayload>({
        action: mainActions.GET_HIGHLIGHTS_TOP_ISSUES_DATA,
        payload: {
          query: {
            scopedCodeObjectId: scope?.span?.spanCodeObjectId,
            environments: environments?.map((env) => env.id)
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
    const handleTopIssuesData = (data: unknown, timeStamp: number) => {
      setData(data as TopIssuesData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
      handleTopIssuesData
    );

    return () => {
      window.clearTimeout(refreshTimerId.current);
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
        handleTopIssuesData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
