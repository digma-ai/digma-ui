import { useEffect } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import { usePrevious } from "../../../../../hooks/usePrevious";
import { useGetEnvironmentServicesQuery } from "../../../../../redux/services/digma";
import { setSelectedServices } from "../../../../../redux/slices/issuesReportSlice";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { Select } from "../../../../common/v3/Select";
import { trackingEvents } from "../../../tracking";
import { FilterButton } from "./FilterButton";

export const FilterMenu = () => {
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );

  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );

  const dispatch = useAdminDispatch();

  const { data: services } = useGetEnvironmentServicesQuery(
    {
      environment: selectedEnvironmentId ?? null
    },
    {
      skip: !selectedEnvironmentId
    }
  );
  const previousServices = usePrevious(services);

  useEffect(() => {
    if (services && previousServices !== services) {
      const newSelectedServices = services.filter((x) =>
        selectedServices.includes(x)
      );
      dispatch(setSelectedServices(newSelectedServices));
    }
  }, [services, previousServices, selectedServices, dispatch]);

  const handleSelectedServicesChange = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option : [option];

    sendUserActionTrackingEvent(trackingEvents.SERVICES_CHANGED);

    dispatch(setSelectedServices(newItem));
  };

  return (
    <Select
      sameWidth={false}
      searchable={true}
      items={[...(services ?? [])].sort().map((service) => ({
        label: service,
        value: service,
        enabled: true,
        selected: selectedServices.includes(service)
      }))}
      showSelectedState={true}
      multiselect={true}
      onChange={handleSelectedServicesChange}
      disabled={!services || services.length === 0}
      ButtonComponent={FilterButton}
      menuHeight={230}
    />
  );
};
