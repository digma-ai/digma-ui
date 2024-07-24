import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions, actions as issuesActions } from "./actions";

import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../../containers/Main/stores/useInsightsStore";
import { GetIssuesFiltersPayload } from "../../../types";
import { ViewMode } from "../InsightsCatalog/types";
import { IssuesFiltersData } from "./IssuesFilter/types";
import { GetIssuesFiltersQuery } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const getFilters = (query: GetIssuesFiltersQuery) => {
  window.sendMessageToDigma<GetIssuesFiltersPayload>({
    action: issuesActions.GET_FILTERS,
    payload: {
      query
    }
  });
};

export const useIssuesFilters = () => {
  const data = useInsightsStore.use.issuesFilters();
  const setData = useInsightsStore.use.setIssuesFilters();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
  const search = useInsightsStore.use.search();
  const filters = useInsightsStore.use.filters();
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const viewMode = useInsightsStore.use.viewMode();

  const query: GetIssuesFiltersQuery = useMemo(
    () => ({
      displayName: search,
      filters,
      insightTypes: filteredInsightTypes,
      showDismissed: viewMode === ViewMode.OnlyDismissed,
      scopedSpanCodeObjectId: spanCodeObjectId
    }),
    [search, filters, filteredInsightTypes, viewMode, spanCodeObjectId]
  );

  const refresh = useCallback(() => getFilters(query), [query]);

  useEffect(() => {
    window.clearTimeout(refreshTimerId.current);
    refresh();
  }, [refresh, scope?.span?.spanCodeObjectId, environment?.id]);

  useEffect(() => {
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
  }, [setData]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        refresh();
      }, REFRESH_INTERVAL);
    }

    return () => {
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    environment,
    refresh
  ]);

  return {
    data,
    refresh
  };
};
