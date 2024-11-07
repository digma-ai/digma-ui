import { useCallback, useEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { useFetchData } from "../../../../hooks/useFetchData";
import { usePrevious } from "../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import {
  ErrorCriticality,
  ErrorFilter,
  ErrorHandlingType,
  GlobalErrorsFiltersState
} from "../../../../store/errors/errorsSlice";
import { useErrorsSelector } from "../../../../store/errors/useErrorsSelector";
import { useStore } from "../../../../store/useStore";
import { FeatureFlag } from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { FilterPopup } from "../../../common/FilterPopup";
import { EyeIcon } from "../../../common/icons/12px/EyeIcon";
import { WarningTriangleIcon } from "../../../common/icons/12px/WarningTriangleIcon";
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

const getSelectPlaceholder = (options: SelectItem[], placeholder: string) =>
  options.filter((x) => x.selected).length > 0 ? placeholder : "All";

export const GlobalErrorsFilters = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    environment,
    backendInfo,
    selectedServices: globallySelectedServices,
    scope
  } = useConfigSelector();
  const areGlobalErrorsCriticalityAndUnhandledFiltersEnabled =
    getFeatureFlagValue(
      backendInfo,
      FeatureFlag.ARE_GLOBAL_ERRORS_CRITICALITY_AND_UNHANDLED_FILTERS_ENABLED
    );
  const { globalErrorsFilters, globalErrorsSelectedFilters } =
    useErrorsSelector();
  const {
    setGlobalErrorsFilters,
    setGlobalErrorsSelectedFilters,
    setSelectedServices: setGloballySelectedServices
  } = useStore.getState();
  const { services, endpoints, errorTypes } = globalErrorsFilters;
  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScopeSpanCodeObjectId = usePrevious(scopeSpanCodeObjectId);

  const [lastChangedFilter, setLastChangedFilter] = useState<
    ErrorFilter | undefined
  >(undefined);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    globallySelectedServices ?? []
  );
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(
    globalErrorsSelectedFilters.endpoints
  );
  const [selectedErrorTypes, setSelectedErrorTypes] = useState<string[]>(
    globalErrorsSelectedFilters.errorTypes
  );
  const [selectedCriticalities, setSelectedCriticalities] = useState<
    ErrorCriticality[]
  >(globalErrorsSelectedFilters.criticalities);
  const [selectedHandlingTypes, setSelectedHandlingTypes] = useState<
    ErrorHandlingType[]
  >(globalErrorsSelectedFilters.handlingTypes);

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
                ? { services: selectedServices }
                : {})
            }
          }
        : {})
    }),
    [
      environmentId,
      selectedServices,
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

  // Clear filters on environment change, but keep the selected services
  useEffect(() => {
    if (previousEnvironmentId !== environmentId) {
      setSelectedEndpoints([]);
      setSelectedErrorTypes([]);
      setSelectedCriticalities([]);
      setSelectedHandlingTypes([]);
    }
  }, [environmentId, previousEnvironmentId]);

  const discardChanges = useCallback(() => {
    setSelectedServices(globalErrorsSelectedFilters.services);
    setSelectedEndpoints(globalErrorsSelectedFilters.endpoints);
    setSelectedErrorTypes(globalErrorsSelectedFilters.errorTypes);
    setSelectedCriticalities(globalErrorsSelectedFilters.criticalities);
    setSelectedHandlingTypes(globalErrorsSelectedFilters.handlingTypes);
  }, [
    globalErrorsSelectedFilters.services,
    globalErrorsSelectedFilters.endpoints,
    globalErrorsSelectedFilters.errorTypes,
    globalErrorsSelectedFilters.criticalities,
    globalErrorsSelectedFilters.handlingTypes
  ]);

  // Close popup on environment or scope changes
  useEffect(() => {
    if (
      previousEnvironmentId !== environmentId ||
      previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setIsPopupOpen(false);

      discardChanges();
    }
  }, [
    environmentId,
    scopeSpanCodeObjectId,
    previousEnvironmentId,
    previousScopeSpanCodeObjectId,
    discardChanges
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

  const handleCriticalityChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_CRITICALITY_FILTER_CHANGED
    );
    const newValue = Array.isArray(value) ? value : [value];
    setSelectedCriticalities(newValue as ErrorCriticality[]);
  };

  const handleHandlingTypeChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_UNHANDLED_FILTER_CHANGED
    );
    const newValue = value === "All" ? [] : [value];
    setSelectedHandlingTypes(newValue as ErrorHandlingType[]);
  };

  const servicesFilterOptions: SelectItem[] = useMemo(
    () =>
      services?.map((x) => ({
        label: x,
        value: x,
        selected: selectedServices.includes(x),
        enabled: true
      })) ?? [],
    [services, selectedServices]
  );

  const endpointsFilterOptions: SelectItem[] = useMemo(
    () =>
      endpoints?.map((x) => ({
        label: x.displayName,
        value: x.spanCodeObjectId,
        selected: selectedEndpoints.includes(x.spanCodeObjectId),
        enabled: true
      })) ?? [],
    [endpoints, selectedEndpoints]
  );

  const errorTypesFilterOptions: SelectItem[] = useMemo(
    () =>
      errorTypes?.map((x) => ({
        label: x,
        value: x,
        selected: selectedErrorTypes.includes(x),
        enabled: true
      })) ?? [],
    [errorTypes, selectedErrorTypes]
  );

  const criticalityFilterOptions: SelectItem[] = useMemo(
    () => [
      {
        label: "Critical",
        value: "High",
        selected: selectedCriticalities.includes("High"),
        enabled: true
      },
      {
        label: "Medium",
        value: "Medium",
        selected: selectedCriticalities.includes("Medium"),
        enabled: true
      },
      {
        label: "Low",
        value: "Low",
        selected: selectedCriticalities.includes("Low"),
        enabled: true
      }
    ],
    [selectedCriticalities]
  );

  const handlingTypeFilterOptions: SelectItem[] = useMemo(
    () => [
      {
        label: "Yes",
        value: "Handled",
        selected:
          selectedHandlingTypes.length === 1 &&
          selectedHandlingTypes[0] === "Handled",
        enabled: true
      },
      {
        label: "No",
        value: "Unhandled",
        selected:
          selectedHandlingTypes.length === 1 &&
          selectedHandlingTypes[0] === "Unhandled",
        enabled: true
      },
      {
        label: "All",
        value: "All",
        selected: selectedHandlingTypes.length === 0,
        enabled: true
      }
    ],
    [selectedHandlingTypes]
  );

  const selectedHandlingTypeOption = useMemo(
    () => handlingTypeFilterOptions.find((x) => x.selected),
    [handlingTypeFilterOptions]
  );

  const filters = [
    {
      title: "Services",
      component: (
        <s.StyledSelect
          key={"services"}
          items={servicesFilterOptions}
          onChange={handleServicesChange}
          placeholder={getSelectPlaceholder(servicesFilterOptions, "Services")}
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
          placeholder={getSelectPlaceholder(
            endpointsFilterOptions,
            "Endpoints"
          )}
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
          placeholder={getSelectPlaceholder(
            errorTypesFilterOptions,
            "Error types"
          )}
          multiselect={true}
          icon={(props: IconProps) => (
            <s.SelectItemIconContainer>
              <CrossCircleIcon {...props} />
            </s.SelectItemIconContainer>
          )}
          disabled={errorTypesFilterOptions?.length === 0}
        />
      )
    },
    ...(areGlobalErrorsCriticalityAndUnhandledFiltersEnabled
      ? [
          {
            title: "Criticality",
            component: (
              <s.StyledSelect
                key={"criticality"}
                items={criticalityFilterOptions}
                onChange={handleCriticalityChange}
                placeholder={getSelectPlaceholder(
                  criticalityFilterOptions,
                  "Criticality levels"
                )}
                multiselect={true}
                icon={(props: IconProps) => (
                  <s.SelectItemIconContainer>
                    <WarningTriangleIcon {...props} />
                  </s.SelectItemIconContainer>
                )}
              />
            )
          },
          {
            title: "Unhandled",
            component: (
              <s.StyledSelect
                key={"handlingType"}
                items={handlingTypeFilterOptions}
                onChange={handleHandlingTypeChange}
                placeholder={selectedHandlingTypeOption?.label ?? "All"}
                icon={(props: IconProps) => (
                  <s.SelectItemIconContainer>
                    <EyeIcon {...props} />
                  </s.SelectItemIconContainer>
                )}
              />
            )
          }
        ]
      : [])
  ];

  const handleClose = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_FILTERS_CLOSE_BUTTON_CLICKED
    );

    setIsPopupOpen(false);

    discardChanges();
  };

  const handleFiltersButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_FILTERS_BUTTON_CLICKED
    );

    setIsPopupOpen(!isPopupOpen);

    if (isPopupOpen) {
      discardChanges();
    }
  };

  const handleApply = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_FILTERS_APPLY_FILTERS_BUTTON_CLICKED
    );

    setIsPopupOpen(false);

    setGlobalErrorsSelectedFilters({
      ...globalErrorsSelectedFilters,
      services: selectedServices,
      endpoints: selectedEndpoints,
      errorTypes: selectedErrorTypes,
      criticalities: selectedCriticalities,
      handlingTypes: selectedHandlingTypes
    });
    setGloballySelectedServices(selectedServices);
  };

  const handleClearAll = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_CLEAR_FILTERS_BUTTON_CLICKED
    );
    setSelectedServices([]);
    setSelectedEndpoints([]);
    setSelectedErrorTypes([]);
    setSelectedCriticalities([]);
    setSelectedHandlingTypes([]);
  };

  const selectedFiltersCount = [
    selectedServices.length,
    selectedEndpoints.length,
    selectedErrorTypes.length,
    selectedCriticalities.length,
    selectedHandlingTypes.length
  ].filter((x) => x > 0).length;

  const appliedFiltersCount = [
    (globallySelectedServices ?? []).length,
    globalErrorsSelectedFilters.endpoints.length,
    globalErrorsSelectedFilters.errorTypes.length,
    globalErrorsSelectedFilters.criticalities.length,
    globalErrorsSelectedFilters.handlingTypes.length
  ].filter((x) => x > 0).length;

  return (
    <FilterPopup
      onApply={handleApply}
      onClose={handleClose}
      onClearAll={handleClearAll}
      title={"Filters"}
      selectedFiltersCount={selectedFiltersCount}
      appliedFiltersCount={appliedFiltersCount}
      filters={filters}
      isOpen={isPopupOpen}
      onFiltersButtonClick={handleFiltersButtonClick}
    />
  );
};
