import { useEffect, useMemo, useState } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";

import { actions } from "../../actions";

import { usePrevious } from "../../../../hooks/usePrevious";
import { Environment } from "../../../common/App/types";

import { isEnvironment } from "../../../../typeGuards/isEnvironment";
import { isNumber } from "../../../../typeGuards/isNumber";
import { CodeIcon } from "../../../common/icons/12px/CodeIcon";
import { DurationBreakdownIcon } from "../../../common/icons/12px/DurationBreakdownIcon";
import { InfinityIcon } from "../../../common/icons/16px/InfinityIcon";
import { TableIcon } from "../../../common/icons/16px/TableIcon";
import { TreemapIcon } from "../../../common/icons/16px/TreemapIcon";
import { GetServicesPayload } from "../types";
import * as s from "./styles";
import { ReportHeaderProps, ReportTimeMode, ReportViewMode } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherFiltersConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

export const formatUnit = (value: number, unit: string) =>
  value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;

const DEFAULT_PERIOD = 1;

export const ReportHeader = ({
  onFilterChanged,
  onViewModeChanged
}: ReportHeaderProps) => {
  const { environments } = useConfigSelector();
  const [periodInDays, setPeriodInDays] = useState(DEFAULT_PERIOD);
  const [viewMode, setVieMode] = useState<ReportViewMode>("table");
  const [timeMode, setTimeMode] = useState<ReportTimeMode>("baseline");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null);

  const previousSelectedServices = usePrevious(selectedServices);
  const previousEnvironment = usePrevious(selectedEnvironment);
  const previousTimeMode = usePrevious(timeMode);
  const previousPeriod = usePrevious(periodInDays);

  const getServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment?.id ?? null }),
    [selectedEnvironment]
  );

  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherFiltersConfiguration, getServicesPayload);
  const previousServices = usePrevious(services);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSelectedEnvironment(
      environments?.length && environments?.length > 0 ? environments[0] : null
    );
    setSelectedServices([]);
  }, [environments]);

  useEffect(() => {
    if (
      previousTimeMode !== timeMode ||
      (isEnvironment(selectedEnvironment) &&
        previousEnvironment !== selectedEnvironment) ||
      previousSelectedServices !== selectedServices ||
      services !== previousServices ||
      (isNumber(periodInDays) && previousPeriod !== periodInDays)
    ) {
      onFilterChanged({
        lastDays: timeMode === "baseline" ? null : periodInDays,
        services:
          selectedServices.length > 0 ? selectedServices : services ?? [],
        environmentId: selectedEnvironment?.id ?? null
      });
    }
  }, [
    periodInDays,
    timeMode,
    selectedServices,
    selectedEnvironment,
    onFilterChanged,
    previousEnvironment,
    previousTimeMode,
    previousPeriod,
    services,
    previousSelectedServices,
    previousServices
  ]);

  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    const newItem =
      option === selectedEnvironment?.id
        ? [""]
        : Array.isArray(option)
        ? option
        : [option];

    const newItemEnv = environments?.find((x) => x.id === newItem[0]) ?? null;
    setSelectedEnvironment(newItemEnv);
    setSelectedServices([]);
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
  };

  const handlePeriodChanged = (option: string | string[]) => {
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
    const newMode = value as ReportViewMode;
    setVieMode(newMode);
    onViewModeChanged(newMode);
  };

  const handleTimeModeChanged = (value: string) => {
    const newMode = value as ReportTimeMode;
    setTimeMode(newMode);
  };

  return (
    <s.Container>
      <s.Row>
        <s.Title>Services with critical issues</s.Title>
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
              icon={DurationBreakdownIcon}
              onChange={handlePeriodChanged}
              placeholder={`Period: ${formatUnit(periodInDays, "day")}`}
            />
          )}

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
