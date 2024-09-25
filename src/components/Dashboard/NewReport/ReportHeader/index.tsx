import { useEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Environment } from "../../../common/App/types";
import { CodeIcon } from "../../../common/icons/12px/CodeIcon";
import { DurationBreakdownIcon } from "../../../common/icons/12px/DurationBreakdownIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { InfinityIcon } from "../../../common/icons/16px/InfinityIcon";
import { TableIcon } from "../../../common/icons/16px/TableIcon";
import { TreemapIcon } from "../../../common/icons/16px/TreemapIcon";
import { ChevronIcon } from "../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { actions } from "../../actions";
import { trackingEvents } from "../tracking";
import {
  Criticality,
  GetServiceEndpointsPayload,
  GetServiceEnvironmentsPayload,
  GetServicesPayload,
  SetServiceEndpointsPayload,
  SetServiceEnvironmentsPayload
} from "../types";
import * as s from "./styles";
import { ReportHeaderProps, ReportTimeMode, ReportViewMode } from "./types";
import { useReportQuery } from "./useReportQuery";
import { useReportQueryV2 } from "./useReportQueryV2";

const criticalityOptions: { id: Criticality; label: string }[] = [
  {
    id: "High",
    label: "Critical"
  },
  {
    id: "Medium",
    label: "Medium"
  },
  {
    id: "Low",
    label: "Low"
  }
];

export const formatUnit = (value: number, unit: string) =>
  value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;

const DEFAULT_PERIOD = 1;

