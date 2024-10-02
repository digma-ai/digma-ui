import { useMemo } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../hooks/useFetchData";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../types";
import { actions } from "../actions";
import {
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  SetMetricsReportDataPayload,
  UseServicesIssuesDataProps
} from "./types";

export const useServicesIssuesData = (
  {
    services,
    environmentId,
    criticalities,
    lastDays
  }: UseServicesIssuesDataProps,
  isEnabled: boolean
) => {
  const { backendInfo } = useConfigSelector();
  const isDataFilterEnabled = Boolean(
    getFeatureFlagValue(
      backendInfo,
      FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
    )
  );

  const dataFetcherServiceDataConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_METRICS_REPORT_DATA,
    responseAction: actions.SET_METRICS_REPORT_DATA,
    refreshOnPayloadChange: true,
    isEnabled
  };

  const payloadV1: GetMetricsReportDataPayloadV1 = useMemo(() => {
    return {
      keys: services.map((x) => ({
        environment: environmentId ?? "",
        service: x,
        lastDays
      }))
    };
  }, [services, environmentId, lastDays]);

  const payloadV2: GetMetricsReportDataPayloadV2 = useMemo(() => {
    const servicesArray = services.length > 0 ? services : [null];

    return {
      criticalities,
      keys: servicesArray.map((x) => ({
        environment: environmentId ?? "",
        service: x,
        lastDays: lastDays
      }))
    };
  }, [services, environmentId, criticalities, lastDays]);

  const payload = isDataFilterEnabled ? payloadV2 : payloadV1;

  const { data } = useFetchData<
    GetMetricsReportDataPayloadV1 | GetMetricsReportDataPayloadV2,
    SetMetricsReportDataPayload
  >(dataFetcherServiceDataConfiguration, payload);

  return {
    data
  };
};
