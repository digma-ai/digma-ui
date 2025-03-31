import type { ComponentType } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { usePrevious } from "../../../hooks/usePrevious";
import { useGetAssetsFiltersQuery } from "../../../redux/services/digma";
import type {
  CategoryFilter,
  FilterEntry,
  GetAssetsFiltersPayload,
  GetAssetsFiltersResponse
} from "../../../redux/services/types";
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
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { AssetsFilterProps } from "./types";

const renderFilterCategory = (
  category: CategoryFilter,
  icon: ComponentType<IconProps>,
  placeholder: string,
  selectedValues: string[],
  onChange: (value: string | string[], categoryName?: string) => void,
  transformLabel?: (value: string) => string,
  sorter?: (a: FilterEntry, b: FilterEntry) => number
): JSX.Element => {
  const sortedEntries =
    (sorter ? [...(category.entries ?? [])].sort(sorter) : category.entries) ??
    [];

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

// TODO: move to AssetsContent
export const AssetsFilter = ({ popupBoundaryRef }: AssetsFilterProps) => {
  const [data, setData] = useState<GetAssetsFiltersResponse | null>();
  const previousData = usePrevious(data);
  const { filters, search: searchQuery, viewMode } = useAssetsSelector();
  const {
    setAssetsFilters: setFilters,
    setSelectedServices: setGloballySelectedServices
  } = useStore.getState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    selectedServices: globallySelectedServices,
    environment,
    scope,
    backendInfo
  } = useConfigSelector();
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isServicesFilterEnabled = !scopeSpanCodeObjectId;
  const [selectedServices, setSelectedServices] = useState<string[]>(
    isServicesFilterEnabled ? globallySelectedServices ?? [] : []
  );
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>(
    filters?.endpoints ?? []
  );
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>(
    filters?.consumers ?? []
  );
  const [selectedInternals, setSelectedInternals] = useState<string[]>(
    filters?.internals ?? []
  );
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>(
    filters?.insights ?? []
  );
  const previousEnvironment = usePrevious(environment);
  const previousScope = usePrevious(scope);
  const areExtendedAssetsFiltersEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.AreExtendedAssetsFiltersEnabled
  );

  const payload: GetAssetsFiltersPayload = useMemo(() => {
    const operations = [
      ...selectedEndpoints,
      ...selectedConsumers,
      ...selectedInternals
    ];

    return {
      services:
        isServicesFilterEnabled && selectedServices.length > 0
          ? selectedServices.join(",")
          : undefined,
      operations: operations.length > 0 ? operations.join(",") : undefined,
      insights:
        selectedInsights.length > 0 ? selectedInsights.join(",") : undefined,
      directOnly:
        areExtendedAssetsFiltersEnabled && scopeSpanCodeObjectId
          ? viewMode === "children"
          : undefined,
      scopedSpanCodeObjectId: areExtendedAssetsFiltersEnabled
        ? scopeSpanCodeObjectId
        : undefined,
      displayName:
        areExtendedAssetsFiltersEnabled && searchQuery.length > 0
          ? searchQuery
          : undefined,
      environment: environment?.id
    };
  }, [
    isServicesFilterEnabled,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights,
    viewMode,
    searchQuery,
    scopeSpanCodeObjectId,
    areExtendedAssetsFiltersEnabled,
    environment
  ]);

  const { data: assetsFiltersData } = useGetAssetsFiltersQuery(payload, {
    skip: !environment || !isPopupOpen
  });

  useEffect(() => {
    if (assetsFiltersData) {
      setData(assetsFiltersData);
    }
  }, [assetsFiltersData]);

  // Clear filters when environment is changed
  useEffect(() => {
    if (
      isEnvironment(previousEnvironment) &&
      previousEnvironment.id !== environment?.id
    ) {
      const defaultFilters = {
        services: [],
        endpoints: [],
        consumers: [],
        internals: [],
        insights: []
      };

      setFilters(defaultFilters);
    }
  }, [
    setFilters,
    previousEnvironment,
    environment,
    isServicesFilterEnabled,
    setGloballySelectedServices
  ]);

  // Clear filters when scope is changed, but keep selected services
  useEffect(() => {
    if (
      previousScope &&
      previousScope.span?.spanCodeObjectId !== scopeSpanCodeObjectId
    ) {
      setFilters({
        services: selectedServices,
        endpoints: [],
        consumers: [],
        internals: [],
        insights: []
      });
      if (isServicesFilterEnabled) {
        setGloballySelectedServices(selectedServices);
      }
    }
  }, [
    setFilters,
    setGloballySelectedServices,
    previousScope,
    scopeSpanCodeObjectId,
    selectedServices,
    isServicesFilterEnabled
  ]);

  const discardChanges = useCallback(() => {
    const services = isServicesFilterEnabled
      ? globallySelectedServices ?? []
      : [];
    setSelectedServices(services ?? []);
    setSelectedEndpoints(filters?.endpoints ?? []);
    setSelectedConsumers(filters?.consumers ?? []);
    setSelectedInternals(filters?.internals ?? []);
    setSelectedInsights(filters?.insights ?? []);
  }, [filters, isServicesFilterEnabled, globallySelectedServices]);

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

  // Update selected filters when data is fetched
  useEffect(() => {
    if (previousData === data || isNull(data)) {
      return;
    }

    if (isServicesFilterEnabled) {
      const servicesToSelect =
        data?.categories
          .find((x) => x.categoryName === "Services")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) ?? [];

      setSelectedServices(servicesToSelect);
    }

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
  }, [previousData, data, isServicesFilterEnabled]);

  useEffect(() => {
    if (isServicesFilterEnabled && globallySelectedServices) {
      setSelectedServices(globallySelectedServices);
    }
  }, [isServicesFilterEnabled, globallySelectedServices]);

  useEffect(() => {
    if (filters) {
      if (isServicesFilterEnabled) {
        setSelectedServices(filters.services);
      }

      setSelectedEndpoints(filters.endpoints);
      setSelectedConsumers(filters.consumers);
      setSelectedInternals(filters.internals);
      setSelectedInsights(filters.insights);
    }
  }, [filters, isServicesFilterEnabled]);

  const handleClearFiltersButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.CLEAR_FILTERS_BUTTON_CLICKED);

    setSelectedServices([]);
    setSelectedEndpoints([]);
    setSelectedConsumers([]);
    setSelectedInternals([]);
    setSelectedInsights([]);
  };

  const handleSelectedItemsChange = (
    value: string | string[],
    category?: string
  ) => {
    const newValue = Array.isArray(value) ? value : [value];

    switch (category) {
      case "Services":
        setSelectedServices(newValue);
        break;
      case "Endpoints":
        setSelectedEndpoints(newValue);
        break;
      case "Consumers":
        setSelectedConsumers(newValue);
        break;
      case "Internal":
        setSelectedInternals(newValue);
        break;
      case "Insights":
        setSelectedInsights(newValue as InsightType[]);
        break;
    }
  };

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
      boundaryRef={popupBoundaryRef}
    />
  );
};