export const ReportHeader = ({
  onFilterChanged,
  onViewModeChanged,
  service,
  onGoBack,
  viewMode
}: ReportHeaderProps) => {
  const { environments, backendInfo } = useConfigSelector();
  const [periodInDays, setPeriodInDays] = useState(DEFAULT_PERIOD);
  const [timeMode, setTimeMode] = useState<ReportTimeMode>("baseline");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null);
  const [selectedCriticality, setSelectedCriticality] = useState<Criticality[]>(
    ["Medium", "High"]
  );
  const [servicesFromStore, setServicesFromStore] = useState<string[]>([]);

  const isDataFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
  );

  const getServicesPayload: GetServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment?.id ?? null }),
    [selectedEnvironment]
  );

  const dataFetcherServicesConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICES,
    responseAction: actions.SET_SERVICES,
    refreshOnPayloadChange: !service
  };

  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherServicesConfiguration, getServicesPayload);

  const dataFetcherEnvironmentsConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICE_ENVIRONMENTS,
    responseAction: actions.SET_SERVICE_ENVIRONMENTS,
    refreshOnPayloadChange: Boolean(selectedEnvironment?.id && service)
  };

  const getEnvironmentsPayload: GetServiceEnvironmentsPayload = useMemo(
    () => ({
      service: service ?? ""
    }),
    [service]
  );

  const { data: serviceEnvironmentsData, getData: getServiceEnvironmentsData } =
    useFetchData<GetServiceEnvironmentsPayload, SetServiceEnvironmentsPayload>(
      dataFetcherEnvironmentsConfiguration,
      getEnvironmentsPayload
    );

  useEffect(() => {
    getServiceEnvironmentsData();
  }, [getServiceEnvironmentsData]);

  const dataFetcherEndpointsConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICE_ENDPOINTS_DATA,
    responseAction: actions.SET_SERVICE_ENDPOINTS_DATA,
    refreshOnPayloadChange: Boolean(selectedEnvironment?.id && service)
  };

  const getEndpointsPayload: GetServiceEndpointsPayload = useMemo(
    () => ({
      environment: selectedEnvironment?.id ?? "",
      service: service ?? ""
    }),
    [selectedEnvironment, service]
  );

  const { data: endpointsData, getData: getEndpointsData } = useFetchData<
    GetServiceEndpointsPayload,
    SetServiceEndpointsPayload
  >(dataFetcherEndpointsConfiguration, getEndpointsPayload);

  useEffect(() => {
    setServicesFromStore(services ?? []);
  }, [services, setServicesFromStore]);

  const { filterQuery } = useReportQuery({
    selectedEnvironment,
    selectedServices,
    timeMode,
    periodInDays,
    services: servicesFromStore
  });

  const { filterQuery: filterQueryV2 } = useReportQueryV2({
    selectedEnvironment,
    selectedCriticality,
    selectedServices,
    timeMode,
    periodInDays,
    selectedEndpoints
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getEndpointsData();
  }, [getEndpointsData]);

  useEffect(() => {
    if (isDataFilterEnabled) {
      return;
    }

    if (!filterQuery.environmentId) {
      return;
    }

    onFilterChanged(filterQuery);
  }, [onFilterChanged, filterQuery, isDataFilterEnabled]);

  useEffect(() => {
    if (!isDataFilterEnabled) {
      return;
    }

    if (!filterQueryV2.environmentId) {
      return;
    }

    onFilterChanged(filterQueryV2);
  }, [onFilterChanged, filterQueryV2, isDataFilterEnabled]);

  useEffect(() => {
    setSelectedEnvironment(
      environments?.length && environments?.length > 0 ? environments[0] : null
    );
    setServicesFromStore([]);
  }, [environments]);

  const handleGoBack = () => {
    onGoBack();
  };

  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_FILTER_SELECTED);
    const newItem =
      option === selectedEnvironment?.id
        ? [""]
        : Array.isArray(option)
        ? option
        : [option];

    const newItemEnv = environments?.find((x) => x.id === newItem[0]) ?? null;
    setSelectedEnvironment(newItemEnv);
    setSelectedServices([]);
    setServicesFromStore([]);
    setSelectedEndpoints([]);
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.SERVICE_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
  };

  const handleSelectedEndpointsChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENDPOINT_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedEndpoints(newItem);
  };

  const handleDataChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.DATA_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedCriticality(newItem as Criticality[]);
  };

  const handlePeriodChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.PERIOD_FILTER_CHANGED);
    const newItem = Array.isArray(option) ? option : [option];
    if (newItem.length === 0) {
      setPeriodInDays(DEFAULT_PERIOD);
      return;
    }

    const value = newItem[0];
    const newValue = Number(value);
    setPeriodInDays(newValue);
  };

  const handleViewModeChanged = (value: string) => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_MODE_CHANGED, { value });
    const newMode = value as ReportViewMode;
    onViewModeChanged(newMode);
  };

  const handleTimeModeChanged = (value: string) => {
    sendUserActionTrackingEvent(trackingEvents.TIME_MODE_CHANGED, { value });
    const newMode = value as ReportTimeMode;
    setTimeMode(newMode);
  };

  const environmentsToSelect = service
    ? serviceEnvironmentsData?.environments ?? []
    : environments ?? [];

  const title = service
    ? `${service} Service`
    : "Services with critical issues";
  const titleSuffix = service ? " Endpoints" : "";
  const tooltipTitle = `${title} ${titleSuffix}`;

  return (
    <s.Container>
      <s.Row>
        <s.TitleContainer>
          {service ? (
            <>
              <NewIconButton
                icon={(props) => (
                  <ChevronIcon {...props} direction={Direction.LEFT} />
                )}
                size={"small"}
                buttonType={"secondaryBorderless"}
                onClick={handleGoBack}
              />
              <Tooltip title={tooltipTitle}>
                <s.Title>
                  {title}
                  <s.TitleSuffix>{titleSuffix}</s.TitleSuffix>
                </s.Title>
              </Tooltip>
            </>
          ) : (
            <s.Title>{title}</s.Title>
          )}
        </s.TitleContainer>
        <s.TimeModeToggle
          options={[
            { value: "baseline", label: "Baseline" },
            { value: "changes", label: "Changes" }
          ]}
          value={timeMode}
          onValueChange={handleTimeModeChanged}
        />
      </s.Row>
      <s.Row>
        <s.Filters>
          <s.EnvironmentFilter
            items={environmentsToSelect
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((x) => ({
                label: x.name,
                value: x.id,
                enabled: true,
                selected: x.id === selectedEnvironment?.id
              }))}
            showSelectedState={true}
            icon={(props) =>
              selectedEnvironment?.type === "Public" ? (
                <InfinityIcon {...props} size={12} />
              ) : (
                <CodeIcon {...props} size={12} />
              )
            }
            onChange={handleSelectedEnvironmentChanged}
            placeholder={selectedEnvironment?.name ?? "Select Environments"}
          />
          {service ? (
            <s.FilterSelect
              items={
                endpointsData?.endpoints?.sort()?.map((x) => ({
                  label: x.displayName,
                  value: x.spanCodeObjectId,
                  enabled: true,
                  selected: selectedEndpoints.includes(x.spanCodeObjectId)
                })) ?? []
              }
              showSelectedState={true}
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleSelectedEndpointsChanged}
              searchable={true}
              placeholder={
                selectedEndpoints.length > 0 ? "Endpoints" : "All Endpoints"
              }
            />
          ) : (
            <s.FilterSelect
              items={
                services?.sort()?.map((service) => ({
                  label: service,
                  value: service,
                  enabled: true,
                  selected: selectedServices.includes(service)
                })) ?? []
              }
              showSelectedState={true}
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleSelectedServicesChanged}
              placeholder={
                selectedServices.length > 0 ? "Services" : "All Services"
              }
            />
          )}
          {timeMode === "changes" && (
            <s.FilterSelect
              items={[1, 7].map((x) => ({
                value: x.toString(),
                label: formatUnit(x, "Day"),
                selected: x === periodInDays,
                enabled: true
              }))}
              showSelectedState={false}
              icon={DurationBreakdownIcon}
              onChange={handlePeriodChanged}
              placeholder={`Period: ${formatUnit(periodInDays, "day")}`}
            />
          )}
          {isDataFilterEnabled && (
            <s.FilterSelect
              items={
                criticalityOptions.map((item) => ({
                  label: item.label,
                  value: item.id,
                  enabled: true,
                  selected: selectedCriticality.includes(item.id)
                })) ?? []
              }
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleDataChanged}
              placeholder={"Data"}
            />
          )}
        </s.Filters>
        <s.ViewModeToggle
          size="large"
          options={[
            {
              value: "treemap",
              icon: (props) => <TreemapIcon {...props} size={16} />
            },
            {
              value: "table",
              icon: (props) => <TableIcon {...props} size={16} />
            }
          ]}
          value={viewMode}
          onValueChange={handleViewModeChanged}
        />
      </s.Row>
    </s.Container>
  );
};
