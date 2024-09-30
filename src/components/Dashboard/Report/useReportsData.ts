import { useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { actions } from "../actions";
import {
  DiscoveredAssetsStatistics,
  DiscoveredIssuesStatistics,
  ReportFilterQuery
} from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherIssuesStatsConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_REPORT_ISSUES_STATS,
  responseAction: actions.SET_REPORT_ISSUES_STATS,
  ...baseFetchConfig
};

const dataFetcherAssetsStatsConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_REPORT_ASSETS_STATS,
  responseAction: actions.SET_REPORT_ASSETS_STATS,
  ...baseFetchConfig
};

export const useReportsData = (query: ReportFilterQuery) => {
  const payload = useMemo(() => query, [query]);

  const { data: discoveredIssues, getData: getDiscoveredIssues } = useFetchData<
    ReportFilterQuery,
    DiscoveredIssuesStatistics
  >(dataFetcherIssuesStatsConfiguration, payload);

  const { data: discoveredAssets, getData: getDiscoveredAssets } = useFetchData<
    ReportFilterQuery,
    DiscoveredAssetsStatistics
  >(dataFetcherAssetsStatsConfiguration, payload);

  return {
    discoveredIssues: discoveredIssues,
    discoveredAssets: discoveredAssets,
    refresh: () => {
      getDiscoveredIssues();
      getDiscoveredAssets();
    }
  };
};
