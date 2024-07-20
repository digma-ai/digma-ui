import { useEffect, useMemo, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions, actions as issuesActions } from "./actions";

import { useGlobalStore } from "../../../containers/Main/stores/globalStore";
import { GetIssuesFiltersPayload } from "../../../types";
import { IssuesFiltersData } from "./IssuesFilter/types";
import { IssuesQuery } from "./types";

interface UseIssuesFiltersProps {
  refreshInterval: number;
  query: IssuesQuery;
}

const getData = (query: IssuesQuery) => {
  window.sendMessageToDigma<GetIssuesFiltersPayload>({
    action: issuesActions.GET_FILTERS,
    payload: {
      query: query
    }
  });
};

export const useIssuesFilters = ({
  refreshInterval,
  query
}: UseIssuesFiltersProps) => {
  const [data, setData] = useState<IssuesFiltersData>({
    issueTypeFilters: []
  });
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();

  const scopedQuery = useMemo(
    () => ({
      ...query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId ?? null
    }),
    [query, scope]
  );

  const refresh = () => getData(scopedQuery);

  useEffect(() => {
    getData(scopedQuery);

    const handleIssueFiltersData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        const insightsData = data as IssuesFiltersData;
        setData(insightsData);
      }

      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_FILTERS, handleIssueFiltersData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_FILTERS,
        handleIssueFiltersData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, [scopedQuery]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(scopedQuery);
      }, refreshInterval);
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    environment,
    scopedQuery,
    refreshInterval
  ]);

  useEffect(() => {
    getData(scopedQuery);
  }, [scopedQuery, scope?.span?.spanCodeObjectId, environment?.id]);

  return {
    data,
    refresh
  };
};
