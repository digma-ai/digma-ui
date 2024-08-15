import { ComponentType, useEffect, useState } from "react";
import { useAssetsStore } from "../../../containers/Main/stores/useAssetsStore";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNull } from "../../../typeGuards/isNull";
import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { FilterButton } from "../../common/FilterButton";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { Select } from "../../common/Select";
import { WrenchIcon } from "../../common/icons/12px/WrenchIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { SparkleIcon } from "../../common/icons/SparkleIcon";
import { IconProps } from "../../common/icons/types";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import {
  AssetFilterCategory,
  AssetsFiltersData,
  GetAssetFiltersDataPayload
} from "./types";

const getData = (
  services: string[],
  operations: string[],
  insights: InsightType[]
) => {
  window.sendMessageToDigma<GetAssetFiltersDataPayload>({
    action: actions.GET_ASSET_FILTERS_DATA,
    payload: {
      query: {
        services,
        operations,
        insights
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
    <Select
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
  const filters = useAssetsStore.use.filters();
  const setFilters = useAssetsStore.use.setFilters();
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(isOpen);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  // const environment = useGlobalStore.use.environment();
  // const scope = useGlobalStore.use.scope();
  // const previousEnvironment = usePrevious(environment);
  // const previousScope = usePrevious(scope);

  useEffect(() => {
    getData(
      filters.services,
      filters.operations,
      filters.insights as InsightType[]
    );
  }, [filters]);

  useEffect(() => {
    const handleData = (data: unknown) => {
      const filtersData = data as AssetsFiltersData | null;
      setData(filtersData);

      if (isNull(filtersData)) {
        return;
      }

      const servicesToSelect =
        filtersData.categories
          .find((x) => x.categoryName === "Services")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) ?? [];
      setSelectedServices(servicesToSelect);

      const operationsCategory = filtersData.categories.find(
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

      const insightsToSelect = (filtersData.categories
        .find((x) => x.categoryName === "Insights")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) ?? []) as InsightType[];
      setSelectedInsights(insightsToSelect);
    };

    dispatcher.addActionListener(actions.SET_ASSET_FILTERS_DATA, handleData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ASSET_FILTERS_DATA,
        handleData
      );
    };
  }, []);

  // Get data when the popover is opened
  useEffect(() => {
    if (isOpen && !previousIsOpen) {
      getData(
        filters.services,
        filters.operations,
        filters.insights as InsightType[]
      );
    }
  }, [isOpen, filters, previousIsOpen]);

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
      setFilters(filtersQuery);
      sendTrackingEvent(trackingEvents.FILTER_APPLIED);
    }
  }, [
    previousIsOpen,
    isOpen,
    setFilters,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices
  ]);

  const handleClearFiltersButtonClick = () => {
    getData([], [], []);
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

    getData(services, [...endpoints, ...consumers, ...internals], insights);
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
    ...selectedServices,
    ...selectedEndpoints,
    ...selectedConsumers,
    ...selectedInternals,
    ...selectedInsights
  ];

  return (
    <NewPopover
      width={"calc(100% - 16px)"}
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          <s.FilterCategoryName>Services</s.FilterCategoryName>
          {renderFilterCategory(
            servicesCategory,
            WrenchIcon,
            selectedServices.length > 0 ? "Services" : "All",
            selectedServices,
            handleSelectedItemsChange
          )}
          <s.FilterCategoryName>Operations</s.FilterCategoryName>
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
          <s.FilterCategoryName>Insights</s.FilterCategoryName>
          {insightsCategory &&
            renderFilterCategory(
              insightsCategory,
              SparkleIcon,
              "Insights",
              selectedInsights,
              handleSelectedItemsChange,
              (value) => getInsightTypeInfo(value)?.label ?? value
            )}
          <s.Footer>
            <NewButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              disabled={selectedFilters.length === 0}
              onClick={handleClearFiltersButtonClick}
            />
          </s.Footer>
        </s.Container>
      }
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <div>
        <FilterButton
          title={"Filters"}
          showCount={true}
          selectedCount={selectedFilters.length}
          isActive={isOpen}
        />
      </div>
    </NewPopover>
  );
};
