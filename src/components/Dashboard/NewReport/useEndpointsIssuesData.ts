import { useMemo } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { actions } from "../actions";
import {
  GetEndpointsIssuesPayload,
  ReportFilterQuery,
  SetEndpointsIssuesPayload
} from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherServiceDataConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_ENDPOINTS_ISSUES,
  responseAction: actions.SET_ENDPOINTS_ISSUES,
  ...baseFetchConfig
};

export const useEndpointsIssuesData = (query: ReportFilterQuery) => {
  const payload: GetEndpointsIssuesPayload = useMemo(
    () => ({
      environment: query.environmentId ?? "", // TODO: do not send the message if there is no environment
      service: query.services[0],
      endpoints: [], // TODO: add endpoints filter
      criticalities: query.criticalities,
      lastDays: query.lastDays
    }),
    [query]
  );

  const { data, getData } = useFetchData<
    GetEndpointsIssuesPayload,
    SetEndpointsIssuesPayload
  >(dataFetcherServiceDataConfiguration, payload);

  return {
    data,
    getData
  };
};
