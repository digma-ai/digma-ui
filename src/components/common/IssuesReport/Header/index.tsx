import { useMemo } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import {
  useGetAboutQuery,
  useGetEnvironmentServicesQuery,
  useGetEnvironmentsQuery,
  useGetServiceEndpointsQuery,
  useGetServiceEnvironmentsQuery
} from "../../../../redux/services/digma";
import type { IssueCriticality } from "../../../../redux/services/types";
import type {
  IssuesReportTimeMode,
  IssuesReportViewMode
} from "../../../../redux/slices/issuesReportSlice";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../../utils/formatUnit";
import { CodeIcon } from "../../icons/12px/CodeIcon";
import { DurationBreakdownIcon } from "../../icons/12px/DurationBreakdownIcon";
import { WrenchIcon } from "../../icons/12px/WrenchIcon";
import { InfinityIcon } from "../../icons/16px/InfinityIcon";
import { TableIcon } from "../../icons/16px/TableIcon";
import { TreemapIcon } from "../../icons/16px/TreemapIcon";
import { ChevronIcon } from "../../icons/20px/ChevronIcon";
import { DatabaseIcon } from "../../icons/DatabaseIcon";
import { Direction } from "../../icons/types";
import type { ToggleValue } from "../../Toggle/types";
import { NewIconButton } from "../../v3/NewIconButton";
import { Tooltip } from "../../v3/Tooltip";
import { trackingEvents } from "../tracking";
import { sortEnvironments } from "../utils";
import * as s from "./styles";
import type { HeaderProps } from "./types";

const criticalityOptions: {
  id: IssueCriticality;
  label: string;
}[] = [
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

export const Header = ({
  viewMode,
  viewLevel,
  timeMode,
  selectedEnvironmentId,
  selectedService,
  criticalityLevels,
  periodInDays,
  selectedEndpoints,
  selectedServices,
  onSelectedEnvironmentIdChange,
  onSelectedServicesChange,
  onSelectedEndpointsChange,
  onCriticalityLevelsChange,
  onPeriodInDaysChange,
  onTimeModeChange,
  onViewModeChange,
  defaultTitle,
  onGoBack
}: HeaderProps) => {
  const { data: about } = useGetAboutQuery();

  const { data: environments } = useGetEnvironmentsQuery(undefined, {
    skip: viewLevel !== "services"
  });

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

  const handleSelectedEnvironmentChange = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option[0] : option;
    onSelectedEnvironmentIdChange(newItem);
    onSelectedServicesChange([]);
    onSelectedEndpointsChange([]);
  };

  const handleSelectedServicesChange = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.SERVICE_FILTER_SELECTED);
    const newItems = Array.isArray(option) ? option : [option];
    onSelectedServicesChange(newItems);
  };

  const handleSelectedEndpointsChange = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.ENDPOINT_FILTER_SELECTED);
    const newItems = Array.isArray(option) ? option : [option];
    const newEndpoints =
      serviceEndpoints?.endpoints.filter((x) =>
        newItems.includes(x.spanCodeObjectId)
      ) ?? [];
    onSelectedEndpointsChange(newEndpoints);
  };

  const handleDataChange = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.DATA_FILTER_SELECTED);
    const newItems = Array.isArray(option) ? option : [option];
    onCriticalityLevelsChange(newItems as IssueCriticality[]);
  };

  const handlePeriodChange = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.PERIOD_FILTER_CHANGED);
    const newItem = Array.isArray(option) ? option[0] : option;
    onPeriodInDaysChange(Number(newItem));
  };

  const handleViewModeChange = (value: ToggleValue) => {
    sendUserActionTrackingEvent(trackingEvents.VIEW_MODE_CHANGED, { value });
    const newViewMode = value as IssuesReportViewMode;
    onViewModeChange(newViewMode);
  };

  const handleTimeModeChange = (value: ToggleValue) => {
    sendUserActionTrackingEvent(trackingEvents.TIME_MODE_CHANGED, { value });
    const newTimeMode = value as IssuesReportTimeMode;
    onTimeModeChange(newTimeMode);
  };

  const title =
    viewLevel === "endpoints"
      ? `${selectedService ?? ""} Service`
      : defaultTitle;
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
          onValueChange={handleTimeModeChange}
        />
      </s.Row>
      <s.Row>
        <s.Filters>
          <s.FilterSelect
            items={sortEnvironments(environmentsToSelect).map((x) => ({
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
            onChange={handleSelectedEnvironmentChange}
            placeholder={selectedEnvironment?.name ?? "Select Environments"}
            disabled={environmentsToSelect.length === 0}
          />
          {viewLevel === "endpoints" ? (
            <s.FilterSelect
              items={(serviceEndpoints?.endpoints ?? [])
                .map((x) => ({
                  label: x.displayName,
                  value: x.spanCodeObjectId,
                  enabled: true,
                  selected: Boolean(
                    selectedEndpoints.find(
                      (endpoint) =>
                        endpoint.spanCodeObjectId === x.spanCodeObjectId
                    )
                  )
                }))
                .sort((a, b) => a.label.localeCompare(b.label))}
              useShift={false}
              sameWidth={false}
              showSelectedState={true}
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleSelectedEndpointsChange}
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
              items={[...(services ?? [])].sort().map((service) => ({
                label: service,
                value: service,
                enabled: true,
                selected: selectedServices.includes(service)
              }))}
              showSelectedState={true}
              multiselect={true}
              icon={WrenchIcon}
              onChange={handleSelectedServicesChange}
              placeholder={
                selectedServices.length > 0 ? "Services" : "All Services"
              }
              disabled={!services || services.length === 0}
            />
          )}
          {timeMode === "changes" && (
            <s.FilterSelect
              items={[1, DEFAULT_PERIOD].map((x) => ({
                value: x.toString(),
                label: `${x} ${formatUnit(x, "Day")}`,
                selected: x === periodInDays,
                enabled: true
              }))}
              showSelectedState={false}
              icon={DurationBreakdownIcon}
              onChange={handlePeriodChange}
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
                selected: criticalityLevels.includes(item.id)
              }))}
              multiselect={true}
              icon={DatabaseIcon}
              onChange={handleDataChange}
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
          onValueChange={handleViewModeChange}
        />
      </s.Row>
    </s.Container>
  );
};
