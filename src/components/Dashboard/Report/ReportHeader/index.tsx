import { useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { GlobeIcon } from "../../../common/icons/12px/GlobeIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { actions } from "../../actions";
import { GetServicesPayload } from "../types";
import { Ribbon } from "./Ribbon";
import * as s from "./styles";
import { ReportHeaderProps } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherIssuesStatsConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

export const ReportHeader = ({
  onRefresh,
  onFilterChanged
}: ReportHeaderProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("");
  const environments = useGlobalStore.use.environments();
  const handleSelectedEnvironmentChanged = (option: string | string[]) => {
    const newItem =
      option === selectedEnvironment
        ? [""]
        : Array.isArray(option)
        ? option
        : [option];

    setSelectedEnvironment(newItem[0]);
    onFilterChanged({ environmentId: newItem[0], services: selectedServices });
  };

  const handleSelectedServicesChanged = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
    onFilterChanged({ environmentId: selectedEnvironment, services: newItem });
  };

  const getServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment }),
    [selectedEnvironment]
  );
  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherIssuesStatsConfiguration, getServicesPayload);

  useEffect(() => {
    getData();
  }, []);

  return (
    <s.Container>
      <Ribbon
        onDownload={() => {
          // TODO
        }}
        onRefresh={() => {
          onRefresh();
        }}
      />
      <s.FiltersContainer>
        <s.Background>
          <s.Group>
            <s.Header>Digma Report</s.Header>
            <s.FiltersGroup>
              <s.FilterSelector
                items={
                  environments?.map((x) => ({
                    label: x.name,
                    value: x.id,
                    enabled: true,
                    selected: x.id === selectedEnvironment
                  })) ?? []
                }
                icon={GlobeIcon}
                onChange={handleSelectedEnvironmentChanged}
                placeholder={
                  environments?.find((x) => x.id === selectedEnvironment)
                    ?.name ?? "All Environments"
                }
              />
              <s.FilterSelector
                items={
                  services?.map((service) => ({
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
            </s.FiltersGroup>
          </s.Group>
        </s.Background>
      </s.FiltersContainer>
    </s.Container>
  );
};
