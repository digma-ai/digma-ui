import { useEffect, useMemo, useState } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";

import { actions } from "../../actions";

import { Environment } from "../../../common/App/types";

import { getFeatureFlagValue } from "../../../../featureFlags";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CodeIcon } from "../../../common/icons/12px/CodeIcon";
import { DurationBreakdownIcon } from "../../../common/icons/12px/DurationBreakdownIcon";
import { InfinityIcon } from "../../../common/icons/16px/InfinityIcon";
import { TableIcon } from "../../../common/icons/16px/TableIcon";
import { TreemapIcon } from "../../../common/icons/16px/TreemapIcon";
import { ChevronIcon } from "../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import { Criticality, GetServicesPayload } from "../types";
import * as s from "./styles";
import { ReportHeaderProps, ReportTimeMode, ReportViewMode } from "./types";
import { useReportQuery } from "./useReportQuery";
import { useReportQueryV2 } from "./useReportQueryV2";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherFiltersConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

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
  onGoBack
}: ReportHeaderProps) => {
  const { environments, backendInfo } = useConfigSelector();
  const [periodInDays, setPeriodInDays] = useState(DEFAULT_PERIOD);
  const [viewMode, setVieMode] = useState<ReportViewMode>("table");
  const [timeMode, setTimeMode] = useState<ReportTimeMode>("baseline");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null);
  const [selectedCriticality, setSelectedCriticality] = useState<Criticality[]>(
    []
  );
  const [servicesFromStore, setServicesFromStore] = useState<string[]>([]);

  const isDataFilterEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED
  );

  const getServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment?.id ?? null }),
    [selectedEnvironment]
  );

  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherFiltersConfiguration, getServicesPayload);

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
    periodInDays
  });

  useEffect(() => {
    getData();
  }, []);

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
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.SERVICES_FILTER_SELECTED);
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
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
    setVieMode(newMode);
    onViewModeChanged(newMode);
  };

  const handleTimeModeChanged = (value: string) => {
    sendUserActionTrackingEvent(trackingEvents.TIME_MODE_CHANGED, { value });
    const newMode = value as ReportTimeMode;
    setTimeMode(newMode);
  };

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
            items={
              environments
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((x) => ({
                  label: x.name,
                  value: x.id,
                  enabled: true,
                  selected: x.id === selectedEnvironment?.id
                })) ?? []
            }
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
          {!service && (
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
        </s.Filters>
        <s.ViewModeToggle
          size="large"
          options={[
            {
              value: "table",
              icon: (props) => <TableIcon {...props} size={16} />
            },
            {
              value: "treemap",
              icon: (props) => <TreemapIcon {...props} size={16} />
            }
          ]}
          value={viewMode}
          onValueChange={handleViewModeChanged}
        />
      </s.Row>
    </s.Container>
  );
};
