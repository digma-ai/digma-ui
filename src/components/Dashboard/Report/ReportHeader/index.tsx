import { useMemo, useState } from "react";
import { actions as globalActions } from "../../../../actions";
import type { DataFetcherConfiguration } from "../../../../hooks/useFetchData";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { GlobeIcon } from "../../../common/icons/12px/GlobeIcon";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { actions } from "../../actions";
import { trackingEvents } from "../tracking";
import type { GetServicesPayload } from "../types";
import { Ribbon } from "./Ribbon";
import * as s from "./styles";
import type { ReportHeaderProps } from "./types";

const baseFetchConfig = {
  refreshWithInterval: false,
  refreshOnPayloadChange: true
};

const dataFetcherFiltersConfiguration: DataFetcherConfiguration = {
  requestAction: actions.GET_SERVICES,
  responseAction: actions.SET_SERVICES,
  ...baseFetchConfig
};

const refreshEnvList = () => {
  window.sendMessageToDigma({
    action: globalActions.GET_ENVIRONMENTS
  });
};

export const ReportHeader = ({
  onRefresh,
  onFilterChange
}: ReportHeaderProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(
    null
  );
  const { environments } = useConfigSelector();
  const handleSelectedEnvironmentChange = (option: string | string[]) => {
    const newItem =
      option === selectedEnvironment
        ? [""]
        : Array.isArray(option)
        ? option
        : [option];

    setSelectedEnvironment(newItem[0]);
    onFilterChange({ environmentId: newItem[0], services: selectedServices });
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_FILTER_SELECTED);
  };

  const handleSelectedServicesChange = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option : [option];
    setSelectedServices(newItem);
    onFilterChange({ environmentId: selectedEnvironment, services: newItem });
    sendUserActionTrackingEvent(trackingEvents.SERVICES_FILTER_SELECTED);
  };

  const getServicesPayload = useMemo(
    () => ({ environment: selectedEnvironment }),
    [selectedEnvironment]
  );
  const { data: services, getData } = useFetchData<
    GetServicesPayload,
    string[]
  >(dataFetcherFiltersConfiguration, getServicesPayload);

  const handleRefresh = () => {
    getData();
    onRefresh();
    refreshEnvList();
  };

  return (
    <s.Container>
      <Ribbon
        onDownload={() => {
          // TODO: implement
        }}
        onRefresh={() => {
          handleRefresh();
        }}
      />
      <s.FiltersContainer>
        <s.Background>
          <s.Group>
            <s.Header>Digma Report</s.Header>
            <s.FiltersGroup>
              <s.FilterSelector
                items={
                  environments
                    ?.map((x) => ({
                      label: x.name,
                      value: x.id,
                      enabled: true,
                      selected: x.id === selectedEnvironment
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label)) ?? []
                }
                icon={GlobeIcon}
                onChange={handleSelectedEnvironmentChange}
                placeholder={
                  environments?.find((x) => x.id === selectedEnvironment)
                    ?.name ?? "All Environments"
                }
              />
              <s.FilterSelector
                items={
                  services
                    ?.map((service) => ({
                      label: service,
                      value: service,
                      enabled: true,
                      selected: selectedServices.includes(service)
                    }))
                    .sort() ?? []
                }
                multiselect={true}
                icon={WrenchIcon}
                onChange={handleSelectedServicesChange}
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
