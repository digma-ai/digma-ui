import { useMemo } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../../../../featureFlags";
import {
  useGetAboutQuery,
  useGetEnvironmentServicesQuery,
  useGetEnvironmentsQuery,
  useGetServiceEndpointsQuery,
  useGetServiceEnvironmentsQuery
} from "../../../../../redux/services/digma";
import {
  setCriticalityLevels,
  setPeriodInDays,
  setSelectedEndpoints,
  setSelectedEnvironmentId,
  setSelectedServices,
  setTimeMode,
  setViewMode
} from "../../../../../redux/slices/codeIssuesReportSlice";
import { FeatureFlag } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../../../utils/formatUnit";
import { CodeIcon } from "../../../../common/icons/12px/CodeIcon";
import { DurationBreakdownIcon } from "../../../../common/icons/12px/DurationBreakdownIcon";
import { WrenchIcon } from "../../../../common/icons/12px/WrenchIcon";
import { InfinityIcon } from "../../../../common/icons/16px/InfinityIcon";
import { TableIcon } from "../../../../common/icons/16px/TableIcon";
import { TreemapIcon } from "../../../../common/icons/16px/TreemapIcon";
import { ChevronIcon } from "../../../../common/icons/20px/ChevronIcon";
import { DatabaseIcon } from "../../../../common/icons/DatabaseIcon";
import { Direction } from "../../../../common/icons/types";
import type { ToggleValue } from "../../../../common/Toggle/types";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../../Dashboard/MetricsReport/tracking";
import type {
  Criticality,
  ReportTimeMode,
  ReportViewMode
} from "../../../../Dashboard/MetricsReport/types";
import * as s from "./styles";
import type { HeaderProps } from "./types";

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

const DEFAULT_PERIOD = 7;

export const Header = ({ onGoBack }: HeaderProps) => {
  // TODO: create selectors
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const selectedCriticalityLevels = useAdminSelector(
    (state) => state.codeIssuesReport.criticalityLevels
  );
  const periodInDays = useAdminSelector(
    (state) => state.codeIssuesReport.periodInDays
  );
  const selectedService = useAdminSelector(
    (state) => state.codeIssuesReport.selectedService
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const viewLevel = useAdminSelector(
    (state) => state.codeIssuesReport.viewLevel
  );
  const viewMode = useAdminSelector((state) => state.codeIssuesReport.viewMode);
  const timeMode = useAdminSelector((state) => state.codeIssuesReport.timeMode);
  const selectedEndpoints = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEndpoints
  );

  const dispatch = useAdminDispatch();

  const { data: about } = useGetAboutQuery();

  const { data: environments } = useGetEnvironmentsQuery();

  const { data: serviceEnvironments } = useGetServiceEnvironmentsQuery(
    {
      service: selectedService ?? ""
    },
    {
      skip:
        !selectedEnvironmentId || !selectedService || viewLevel !== "endpoints"
    }
  );

  const environmentsToSelect = useMemo(
    () =>
      (viewLevel === "services"
        ? environments
        : serviceEnvironments?.environments) ?? [],
    [viewLevel, environments, serviceEnvironments]
  );

  const selectedEnvironment = useMemo(
    () =>
      environmentsToSelect?.find((x) => x.id === selectedEnvironmentId) ?? null,
    [selectedEnvironmentId, environmentsToSelect]
  );

  const isDataFilterEnabled = Boolean(
    about &&
      getFeatureFlagValue(
        about,
        FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
      )
  );

  const { data: services } = useGetEnvironmentServicesQuery(
    {
      environment: selectedEnvironmentId ?? null
    },
    {
      skip: !selectedEnvironmentId || viewLevel !== "services"
    }
  );

  const { data: serviceEndpoints } = useGetServiceEndpointsQuery(
    {
      service: selectedService ?? "",
      environment: selectedEnvironmentId ?? ""
    },
    {
      skip: !selectedEnvironmentId || !selectedService
    }
  );

  const handleGoBack = () => {
    onGoBack();
  };

  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option[0] : option;
    dispatch(setSelectedEnvironmentId(newItem));
    dispatch(setSelectedServices([]));
    dispatch(setSelectedEndpoints([]));
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.SERVICE_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    dispatch(setSelectedServices(newItem));
  };

  const handleSelectedEndpointsChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENDPOINT_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    dispatch(setSelectedEndpoints(newItem));
  };

  const handleDataChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.DATA_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    dispatch(setCriticalityLevels(newItem as Criticality[]));
  };

  const handlePeriodChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.PERIOD_FILTER_CHANGED);
    const newItem = Array.isArray(option) ? option : [option];
    if (newItem.length === 0) {
      dispatch(setPeriodInDays(DEFAULT_PERIOD));
      return;
    }

    const value = newItem[0];
    const newValue = Number(value);
    dispatch(setPeriodInDays(newValue));
  };

  const handleViewModeChanged = (value: ToggleValue) => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_MODE_CHANGED, { value });
    const newViewMode = value as ReportViewMode;
    dispatch(setViewMode(newViewMode));
  };

  const handleTimeModeChanged = (value: ToggleValue) => {
    sendUserActionTrackingEvent(trackingEvents.TIME_MODE_CHANGED, { value });
    const newTimeMode = value as ReportTimeMode;
    dispatch(setTimeMode(newTimeMode));

    // TODO: check if still needed
    // if (selectedViewLevel === "services") {
    // setServicesIssuesData(null);
    // }

    // if (selectedViewLevel === "endpoints") {
    // setEndpointIssuesData(null);
    // }
  };

  const title =
    viewLevel === "endpoints"
      ? `${selectedService ?? ""} Service`
      : "Code Issues";
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
            items={[...environmentsToSelect]
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
              items={[...(serviceEndpoints?.endpoints ?? [])]
                .sort()
                ?.map((x) => ({
                  label: x.displayName,
                  value: x.spanCodeObjectId,
                  enabled: true,
                  selected: selectedEndpoints.includes(x.spanCodeObjectId)
                }))}
              useShift={false}
              sameWidth={false}
              showSelectedState={true}
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleSelectedEndpointsChanged}
              searchable={true}
              placeholder={
                selectedEndpoints.length > 0 ? "Endpoints" : "All Endpoints"
              }
              disabled={
                !serviceEndpoints || serviceEndpoints.endpoints.length === 0
              }
            />
          ) : (
            <s.FilterSelect
              items={
                [...(services ?? [])].sort()?.map((service) => ({
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
                label: `${x} ${formatUnit(x, "Day")}`,
                selected: x === periodInDays,
                enabled: true
              }))}
              showSelectedState={false}
              icon={DurationBreakdownIcon}
              onChange={handlePeriodChanged}
              placeholder={`Period: ${periodInDays} ${formatUnit(
                periodInDays,
                "day"
              )}`}
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
              icon={DatabaseIcon}
              onChange={handleDataChanged}
              placeholder={"Data"}
            />
          )}
        </s.Filters>
        <s.ViewModeToggle
          size={"large"}
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
