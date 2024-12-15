import type { DataFetcherConfiguration } from "../../../hooks/useFetchData";
import { useFetchData } from "../../../hooks/useFetchData";
import { actions } from "../actions";
import type {
  GetEndpointsIssuesPayload,
  SetEndpointsIssuesPayload
} from "./types";

export const useEndpointsIssuesData = (
  payload: GetEndpointsIssuesPayload,
  isEnabled: boolean
) => {
  const dataFetcherServiceDataConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_ENDPOINTS_ISSUES,
    responseAction: actions.SET_ENDPOINTS_ISSUES,
    refreshOnPayloadChange: true,
    isEnabled
  };

  const { data } = useFetchData<
    GetEndpointsIssuesPayload,
    SetEndpointsIssuesPayload
  >(dataFetcherServiceDataConfiguration, payload);

  return {
    data
  };
};
