import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/globalStore";
import {
  DataFetcherConfiguration,
  useFetchData
} from "../../../../hooks/useFetchData";
import { EnvironmentIcon } from "../../../common/icons/12px/EnvironmentIcon";
import { ServiceIcon } from "../../../common/icons/12px/ServiceIcon";
import { actions } from "../../actions";
import { Ribbon } from "./Ribbon";
import * as s from "./styles";
import { ReportsHeaderProps } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherIssuesStatsConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

export const ReportsHeader = ({
  onRefresh,
  onFilterChanged
}: ReportsHeaderProps) => {
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

  const { data: services, getData } = useFetchData<undefined, string[]>(
    dataFetcherIssuesStatsConfiguration
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <s.Container>
      <Ribbon
        onDownload={() => {
          1;
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
                icon={EnvironmentIcon}
                onChange={handleSelectedEnvironmentChanged}
                placeholder="Environments"
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
                icon={ServiceIcon}
                onChange={handleSelectedServicesChanged}
                placeholder="All Services"
              />
            </s.FiltersGroup>
          </s.Group>
        </s.Background>
      </s.FiltersContainer>
    </s.Container>
  );
};
