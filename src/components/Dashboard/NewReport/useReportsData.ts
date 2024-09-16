import { useEffect, useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { actions } from "../actions";
import { ReportFilterQuery, ServiceDashboardsData } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherIssuesStatsConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_NEW_REPORT_DATA,
  responseAction: actions.SET_NEW_REPORT_DATA,
  ...baseFetchConfig
};

export const useReportsData = (query: ReportFilterQuery) => {
  const payload = useMemo(() => query, [query]);

  const { data, getData } = useFetchData<
    ReportFilterQuery,
    ServiceDashboardsData
  >(dataFetcherIssuesStatsConfiguration, payload);

  useEffect(() => {
    getData();
  }, []);

  return {
    data
  };
};
