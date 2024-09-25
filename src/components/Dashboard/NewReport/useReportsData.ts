import { useEffect, useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { actions } from "../actions";
import { ReportFilterQuery, ReportQuery, ServiceMetricsReport } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherServiceDataConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_METRICS_REPORT_DATA,
  responseAction: actions.SET_METRICS_REPORT_DATA,
  ...baseFetchConfig
};

export const useReportsData = (query: ReportFilterQuery) => {
  const payload = useMemo(() => {
    if (!(query.services?.length > 0)) {
      return {
        criticalities: query.criticalities,
        keys: [
          {
            environment: query.environmentId,
            service: null,
            lastDays: query.lastDays
          }
        ]
      };
    }

    return {
      criticalities: query.criticalities,
      keys: query.services.map((x) => ({
        environment: query.environmentId,
        service: x,
        lastDays: query.lastDays
      }))
    };
  }, [query]);

  const { data, getData } = useFetchData<ReportQuery, ServiceMetricsReport>(
    dataFetcherServiceDataConfiguration,
    payload
  );

  useEffect(() => {
    getData();
  }, []);

  return {
    data
  };
};
