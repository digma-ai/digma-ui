import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchData } from "../../../../hooks/useFetchData";
import { usePrevious } from "../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import {
  ErrorFilter,
  GlobalErrorsFiltersState
} from "../../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../../store/errors/useErrorsSelector";
import { useStore } from "../../../../store/useStore";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { FilterPopup } from "../../../common/FilterPopup";
import { WrenchIcon } from "../../../common/icons/12px/WrenchIcon";
import { CrossCircleIcon } from "../../../common/icons/CrossCircleIcon";
import { EndpointIcon } from "../../../common/icons/EndpointIcon";
import { IconProps } from "../../../common/icons/types";
import { SelectItem } from "../../../common/v3/Select/types";
import { actions } from "../../actions";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import {
  EndpointFilterData,
  GetGlobalErrorsFiltersDataPayload,
  SetGlobalErrorsFiltersDataPayload
} from "./types";

export const GlobalErrorsFilters = () => {
  const { environment } = useConfigSelector();
  const { globalErrorsFilters, globalErrorsSelectedFilters } =
    useErrorsSelector();
  const { setGlobalErrorsFilters, setGlobalErrorsSelectedFilters } =
    useStore.getState();
  const { services, endpoints, errorTypes } = globalErrorsFilters;
  const environmentId = environment?.id;
  const [lastChangedFilter, setLastChangedFilter] = useState<
    ErrorFilter | undefined
  >(undefined);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    globalErrorsSelectedFilters.services
  );
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(
    globalErrorsSelectedFilters.endpoints
  );
  const [selectedErrorTypes, setSelectedErrorTypes] = useState<string[]>(
    globalErrorsSelectedFilters.errorTypes
  );

  const getLastSelectedFilterValues = useCallback(
    (changedFilter: ErrorFilter) => {
      switch (changedFilter) {
        case "Services":
          return selectedServices;
        case "Endpoints":
          return selectedEndpoints;
        case "ErrorTypes":
          return selectedErrorTypes;
      }
    },
    [selectedServices, selectedEndpoints, selectedErrorTypes]
  );

  const payload: GetGlobalErrorsFiltersDataPayload = useMemo(
    () => ({
      environment: environmentId ?? "",
      ...(lastChangedFilter
        ? {
            filterName: lastChangedFilter,
            filterData: {
              values: getLastSelectedFilterValues(lastChangedFilter),
              ...(lastChangedFilter === "Endpoints"
                ? { services: globalErrorsSelectedFilters.services }
                : {})
            }
          }
        : {})
    }),
    [
      environmentId,
      globalErrorsSelectedFilters,
      getLastSelectedFilterValues,
      lastChangedFilter
    ]
  );

  const { data } = useFetchData<
    GetGlobalErrorsFiltersDataPayload,
    SetGlobalErrorsFiltersDataPayload
  >(
    {
      requestAction: actions.GET_GLOBAL_ERRORS_FILTERS_DATA,
      responseAction: actions.SET_GLOBAL_ERRORS_FILTERS_DATA,
      refreshWithInterval: false,
      refreshOnPayloadChange: true,
      isEnabled: Boolean(environment)
    },
    payload
  );
  const previousData = usePrevious(data);

  useEffect(() => {
    if (previousData !== data && data) {
      const newServices = data.filters.find((x) => x.filterName === "Services");
      const newEndpoints = data.filters.find(
        (x) => x.filterName === "Endpoints"
      );
      const newErrorTypes = data.filters.find(
        (x) => x.filterName === "ErrorTypes"
      );

      const newGlobalErrorsFilters: GlobalErrorsFiltersState = {
        ...globalErrorsFilters
      };

      if (newServices) {
        newGlobalErrorsFilters.services = newServices.values as string[];
      }

      if (newEndpoints) {
        newGlobalErrorsFilters.endpoints =
          newEndpoints.values as EndpointFilterData[];
      }

      if (newErrorTypes) {
        newGlobalErrorsFilters.errorTypes = newErrorTypes.values as string[];
      }

      setGlobalErrorsFilters(newGlobalErrorsFilters);
    }
  }, [previousData, data, setGlobalErrorsFilters, globalErrorsFilters]);

  useEffect(() => {
    setSelectedServices(globalErrorsSelectedFilters.services);
    setSelectedEndpoints(globalErrorsSelectedFilters.endpoints);
    setSelectedErrorTypes(globalErrorsSelectedFilters.errorTypes);
  }, [
    globalErrorsSelectedFilters.services,
    globalErrorsSelectedFilters.endpoints,
    globalErrorsSelectedFilters.errorTypes
  ]);

  const handleServicesChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_SERVICES_FILTER_CHANGED
    );
    const newValue = Array.isArray(value) ? value : [value];
    setLastChangedFilter("Services");
    setSelectedServices(newValue);
    setSelectedEndpoints([]);
    setSelectedErrorTypes([]);
  };

  const handleEndpointsChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_ENDPOINTS_FILTER_CHANGED
    );
    const newValue = Array.isArray(value) ? value : [value];
    setLastChangedFilter("Endpoints");
    setSelectedEndpoints(newValue);
    setSelectedErrorTypes([]);
  };

  const handleErrorTypesChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_ERROR_TYPES_FILTER_CHANGED
    );
    const newValue = Array.isArray(value) ? value : [value];
    setLastChangedFilter("Endpoints");
    setSelectedErrorTypes(newValue);
  };

  const servicesFilterOptions: SelectItem[] =
    services?.map((x) => ({
      label: x,
      value: x,
      selected: selectedServices.includes(x),
      enabled: true
    })) ?? [];

  const servicesFilterPlaceholder =
    servicesFilterOptions.filter((x) => x.selected).length > 0
      ? "Services"
      : "All";

  const endpointsFilterOptions: SelectItem[] =
    endpoints?.map((x) => ({
      label: x.displayName,
      value: x.spanCodeObjectId,
      selected: selectedEndpoints.includes(x.spanCodeObjectId),
      enabled: true
    })) ?? [];

  const endpointsFilterPlaceholder =
    endpointsFilterOptions.filter((x) => x.selected).length > 0
      ? "Endpoints"
      : "All";

  const errorTypesFilterOptions: SelectItem[] =
    errorTypes?.map((x) => ({
      label: x,
      value: x,
      selected: selectedErrorTypes.includes(x),
      enabled: true
    })) ?? [];

  const errorTypesFilterPlaceholder =
    errorTypesFilterOptions.filter((x) => x.selected).length > 0
      ? "Error types"
      : "All";

  const filters = [
    {
      title: "Services",
      component: (
        <s.StyledSelect
          key={"services"}
          items={servicesFilterOptions}
          onChange={handleServicesChange}
          placeholder={servicesFilterPlaceholder}
          multiselect={true}
          icon={(props: IconProps) => (
            <s.SelectItemIconContainer>
              <WrenchIcon {...props} />
            </s.SelectItemIconContainer>
          )}
          disabled={servicesFilterOptions?.length === 0}
        />
      )
    },
    {
      title: "Endpoints",
      component: (
        <s.StyledSelect
          key={"endpoints"}
          items={endpointsFilterOptions}
          onChange={handleEndpointsChange}
          placeholder={endpointsFilterPlaceholder}
          multiselect={true}
          icon={(props: IconProps) => (
            <s.SelectItemIconContainer>
              <EndpointIcon {...props} />
            </s.SelectItemIconContainer>
          )}
          disabled={endpointsFilterOptions?.length === 0}
        />
      )
    },
    {
      title: "Error type",
      component: (
        <s.StyledSelect
          key={"errorTypes"}
          items={errorTypesFilterOptions}
          onChange={handleErrorTypesChange}
          placeholder={errorTypesFilterPlaceholder}
          multiselect={true}
          icon={(props: IconProps) => (
            <s.SelectItemIconContainer>
              <CrossCircleIcon {...props} />
            </s.SelectItemIconContainer>
          )}
          disabled={errorTypesFilterOptions?.length === 0}
        />
      )
    }
  ];

  const applyFilters = () => {
    setGlobalErrorsSelectedFilters({
      ...globalErrorsSelectedFilters,
      services: selectedServices,
      endpoints: selectedEndpoints,
      errorTypes: selectedErrorTypes
    });
  };

  const handleClose = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_FILTERS_CLOSE_BUTTON_CLICKED
    );
    setGlobalErrorsSelectedFilters({
      ...globalErrorsSelectedFilters,
      services: selectedServices,
      endpoints: selectedEndpoints,
      errorTypes: selectedErrorTypes
    });
  };

  const handleClearAll = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_CLEAR_FILTERS_BUTTON_CLICKED
    );
    setSelectedServices([]);
    setSelectedEndpoints([]);
    setSelectedErrorTypes([]);
  };

  const selectedFiltersCount = [
    selectedServices.length,
    selectedEndpoints.length,
    selectedErrorTypes.length
  ].filter((x) => x > 0).length;

  const handlePopupOpenStateChange = (isOpen: boolean) => {
    if (!isOpen) {
      applyFilters();
    }
  };

  return (
    <FilterPopup
      onClose={handleClose}
      onClearAll={handleClearAll}
      title={"Filters"}
      selectedFiltersCount={selectedFiltersCount}
      onStateChange={handlePopupOpenStateChange}
      filters={filters}
    />
  );
};
