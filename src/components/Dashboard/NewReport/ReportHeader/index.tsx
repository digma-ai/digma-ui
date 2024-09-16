import { useEffect, useMemo, useState } from "react";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { GlobeIcon } from "../../../common/icons/12px/GlobeIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { actions } from "../../actions";
import { Toggle } from "../Toggle";
import { GetServicesPayload } from "../types";
import * as s from "./styles";
import { ReportHeaderProps } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherFiltersConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

export const ReportHeader = ({ onFilterChanged }: ReportHeaderProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(
    null
  );
  const { environments } = useConfigSelector();

  const getServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment }),
    [selectedEnvironment]
  );

  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherFiltersConfiguration, getServicesPayload);

  useEffect(() => {
    getData();
  }, []);

  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    const newItem =
      option === selectedEnvironment
        ? [""]
        : Array.isArray(option)
        ? option
        : [option];

    setSelectedEnvironment(newItem[0]);
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
    onFilterChanged({ environmentId: selectedEnvironment, services: newItem });
  };

  return (
    <s.Container>
      <s.Row>
        <s.Title>Services with critical issues</s.Title>
        <Toggle
          options={[
            { value: "Baseline", label: "Baseline" },
            { value: "Changes", label: "Changes" }
          ]}
          value="Baseline"
          onValueChange={() => {
            //
          }}
        />
      </s.Row>
      <s.FilterRow>
        <s.FilterSelect
          items={
            environments
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((x) => ({
                label: x.name,
                value: x.id,
                enabled: true,
                selected: x.id === selectedEnvironment
              })) ?? []
          }
          icon={GlobeIcon}
          onChange={handleSelectedEnvironmentChanged}
          placeholder={
            environments?.find((x) => x.id === selectedEnvironment)?.name ??
            "Select Environments"
          }
        />

        <s.FilterSelect
          items={
            services?.sort()?.map((service) => ({
              label: service,
              value: service,
              enabled: true,
              selected: selectedServices.includes(service)
            })) ?? []
          }
          multiselect={true}
          icon={WrenchIcon}
          onChange={handleSelectedServicesChanged}
          placeholder={
            selectedServices.length > 0 ? "Services" : "All Services"
          }
        />
      </s.FilterRow>
    </s.Container>
  );
};
