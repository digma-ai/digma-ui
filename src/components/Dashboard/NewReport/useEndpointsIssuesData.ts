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

export const useEndpointsIssuesData = (
  query: ReportFilterQuery,
  isEnabled: boolean
) => {
  const dataFetcherServiceDataConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_ENDPOINTS_ISSUES,
    responseAction: actions.SET_ENDPOINTS_ISSUES,
    refreshOnPayloadChange: isEnabled
  };

  const payload: GetEndpointsIssuesPayload = useMemo(
    () => ({
      environment: query.environmentId ?? "",
      service: query.services[0],
      endpoints: query.endpoints ?? [],
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
