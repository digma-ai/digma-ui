import { useEffect, useMemo } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { useMetricsReportSelector } from "../../../../store/metricsReport/useMetricsReportSelector";
import { useStore } from "../../../../store/useStore";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
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
  ReportTimeMode,
  ReportViewMode,
  SetServiceEndpointsPayload,
  SetServiceEnvironmentsPayload
} from "../types";
import * as s from "./styles";
import { GetServicesPayload, HeaderProps } from "./types";

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

const DEFAULT_PERIOD = 7;

export const Header = ({ onGoBack }: HeaderProps) => {
  const { environments, backendInfo } = useConfigSelector();
  const {
    metricsReportSelectedPeriodInDays: periodInDays,
    metricsReportViewLevel: viewLevel,
    metricsReportTimeMode: timeMode,
    metricsReportSelectedServices: selectedServices,
    metricsReportSelectedEndpoints: selectedEndpoints,
    metricsReportSelectedEnvironmentId: selectedEnvironmentId,
    metricsReportSelectedCriticalityLevels: selectedCriticalityLevels,
    metricsReportSelectedService: selectedService,
    metricsReportServiceEnvironments: serviceEnvironments,
    metricsReportViewMode: viewMode
  } = useMetricsReportSelector();

  const {
    setMetricsReportSelectedEnvironmentId: setSelectedEnvironmentId,
    setMetricsReportSelectedServices: setSelectedServices,
    setMetricsReportSelectedEndpoints: setSelectedEndpoints,
    setMetricsReportSelectedCriticalityLevels: setSelectedCriticalityLevels,
    setMetricsReportSelectedPeriodInDays: setPeriodInDays,
    setMetricsReportServiceEnvironments: setServiceEnvironments,
    setMetricsReportServiceEndpoints: setServiceEndpoints,
    setMetricsReportViewMode: setViewMode,
    setMetricsReportTimeMode: setTimeMode,
    setMetricsReportServices: setServices,
    setMetricsReportServicesIssuesData: setServicesIssuesData,
    setMetricsReportEndpointsIssuesData: setEndpointIssuesData
  } = useStore.getState();

  const environmentsToSelect = useMemo(
    () => (viewLevel === "services" ? environments : serviceEnvironments) ?? [],
    [viewLevel, environments, serviceEnvironments]
  );

  const selectedEnvironment = useMemo(
    () =>
      environmentsToSelect?.find((x) => x.id === selectedEnvironmentId) ?? null,
    [selectedEnvironmentId, environmentsToSelect]
  );

  const isDataFilterEnabled = Boolean(
    getFeatureFlagValue(
      backendInfo,
      FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
    )
  );

  const dataFetcherServicesConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICES,
    responseAction: actions.SET_SERVICES,
    refreshOnPayloadChange: true,
    isEnabled: Boolean(selectedEnvironmentId && viewLevel === "services")
  };

  const getServicesPayload: GetServicesPayload = useMemo(
    () => ({ environment: selectedEnvironmentId ?? null }),
    [selectedEnvironmentId]
  );

  const { data: services } = useFetchData<GetServicesPayload, string[]>(
    dataFetcherServicesConfiguration,
    getServicesPayload
  );

  useEffect(() => {
    if (services) {
      setServices(services);
    }
  }, [services, setServices]);

  const dataFetcherEnvironmentsConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICE_ENVIRONMENTS,
    responseAction: actions.SET_SERVICE_ENVIRONMENTS,
    refreshOnPayloadChange: true,
    isEnabled: Boolean(
      selectedEnvironmentId && selectedService && viewLevel === "endpoints"
    )
  };

  const getEnvironmentsPayload: GetServiceEnvironmentsPayload = useMemo(
    () => ({
      service: selectedService ?? ""
    }),
    [selectedService]
  );

  const { data: serviceEnvironmentsData } = useFetchData<
    GetServiceEnvironmentsPayload,
    SetServiceEnvironmentsPayload
  >(dataFetcherEnvironmentsConfiguration, getEnvironmentsPayload);

  const dataFetcherEndpointsConfiguration: DataFetcherConfiguration = {
    requestAction: actions.GET_SERVICE_ENDPOINTS_DATA,
    responseAction: actions.SET_SERVICE_ENDPOINTS_DATA,
    refreshOnPayloadChange: true,
    isEnabled: Boolean(selectedEnvironmentId && selectedService)
  };

  useEffect(() => {
    if (serviceEnvironmentsData?.environments) {
      setServiceEnvironments(serviceEnvironmentsData?.environments);
    }
  }, [serviceEnvironmentsData, setServiceEnvironments]);

  const getEndpointsPayload: GetServiceEndpointsPayload = useMemo(
    () => ({
      environment: selectedEnvironmentId ?? "",
      service: selectedService ?? ""
    }),
    [selectedEnvironmentId, selectedService]
  );

  const { data: endpointsData } = useFetchData<
    GetServiceEndpointsPayload,
    SetServiceEndpointsPayload
  >(dataFetcherEndpointsConfiguration, getEndpointsPayload);

  useEffect(() => {
    if (endpointsData?.endpoints) {
      setServiceEndpoints(endpointsData.endpoints);
    }
  }, [endpointsData, setServiceEndpoints]);

  const handleGoBack = () => {
    onGoBack();
  };

  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option[0] : option;
    setSelectedEnvironmentId(newItem);
    setSelectedServices([]);
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
    setSelectedCriticalityLevels(newItem as Criticality[]);
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
    const newViewMode = value as ReportViewMode;
    setViewMode(newViewMode);
  };

  const handleTimeModeChanged = (value: string) => {
    sendUserActionTrackingEvent(trackingEvents.TIME_MODE_CHANGED, { value });
    const newTimeMode = value as ReportTimeMode;
    setTimeMode(newTimeMode);
    if (viewLevel === "services") {
      setServicesIssuesData(null);
    }
    if (viewLevel === "endpoints") {
      setEndpointIssuesData(null);
    }
  };

  const title =
    viewLevel === "endpoints"
      ? `${selectedService ?? ""} Service`
      : "Services with Issues map";
  const titleSuffix = viewLevel === "endpoints" ? " Endpoints" : "";
  const tooltipTitle = `${title} ${titleSuffix}`;

  return (
    <s.Container>
      <s.Row>
        <s.TitleContainer>
          {viewLevel === "endpoints" ? (
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
          <s.FilterSelect
            items={environmentsToSelect
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((x) => ({
                label: x.name,
                value: x.id,
                enabled: true,
                selected: x.id === selectedEnvironmentId
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
            disabled={environmentsToSelect.length === 0}
          />
          {viewLevel === "endpoints" ? (
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
              disabled={!endpointsData || endpointsData.endpoints.length === 0}
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
              disabled={!services || services.length === 0}
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
              items={criticalityOptions.map((item) => ({
                label: item.label,
                value: item.id,
                enabled: true,
                selected: selectedCriticalityLevels.includes(item.id)
              }))}
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
