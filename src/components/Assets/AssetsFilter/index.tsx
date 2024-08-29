import { ComponentType, useEffect, useState } from "react";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { dispatcher } from "../../../dispatcher";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { FilterPopup } from "../../common/FilterPopup";
import { WrenchIcon } from "../../common/icons/12px/WrenchIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { SparkleIcon } from "../../common/icons/SparkleIcon";
import { IconProps } from "../../common/icons/types";
import { AssetScopeOption } from "../AssetsViewScopeConfiguration/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import {
  AssetFilterCategory,
  AssetFilterQuery,
  AssetsFilterProps,
  AssetsFiltersData,
  GetAssetFiltersDataPayload
} from "./types";

import { useScopeStore } from "../../../containers/Main/stores/useScopeStore";
import { useStore } from "../../../containers/Main/stores/useStore";
import * as s from "./styles";

const PERSISTENCE_KEY = "assetsFilters";

const getData = ({
  services,
  operations,
  insights,
  assetScopeOption,
  searchQuery
}: {
  services: string[];
  operations: string[];
  insights: InsightType[];
  assetScopeOption: AssetScopeOption | null;
  searchQuery: string;
}) => {
  window.sendMessageToDigma<GetAssetFiltersDataPayload>({
    action: actions.GET_ASSET_FILTERS_DATA,
    payload: {
      query: {
        services,
        operations,
        insights,
        directOnly: Boolean(assetScopeOption?.isDirect),
        scopedSpanCodeObjectId: assetScopeOption?.scopedSpanCodeObjectId,
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

export const AssetsFilter = ({
  onApply,
  filters,
  assetScopeOption,
  searchQuery
}: AssetsFilterProps) => {
  const [data, setData] = useState<{ data: AssetsFiltersData | null }>();
  const previousData = usePrevious(data);
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(isOpen);
  const globallySelectedServices = useGlobalStore().selectedServices;
  const { setSelectedServices: setGloballySelectedServices } =
    useStore.getState();
  const [persistedFilters, setPersistedFilters] =
    usePersistence<AssetFilterQuery>(PERSISTENCE_KEY, "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const scope = useScopeStore().scope;
  const isServicesFilterEnabled = !scope?.span?.spanCodeObjectId;
  const [selectedServices, setSelectedServices] = useState<string[]>(
    isServicesFilterEnabled ? globallySelectedServices ?? [] : []
  );
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const environment = useGlobalStore().environment;
  const previousEnvironment = usePrevious(environment);
  const previousScope = usePrevious(scope);

  // Get data after filters have been rehydrated
  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      getData({
        services: isServicesFilterEnabled ? selectedServices : [],
        operations: persistedFilters?.operations ?? [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        insights:
          (persistedFilters?.insights as InsightType[]) || selectedInsights,
        assetScopeOption,
        searchQuery
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
    scope,
    assetScopeOption,
    searchQuery,
    globallySelectedServices,
    isServicesFilterEnabled
  ]);

  useEffect(() => {
    const handleData = (data: unknown) => {
      const filtersData = data as AssetsFiltersData | null;
      setData({ data: filtersData });
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
      setPersistedFilters(defaultFilters);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(defaultFilters.services);
      }
      onApply(defaultFilters);
      getData({
        ...defaultFilters,
        assetScopeOption,
        searchQuery
      });
    }
  }, [
    previousEnvironment,
    environment,
    setPersistedFilters,
    onApply,
    assetScopeOption,
    searchQuery,
    isServicesFilterEnabled,
    setGloballySelectedServices
  ]);

  // Clear filters and get data when scope is changed, but keep selected services
  useEffect(() => {
    if (previousScope && previousScope !== scope) {
      const newFilters = {
        services: selectedServices,
        operations: [],
        insights: []
      };
      setPersistedFilters(newFilters);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(newFilters.services);
      }
      onApply(newFilters);
      getData({
        ...newFilters,
        assetScopeOption,
        searchQuery
      });
    }
  }, [
    setPersistedFilters,
    setGloballySelectedServices,
    onApply,
    previousScope,
    scope,
    assetScopeOption,
    searchQuery,
    selectedServices,
    isServicesFilterEnabled
  ]);

  // Get data when the popover is opened
  useEffect(() => {
    if (isOpen && !previousIsOpen) {
      getData({
        services: isServicesFilterEnabled ? selectedServices : [],
        operations: [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        insights: selectedInsights,
        assetScopeOption,
        searchQuery
      });
    }
  }, [
    isOpen,
    previousIsOpen,
    scope,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices,
    assetScopeOption,
    searchQuery,
    isServicesFilterEnabled
  ]);

  // Apply filters when data is loaded
  useEffect(() => {
    if (previousData === data || isNull(data?.data)) {
      return;
    }

    const servicesToSelect =
      data?.data?.categories
        .find((x) => x.categoryName === "Services")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? [];
    setSelectedServices(servicesToSelect);

    const operationsCategory = data?.data?.categories.find(
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

    const insightsToSelect = (data?.data?.categories
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
      onApply(filtersQuery);
    }
  }, [
    previousData,
    data,
    filters,
    onApply,
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
        services: selectedServices,
        operations: [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        insights: selectedInsights
      };
      onApply(filtersQuery);
      setPersistedFilters(filtersQuery);
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(filtersQuery.services);
      }
      sendTrackingEvent(trackingEvents.FILTER_APPLIED);
    }
  }, [
    previousIsOpen,
    isOpen,
    onApply,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices,
    setPersistedFilters,
    setGloballySelectedServices,
    isServicesFilterEnabled
  ]);

  const handleClearFiltersButtonClick = () => {
    getData({
      services: isServicesFilterEnabled ? [] : selectedServices,
      insights: [],
      operations: [],
      assetScopeOption,
      searchQuery
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
      services,
      operations: [...endpoints, ...consumers, ...internals],
      insights,
      assetScopeOption,
      searchQuery
    });
  };

  const servicesCategory = data?.data?.categories.find(
    (x) => x.categoryName === "Services"
  ) ?? {
    categoryName: "Services",
    entries: []
  };

  const operationsCategory = data?.data?.categories.find(
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

  const insightsCategory = data?.data?.categories.find(
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
      title="Filters"
      filters={filterComponents}
      selectedFiltersCount={selectedFilters.length}
      onStateChange={handleOnStateChange}
    />
  );
};
