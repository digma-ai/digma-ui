import { useEffect, useMemo, useRef, useState } from "react";
import { actions as globalActions } from "../../actions";
import { DigmaMessageError } from "../../api/types";
import { useGlobalStore } from "../../containers/Main/stores/globalStore";
import { dispatcher } from "../../dispatcher";
import { getFeatureFlagValue } from "../../featureFlags";
import { usePrevious } from "../../hooks/usePrevious";
import {
  FeatureFlag,
  GetInsightStatsPayload,
  GetIssuesPayload
} from "../../types";
import {
  InsightsQuery as InsightsDataQuery,
  PersistedState
} from "../common/App/types";
import { IssuesFilterQuery } from "./Issues/IssuesFilter/types";
import { actions as issuesActions } from "./Issues/actions";
import { GetIssuesQuery } from "./Issues/types";
import { actions } from "./actions";
import {
  InsightsData,
  InsightsQuery,
  InsightsStatus,
  ScopedInsightsQuery,
  ViewMode
} from "./types";

interface UseInsightDataProps {
  refreshInterval: number;
  query: InsightsQuery;
  filters?: IssuesFilterQuery;
}

const getIssues = (query: GetIssuesQuery) => {
  window.sendMessageToDigma<GetIssuesPayload>({
    action: issuesActions.GET_DATA_LIST,
    payload: {
      query: query
    }
  });
};

const getData = (
  scopedQuery: ScopedInsightsQuery,
  areIssuesFiltersEnabled: boolean,
  state: PersistedState | null
) => {
  const getDataQuery: InsightsDataQuery = {
    displayName: scopedQuery.searchQuery,
    sortBy: scopedQuery.sorting.criterion,
    sortOrder: scopedQuery.sorting.order,
    page: scopedQuery.page,
    scopedSpanCodeObjectId: scopedQuery.scopedSpanCodeObjectId,
    showDismissed: scopedQuery.showDismissed,
    insightViewType: scopedQuery.insightViewType,
    showUnreadOnly: scopedQuery.showUnreadOnly,
    filters: scopedQuery.filters
  };

  if (scopedQuery.insightViewType === "Issues" && areIssuesFiltersEnabled) {
    getIssues({
      filters: scopedQuery.filters,
      page: scopedQuery.page,
      showDismissed: scopedQuery.showDismissed,
      sorting: scopedQuery.sorting,
      scopedSpanCodeObjectId: scopedQuery.scopedSpanCodeObjectId,
      displayName: scopedQuery.searchQuery,
      insightTypes: scopedQuery.insightTypes
    });
  } else {
    window.sendMessageToDigma({
      action: actions.GET_DATA_LIST,
      payload: {
        query: getDataQuery
      }
    });
  }

  const globalStateSlice =
    scopedQuery.insightViewType === "Analytics" ? "analytics" : "insights";

  window.sendMessageToDigma<PersistedState>({
    action: globalActions.UPDATE_STATE,
    payload: {
      ...state,
      [globalStateSlice]: {
        ...state?.[globalStateSlice],
        query: getDataQuery
      }
    }
  });
};

const getStats = (query: ScopedInsightsQuery) => {
  window.sendMessageToDigma<GetInsightStatsPayload>({
    action: globalActions.GET_INSIGHT_STATS,
    payload: {
      scope: query?.scopedSpanCodeObjectId
        ? {
            span: {
              spanCodeObjectId: query?.scopedSpanCodeObjectId
            }
          }
        : null,
      filters: {
        insights: query.insightTypes
      }
    }
  });
};

export const useInsightsData = ({
  refreshInterval,
  query,
  filters
}: UseInsightDataProps) => {
  const [data, setData] = useState<InsightsData>({
    insightsStatus: InsightsStatus.LOADING,
    insights: [],
    viewMode: ViewMode.INSIGHTS,
    totalCount: 0
  });
  const previousData = usePrevious(data);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();
  const backendInfo = useGlobalStore.use.backendInfo();
  const scope = useGlobalStore.use.scope();
  const environment = useGlobalStore.use.environment();
  const persistedState = useGlobalStore.use.persistedState();

  const scopedQuery: ScopedInsightsQuery = useMemo(
    () => ({
      ...query,
      scopedSpanCodeObjectId: scope?.span?.spanCodeObjectId ?? null,
      insightTypes: filters?.issueTypes
    }),
    [query, scope, filters]
  );

  const areNewIssuesFiltersEnabled = useMemo(
    () =>
      Boolean(
        getFeatureFlagValue(backendInfo, FeatureFlag.ARE_ISSUES_FILTERS_ENABLED)
      ),
    [backendInfo]
  );

  useEffect(() => {
    getData(scopedQuery, areNewIssuesFiltersEnabled, persistedState);

    setIsInitialLoading(true);
    setIsLoading(true);
    const handleInsightsData = (
      data: unknown,
      timeStamp: number,
      error: DigmaMessageError | undefined
    ) => {
      if (!error) {
        const insightsData = data as InsightsData;
        insightsData.insightsStatus = InsightsStatus.DEFAULT;
        insightsData.viewMode = ViewMode.INSIGHTS;

        setData(insightsData);
      }
      setIsLoading(false);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA_LIST, handleInsightsData);

    dispatcher.addActionListener(
      issuesActions.SET_DATA_LIST,
      handleInsightsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA_LIST,
        handleInsightsData
      );
      dispatcher.removeActionListener(
        issuesActions.SET_DATA_LIST,
        handleInsightsData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(scopedQuery, areNewIssuesFiltersEnabled, persistedState);
        getStats(scopedQuery);
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
    refreshInterval,
    areNewIssuesFiltersEnabled
  ]);

  useEffect(() => {
    getData(scopedQuery, areNewIssuesFiltersEnabled, persistedState);
    getStats(scopedQuery);
    setIsLoading(true);
  }, [
    scopedQuery,
    areNewIssuesFiltersEnabled,
    scope?.span?.spanCodeObjectId,
    environment?.id
  ]);

  return {
    isInitialLoading,
    data,
    isLoading,
    refresh: () => {
      getData(scopedQuery, areNewIssuesFiltersEnabled, persistedState);
      getStats(scopedQuery);
    }
  };
};
