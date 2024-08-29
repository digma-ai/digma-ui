import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DigmaMessageError } from "../../../api/types";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../../containers/Main/stores/useInsightsStore";
import { useScopeStore } from "../../../containers/Main/stores/useScopeStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { GetIssuesFiltersPayload } from "../../../types";
import { ViewMode } from "../InsightsCatalog/types";
import { actions as issuesActions } from "./actions";
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
  const environment = useGlobalStore().environment;
  const environmentId = environment?.id;
  const scope = useScopeStore().scope;
  const spanCodeObjectId = scope?.span?.spanCodeObjectId ?? null;
  const search = useInsightsStore.use.search();
  const filters = useInsightsStore.use.filters();
  const filteredInsightTypes = useInsightsStore.use.filteredInsightTypes();
  const viewMode = useInsightsStore.use.viewMode();
  const backendInfo = useGlobalStore().backendInfo;

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

  const refresh = useCallback(() => {
    if (environmentId) {
      getFilters(query);
    }
  }, [query, environmentId]);

  useEffect(() => {
    window.clearTimeout(refreshTimerId.current);
    refresh();
  }, [refresh, scope?.span?.spanCodeObjectId, environmentId, backendInfo]);

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

    dispatcher.addActionListener(
      issuesActions.SET_FILTERS,
      handleIssueFiltersData
    );

    return () => {
      dispatcher.removeActionListener(
        issuesActions.SET_FILTERS,
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
  }, [lastSetDataTimeStamp, previousLastSetDataTimeStamp, refresh]);

  return {
    data,
    refresh
  };
};
