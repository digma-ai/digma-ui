import { ComponentType, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNull } from "../../../typeGuards/isNull";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { InsightType } from "../../../types";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { Select } from "../../common/Select";
import { WrenchIcon } from "../../common/icons/12px/WrenchIcon";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { SparkleIcon } from "../../common/icons/SparkleIcon";
import { IconProps } from "../../common/icons/types";
import { FilterButton } from "../FilterButton";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import {
  AssetFilterCategory,
  AssetFilterQuery,
  AssetsFilterProps,
  AssetsFiltersData
} from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

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
    })) || [];

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

export const AssetsFilter = (props: AssetsFilterProps) => {
  const [data, setData] = useState<{ data: AssetsFiltersData | null }>();
  const previousData = usePrevious(data);
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = usePrevious(isOpen);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<AssetFilterQuery>("assetsFilters", "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const refreshTimerId = useRef<number>();
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);

  const getData = (
    services: string[],
    operations: string[],
    insights: InsightType[]
  ) => {
    window.sendMessageToDigma({
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

  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      previousPersistedFilters !== persistedFilters
    ) {
      getData(
        persistedFilters?.services || selectedServices,
        persistedFilters?.operations || [
          ...selectedEndpoints,
          ...selectedConsumers,
          ...selectedInternals
        ],
        (persistedFilters?.insights as InsightType[]) || selectedInsights
      );
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights
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
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (
      isString(previousEnvironment) &&
      previousEnvironment !== config.environment
    ) {
      const defaultFilters = {
        services: [],
        operations: [],
        insights: []
      };
      setPersistedFilters(defaultFilters);
      props.onApply(defaultFilters);
      getData([], [], []);
    }
  }, [
    previousEnvironment,
    config.environment,
    setPersistedFilters,
    props.onApply
  ]);

  useEffect(() => {
    if (props.data) {
      setData({ data: props.data });
    }
  }, [props.data]);

  useEffect(() => {
    if (previousData !== data) {
      if (!isNull(data?.data)) {
        const servicesToSelect =
          data?.data?.categories
            .find((x) => x.categoryName === "Services")
            ?.entries?.filter((x) => x.selected)
            .map((x) => x.name) || [];
        setSelectedServices(servicesToSelect);

        const operationsCategory = data?.data?.categories.find(
          (x) => x.categoryName === "Operations"
        );

        const endpointsToSelect =
          operationsCategory?.categories
            ?.find((x) => x.categoryName === "Endpoints")
            ?.entries?.filter((x) => x.selected)
            .map((x) => x.name) || [];
        setSelectedEndpoints(endpointsToSelect);

        const consumersToSelect =
          operationsCategory?.categories
            ?.find((x) => x.categoryName === "Consumers")
            ?.entries?.filter((x) => x.selected)
            .map((x) => x.name) || [];
        setSelectedConsumers(consumersToSelect);

        const internalsToSelect =
          operationsCategory?.categories
            ?.find((x) => x.categoryName === "Internal")
            ?.entries?.filter((x) => x.selected)
            .map((x) => x.name) || [];
        setSelectedInternals(internalsToSelect);

        const insightsToSelect = (data?.data?.categories
          .find((x) => x.categoryName === "Insights")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) || []) as InsightType[];
        setSelectedInsights(insightsToSelect);

        if (!props.filters) {
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
          props.onApply(filtersQuery);
        }

        window.clearTimeout(refreshTimerId.current);
        refreshTimerId.current = window.setTimeout(() => {
          getData(
            servicesToSelect,
            [...endpointsToSelect, ...consumersToSelect, ...internalsToSelect],
            insightsToSelect
          );
        }, REFRESH_INTERVAL);
      } else {
        window.clearTimeout(refreshTimerId.current);
        refreshTimerId.current = window.setTimeout(() => {
          getData(
            selectedServices,
            [...selectedEndpoints, ...selectedConsumers, ...selectedInternals],
            selectedInsights
          );
        }, REFRESH_INTERVAL);
      }
    }
  }, [
    previousData,
    data,
    props.filters,
    props.onApply,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights,
    setPersistedFilters
  ]);

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
      props.onApply(filtersQuery);
      setPersistedFilters(filtersQuery);
      sendTrackingEvent(trackingEvents.FILTER_APPLIED);
    }
  }, [
    previousIsOpen,
    isOpen,
    props.onApply,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices,
    setPersistedFilters
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

  const servicesCategory = data?.data?.categories.find(
    (x) => x.categoryName === "Services"
  ) || {
    categoryName: "Services",
    entries: []
  };

  const operationsCategory = data?.data?.categories.find(
    (x) => x.categoryName === "Operations"
  );
  const endpointsCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Endpoints"
  ) || {
    categoryName: "Endpoints",
    entries: []
  };
  const consumersCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Consumers"
  ) || {
    categoryName: "Consumers",
    entries: []
  };
  const internalsCategory = operationsCategory?.categories?.find(
    (x) => x.categoryName === "Internal"
  ) || {
    categoryName: "Internal",
    entries: []
  };

  const insightsCategory = data?.data?.categories.find(
    (x) => x.categoryName === "Insights"
  ) || {
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
              (value) => getInsightTypeInfo(value)?.label || value
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
          isMenuOpen={isOpen}
          showCount={true}
          selectedCount={selectedFilters.length}
        />
      </div>
    </NewPopover>
  );
};
