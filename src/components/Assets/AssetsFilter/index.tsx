import type { ComponentType } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { useAssetsSelector } from "../../../store/assets/useAssetsSelector";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { useStore } from "../../../store/useStore";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNull } from "../../../typeGuards/isNull";
import type { InsightType } from "../../../types";
import { FeatureFlag } from "../../../types";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { FilterPopup } from "../../common/FilterPopup";
import { WrenchIcon } from "../../common/icons/12px/WrenchIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { SparkleIcon } from "../../common/icons/SparkleIcon";
import type { IconProps } from "../../common/icons/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type {
  AssetFilterCategory,
  AssetFilterEntry,
  AssetsFiltersData,
  GetAssetFiltersDataParams,
  GetAssetFiltersDataPayload
} from "./types";

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
        services: !scopeSpanCodeObjectId ? services : [],
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
  transformLabel?: (value: string) => string,
  sorter?: (a: AssetFilterEntry, b: AssetFilterEntry) => number
): JSX.Element => {
  const sortedEntries =
    (sorter ? category.entries?.sort(sorter) : category.entries) ?? [];

  const items =
    sortedEntries.map((entry) => ({
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
      disabled={sortedEntries.length === 0}
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const previousIsOpen = usePrevious(isPopupOpen);
  const {
    selectedServices: globallySelectedServices,
    environment,
    scope,
    backendInfo
  } = useConfigSelector();

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
      operations: [
        ...selectedEndpoints,
        ...selectedConsumers,
        ...selectedInternals
      ],
      insights: selectedInsights,
      viewMode: areExtendedAssetsFiltersEnabled ? viewMode : undefined,
      scopeSpanCodeObjectId: areExtendedAssetsFiltersEnabled
        ? scopeSpanCodeObjectId
        : undefined,
      searchQuery: areExtendedAssetsFiltersEnabled ? searchQuery : ""
    }),
    [
      isServicesFilterEnabled,
      selectedServices,
      selectedEndpoints,
      selectedConsumers,
      selectedInternals,
      selectedInsights,
      viewMode,
      searchQuery,
      scopeSpanCodeObjectId,
      areExtendedAssetsFiltersEnabled
    ]
  );

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
      setSelectedServices([]);
      setSelectedEndpoints([]);
      setSelectedConsumers([]);
      setSelectedInternals([]);
      setSelectedInsights([]);

      const defaultFilters = {
        services: [],
        endpoints: [],
        consumers: [],
        internals: [],
        insights: []
      };
      setFilters(defaultFilters);
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
    isServicesFilterEnabled,
    setGloballySelectedServices,
    query
  ]);

  // Clear filters and get data when scope is changed, but keep selected services
  useEffect(() => {
    if (
      previousScope &&
      previousScope.span?.spanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setSelectedEndpoints([]);
      setSelectedConsumers([]);
      setSelectedInternals([]);
      setSelectedInsights([]);

      if (isServicesFilterEnabled) {
        setGloballySelectedServices(selectedServices);
      }
      setFilters({
        services: selectedServices,
        endpoints: [],
        consumers: [],
        internals: [],
        insights: []
      });
      getData({
        ...query,
        services: selectedServices,
        operations: [],
        insights: []
      });
    }
  }, [
    setFilters,
    setGloballySelectedServices,
    previousScope,
    scopeSpanCodeObjectId,
    selectedServices,
    isServicesFilterEnabled,
    query
  ]);

  const discardChanges = useCallback(() => {
    setSelectedServices(globallySelectedServices ?? []);
    setSelectedEndpoints(filters?.endpoints ?? []);
    setSelectedConsumers(filters?.consumers ?? []);
    setSelectedInternals(filters?.internals ?? []);
    setSelectedInsights((filters?.insights as InsightType[]) ?? []);

    getData({
      ...query,
      services: globallySelectedServices ?? [],
      operations: [
        ...(filters?.endpoints ?? []),
        ...(filters?.consumers ?? []),
        ...(filters?.internals ?? [])
      ],
      insights: (filters?.insights as InsightType[]) ?? []
    });
  }, [globallySelectedServices, filters, query]);

  // Close popup on environment or scope changes
  useEffect(() => {
    if (
      previousEnvironment?.id !== environment?.id ||
      previousScope?.span?.spanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setIsPopupOpen(false);

      discardChanges();
    }
  }, [
    environment,
    scopeSpanCodeObjectId,
    previousEnvironment,
    previousScope,
    discardChanges
  ]);

  // Get data when the popover is opened
  useEffect(() => {
    if (isPopupOpen && !previousIsOpen) {
      getData(query);
    }
  }, [isPopupOpen, previousIsOpen, query]);

  // Update selected filters when data is fetched
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
  }, [previousData, data]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.CLEAR_FILTERS_BUTTON_CLICKED);

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

  const selectedFiltersCount = [
    ...(isServicesFilterEnabled ? selectedServices : []),
    ...selectedEndpoints,
    ...selectedConsumers,
    ...selectedInternals,
    ...selectedInsights
  ].length;

  const appliedFiltersCount = filters
    ? [
        ...(isServicesFilterEnabled ? globallySelectedServices ?? [] : []),
        ...filters.endpoints,
        ...filters.consumers,
        ...filters.internals,
        ...filters.insights
      ].length
    : 0;

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.FILTERS_POPUP_CLOSE_BUTTON_CLICKED
    );

    setIsPopupOpen(false);

    discardChanges();
  };

  const handleFiltersButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FILTERS_BUTTON_CLICKED);

    setIsPopupOpen(!isPopupOpen);

    if (isPopupOpen) {
      discardChanges();
    }
  };

  const handleApplyButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.FILTERS_POPUP_APPLY_FILTERS_BUTTON_CLICKED
    );

    setIsPopupOpen(false);

    const newServices = isServicesFilterEnabled ? selectedServices : [];

    setFilters({
      services: newServices,
      endpoints: selectedEndpoints,
      consumers: selectedConsumers,
      internals: selectedInternals,
      insights: selectedInsights
    });

    if (isServicesFilterEnabled) {
      setGloballySelectedServices(newServices);
    }

    sendTrackingEvent(trackingEvents.FILTER_APPLIED);
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
        handleSelectedItemsChange,
        undefined,
        (a, b) => a.name.localeCompare(b.name)
      )
    });
  }

  return (
    <FilterPopup
      onApply={handleApplyButtonClick}
      onClose={handleCloseButtonClick}
      onClearAll={handleClearFiltersButtonClick}
      title={"Filters"}
      filters={filterComponents}
      selectedFiltersCount={selectedFiltersCount}
      appliedFiltersCount={appliedFiltersCount}
      isOpen={isPopupOpen}
      onFiltersButtonClick={handleFiltersButtonClick}
    />
  );
};
