import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { ConfigContext } from "../../common/App/ConfigContext";
import { GetIssuesQuery } from "../types";
import { actions, actions as issuesActions } from "./actions";

import { GetIssuesFiltersPayload } from "../../../types";
import { IssueFiltersData } from "./types";

interface UseIssuesFiltersProps {
  refreshInterval: number;
  query: GetIssuesQuery;
}

const getData = (query: GetIssuesQuery) => {
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
  const [data, setData] = useState<IssueFiltersData>({
    issueTypeFilters: []
  });
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const config = useContext(ConfigContext);
  const { scope, environment } = config;

  const scopedQuery = useMemo(
    () => ({
      ...query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId ?? null
    }),
    [query, scope]
  );

  useEffect(() => {
    getData(scopedQuery);

    setIsInitialLoading(true);
    setIsLoading(true);
    const handleIssueFiltersData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        const insightsData = data as IssueFiltersData;
        setData(insightsData);
      }

      setIsLoading(false);
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
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

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
    setIsLoading(true);
  }, [scopedQuery, scope?.span?.spanCodeObjectId, environment?.id]);

  return {
    isInitialLoading,
    data,
    isLoading
  };
};
