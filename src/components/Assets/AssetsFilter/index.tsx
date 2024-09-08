import { ComponentType, useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { FeatureFlag, InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { FilterPopup } from "../../common/FilterPopup";
import { WrenchIcon } from "../../common/icons/12px/WrenchIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { SparkleIcon } from "../../common/icons/SparkleIcon";
import { IconProps } from "../../common/icons/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import {
  AssetFilterCategory,
  AssetFilterQuery,
  AssetsFiltersData,
  GetAssetFiltersDataParams,
  GetAssetFiltersDataPayload
} from "./types";

const PERSISTENCE_KEY = "assetsFilters";

const getData = ({
  services,
  operations,
  insights,
  viewMode,
  scopeSpanCodeObjectId,
  searchQuery
}: GetAssetFiltersDataParams) => {
  window.sendMessageToDigma<GetAssetFiltersDataPayload>({
    action: actions.GET_ASSET_FILTERS_DATA,
    payload: {
      query: {
        services: scopeSpanCodeObjectId ? services : [],
        operations,
        insights,
        directOnly: viewMode === "children",
        scopedSpanCodeObjectId: scopeSpanCodeObjectId,
        ...(searchQuery?.length > 0 ? { displayName: searchQuery } : {})
      }
    }
  });
};

const renderFilterCategory = (
  category: AssetFilterCategory,
  icon: ComponentType<IconProps>,
  placeholder: string,
  selectedValues: string[],
  onChange: (value: string | string[], categoryName?: string) => void,
  transformLabel?: (value: string) => string
): JSX.Element => {
  const items =
    category.entries?.map((entry) => ({
      value: entry.name,
      label: transformLabel ? transformLabel(entry.name) : entry.name,
      enabled: entry.enabled,
      selected: selectedValues.includes(entry.name)
    })) ?? [];

  return (
    <s.StyledSelect
      searchable={true}
      key={category.categoryName}
      items={items}
      onChange={(value) => onChange(value, category.categoryName)}
      placeholder={placeholder}
      multiselect={true}
      icon={icon}
      disabled={category.entries?.length === 0}
    />
  );
};

export const AssetsFilter = () => {
  const [data, setData] = useState<AssetsFiltersData | null>();
  const previousData = usePrevious(data);
  const { filters, search: searchQuery, viewMode } = useAssetsSelector();
  const {
    setAssetsFilters: setFilters,
    setSelectedServices: setGloballySelectedServices
  } = useStore.getState();
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(isOpen);
  const {
    selectedServices: globallySelectedServices,
    environment,
    scope,
    backendInfo
  } = useConfigSelector();
  const [persistedFilters, setPersistedFilters] =
    usePersistence<AssetFilterQuery>(PERSISTENCE_KEY, "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const [selectedServices, setSelectedServices] = useState<string[]>(
    isServicesFilterEnabled ? globallySelectedServices ?? [] : []
  );
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const previousEnvironment = usePrevious(environment);
  const previousScope = usePrevious(scope);
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const areExtendedAssetsFiltersEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.ARE_EXTENDED_ASSETS_FILTERS_ENABLED
  );

  const query = useMemo(
    () => ({
      services: isServicesFilterEnabled ? selectedServices : [],
      operations: filters.operations,
      insights: filters.insights as InsightType[],
      viewMode: areExtendedAssetsFiltersEnabled ? viewMode : undefined,
      scopeSpanCodeObjectId: areExtendedAssetsFiltersEnabled
        ? scopeSpanCodeObjectId
        : undefined,
      searchQuery: areExtendedAssetsFiltersEnabled ? searchQuery : ""
    }),
    [
      isServicesFilterEnabled,
      selectedServices,
      filters.operations,
      filters.insights,
      viewMode,
      searchQuery,
      scopeSpanCodeObjectId,
      areExtendedAssetsFiltersEnabled
    ]
  );

  // Get data after filters have been rehydrated
  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      getData({
        ...query,
        services: isServicesFilterEnabled ? selectedServices : [],
        operations: persistedFilters?.operations ?? [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        insights:
          (persistedFilters?.insights as InsightType[]) || selectedInsights
      });
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights,
    isServicesFilterEnabled,
    query
  ]);

  // Handle filters data response
  useEffect(() => {
    const handleData = (data: unknown) => {
      const filtersData = data as AssetsFiltersData | null;
      setData(filtersData);
    };

    dispatcher.addActionListener(actions.SET_ASSET_FILTERS_DATA, handleData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ASSET_FILTERS_DATA,
        handleData
      );
    };
  }, []);

  // Clear filters and get data when environment is changed
  useEffect(() => {
    if (
      isEnvironment(previousEnvironment) &&
      previousEnvironment.id !== environment?.id
    ) {
      const defaultFilters = {
        services: [],
        operations: [],
        insights: []
      };
      setFilters(defaultFilters);
      setPersistedFilters(defaultFilters);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(defaultFilters.services);
      }
      getData({
        ...query,
        ...defaultFilters
      });
    }
  }, [
    setFilters,
    previousEnvironment,
    environment,
    setPersistedFilters,
    isServicesFilterEnabled,
    setGloballySelectedServices,
    areExtendedAssetsFiltersEnabled,
    query
  ]);

  // Clear filters and get data when scope is changed, but keep selected services
  useEffect(() => {
    if (
      previousScope &&
      previousScope.span?.spanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      const newFilters = {
        services: selectedServices,
        operations: [],
        insights: []
      };
      setPersistedFilters(newFilters);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(newFilters.services);
      }
      setFilters(newFilters);
      getData({
        ...query,
        ...newFilters
      });
    }
  }, [
    setFilters,
    setPersistedFilters,
    setGloballySelectedServices,
    previousScope,
    scopeSpanCodeObjectId,
    selectedServices,
    isServicesFilterEnabled,
    areExtendedAssetsFiltersEnabled,
    query
  ]);

  // Get data when the popover is opened
  useEffect(() => {
    if (isOpen && !previousIsOpen) {
      getData(query);
    }
  }, [isOpen, previousIsOpen, query]);
  // Apply filters when data is loaded
  useEffect(() => {
    if (previousData === data || isNull(data)) {
      return;
    }

    const servicesToSelect =
      data?.categories
        .find((x) => x.categoryName === "Services")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? [];
    setSelectedServices(servicesToSelect);

    const operationsCategory = data?.categories.find(
      (x) => x.categoryName === "Operations"
    );

    const endpointsToSelect =
      operationsCategory?.categories
        ?.find((x) => x.categoryName === "Endpoints")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? [];
    setSelectedEndpoints(endpointsToSelect);

    const consumersToSelect =
      operationsCategory?.categories
        ?.find((x) => x.categoryName === "Consumers")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? [];
    setSelectedConsumers(consumersToSelect);

    const internalsToSelect =
      operationsCategory?.categories
        ?.find((x) => x.categoryName === "Internal")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? [];
    setSelectedInternals(internalsToSelect);

    const insightsToSelect = (data?.categories
      .find((x) => x.categoryName === "Insights")
      ?.entries?.filter((x) => x.selected)
      .map((x) => x.name) ?? []) as InsightType[];
    setSelectedInsights(insightsToSelect);

    if (!filters) {
      const filtersQuery = {
        services: servicesToSelect,
        operations: [
          ...endpointsToSelect,
          ...consumersToSelect,
          ...internalsToSelect
        ],
        insights: insightsToSelect
      };

      setPersistedFilters(filtersQuery);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(filtersQuery.services);
      }
      setFilters(filtersQuery);
    }
  }, [
    previousData,
    data,
    filters,
    setFilters,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights,
    setPersistedFilters,
    setGloballySelectedServices,
    isServicesFilterEnabled
  ]);

  // Apply filters when the popover is closed
  useEffect(() => {
    if (previousIsOpen && !isOpen) {
      const filtersQuery = {
        services: isServicesFilterEnabled ? selectedServices : [],
        operations: [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        insights: selectedInsights
      };
      setFilters(filtersQuery);
      setPersistedFilters(filtersQuery);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(filtersQuery.services);
      }
      sendTrackingEvent(trackingEvents.FILTER_APPLIED);
    }
  }, [
    previousIsOpen,
    isOpen,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices,
    setPersistedFilters,
    setGloballySelectedServices,
    isServicesFilterEnabled,
    setFilters
  ]);

  const handleClearFiltersButtonClick = () => {
    getData({
      ...query,
      services: isServicesFilterEnabled ? [] : selectedServices,
      insights: [],
      operations: []
    });
  };

  const handleSelectedItemsChange = (
    value: string | string[],
    category?: string
  ) => {
    const newValue = Array.isArray(value) ? value : [value];

    let services = selectedServices;
    let endpoints = selectedEndpoints;
    let consumers = selectedConsumers;
    let internals = selectedInternals;
    let insights = selectedInsights;

    switch (category) {
      case "Services":
        services = newValue;
        break;
      case "Endpoints":
        endpoints = newValue;
        break;
      case "Consumers":
        consumers = newValue;
        break;
      case "Internal":
        internals = newValue;
        break;
      case "Insights":
        insights = newValue as InsightType[];
        break;
    }

    getData({
      ...query,
      services,
      operations: [...endpoints, ...consumers, ...internals],
      insights
    });
  };

  const servicesCategory = data?.categories.find(
    (x) => x.categoryName === "Services"
  ) ?? {
    categoryName: "Services",
    entries: []
  };

  const operationsCategory = data?.categories.find(
    (x) => x.categoryName === "Operations"
  );
  const endpointsCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Endpoints"
  ) ?? {
    categoryName: "Endpoints",
    entries: []
  };
  const consumersCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Consumers"
  ) ?? {
    categoryName: "Consumers",
    entries: []
  };
  const internalsCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Internal"
  ) ?? {
    categoryName: "Internal",
    entries: []
  };

  const insightsCategory = data?.categories.find(
    (x) => x.categoryName === "Insights"
  ) ?? {
    categoryName: "Insights",
    entries: []
  };

  const selectedFilters = [
    ...(isServicesFilterEnabled ? selectedServices : []),
    ...selectedEndpoints,
    ...selectedConsumers,
    ...selectedInternals,
    ...selectedInsights
  ];

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.FILTERS_POPUP_CLOSE_BUTTON_CLICKED
    );
  };
  const handleOnStateChange = (state: boolean) => {
    setIsOpen(state);
  };

  const filterComponents = [
    {
      title: "Operations",
      component: (
        <>
          {renderFilterCategory(
            endpointsCategory,
            EndpointIcon,
            "Endpoints",
            selectedEndpoints,
            handleSelectedItemsChange
          )}
          {renderFilterCategory(
            consumersCategory,
            EndpointIcon,
            "Consumers",
            selectedConsumers,
            handleSelectedItemsChange
          )}
          {renderFilterCategory(
            internalsCategory,
            EndpointIcon,
            "Internal",
            selectedInternals,
            handleSelectedItemsChange
          )}
        </>
      )
    }
  ];

  if (insightsCategory) {
    filterComponents.push({
      title: "Insights",
      component: renderFilterCategory(
        insightsCategory,
        SparkleIcon,
        "Insights",
        selectedInsights,
        handleSelectedItemsChange,
        (value) => getInsightTypeInfo(value)?.label ?? value
      )
    });
  }

  if (isServicesFilterEnabled) {
    filterComponents.unshift({
      title: "Services",
      component: renderFilterCategory(
        servicesCategory,
        WrenchIcon,
        selectedServices.length > 0 ? "Services" : "All",
        selectedServices,
        handleSelectedItemsChange
      )
    });
  }

  return (
    <FilterPopup
      onClose={handleCloseButtonClick}
      onClearAll={handleClearFiltersButtonClick}
      title={"Filters"}
      filters={filterComponents}
      selectedFiltersCount={selectedFilters.length}
      onStateChange={handleOnStateChange}
    />
  );
};
