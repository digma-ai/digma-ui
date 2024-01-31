import { useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { InsightType } from "../../../types";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { Select } from "../../common/Select";
import { FilterButton } from "../FilterButton";
import { actions } from "../actions";
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
      counts={{
        total: items.length,
        filtered: items.filter((x) => x.enabled).length
      }}
    />
  );
};

export const AssetsFilter = (props: AssetsFilterProps) => {
  const [data, setData] = useState<AssetsFiltersData | null>();
  const [isOpen, setIsOpen] = useState(false);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<AssetFilterQuery>("assetsFilters", "project");
  const previousPersistedFilters = usePrevious(persistedFilters);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

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
    const handleData = (data: unknown, timeStamp: number) => {
      const filtersData = data as AssetsFiltersData | null;
      setData(filtersData);
      setLastSetDataTimeStamp(timeStamp);

      setSelectedServices(
        filtersData?.categories
          .find((x) => x.categoryName === "Services")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) || []
      );

      const operationsCategory = filtersData?.categories.find(
        (x) => x.categoryName === "Operations"
      );

      const selectedEndpoints =
        operationsCategory?.categories
          ?.find((x) => x.categoryName === "Endpoints")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) || [];
      setSelectedEndpoints(selectedEndpoints);

      const selectedConsumers =
        operationsCategory?.categories
          ?.find((x) => x.categoryName === "Consumers")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) || [];
      setSelectedConsumers(selectedConsumers);

      const selectedInternals =
        operationsCategory?.categories
          ?.find((x) => x.categoryName === "Internal")
          ?.entries?.filter((x) => x.selected)
          .map((x) => x.name) || [];
      setSelectedInternals(selectedInternals);

      const selectedInsights = (filtersData?.categories
        .find((x) => x.categoryName === "Insights")
        ?.entries?.filter((x) => x.selected)
        .map((x) => x.name) || []) as InsightType[];
      setSelectedInsights(selectedInsights);

      if (!props.filters) {
        const filtersQuery = {
          services: selectedServices,
          operations: [
            ...selectedEndpoints,
            ...selectedConsumers,
            ...selectedInternals
          ],
          insights: selectedInsights
        };

        setPersistedFilters(filtersQuery);
        props.onApply(filtersQuery);
      }
    };

    dispatcher.addActionListener(actions.SET_ASSET_FILTERS_DATA, handleData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ASSET_FILTERS_DATA,
        handleData
      );
      window.clearTimeout(refreshTimerId.current);
    };
  }, [
    props.filters,
    props.onApply,
    selectedConsumers,
    selectedEndpoints,
    selectedInsights,
    selectedInternals,
    selectedServices,
    setPersistedFilters
  ]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(
          selectedServices,
          [...selectedEndpoints, ...selectedConsumers, ...selectedInternals],
          selectedInsights
        );
      }, REFRESH_INTERVAL);
    }
  }, [
    lastSetDataTimeStamp,
    previousLastSetDataTimeStamp,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights
  ]);

  const handleClearFiltersButtonClick = () => {
    getData([], [], []);
  };

  const handleApplyButtonClick = () => {
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
    setIsOpen(false);
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
  ) || {
    categoryName: "Services",
    entries: []
  };

  const operationsCategory = data?.categories.find(
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

  const insightsCategory = data?.categories.find(
    (x) => x.categoryName === "Insights"
  ) || {
    categoryName: "Insights",
    entries: []
  };

  const areFiltersDefault = [
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights
  ].every((x) => x.length === 0);

  return (
    <NewPopover
      width={"calc(100% - 16px)"}
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          <s.FilterCategoryName>Services</s.FilterCategoryName>
          {renderFilterCategory(
            servicesCategory,
            "All",
            selectedServices,
            handleSelectedItemsChange
          )}
          <s.FilterCategoryName>Operations</s.FilterCategoryName>
          {renderFilterCategory(
            endpointsCategory,
            "Endpoints",
            selectedEndpoints,
            handleSelectedItemsChange
          )}
          {renderFilterCategory(
            consumersCategory,
            "Consumers",
            selectedConsumers,
            handleSelectedItemsChange
          )}
          {renderFilterCategory(
            internalsCategory,
            "Internal",
            selectedInternals,
            handleSelectedItemsChange
          )}
          <s.FilterCategoryName>Insights</s.FilterCategoryName>
          {insightsCategory &&
            renderFilterCategory(
              insightsCategory,
              "Insights",
              selectedInsights,
              handleSelectedItemsChange,
              (value) => getInsightTypeInfo(value)?.label || value
            )}
          <s.Footer>
            <NewButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              disabled={areFiltersDefault}
              onClick={handleClearFiltersButtonClick}
            />
            <NewButton label={"Apply"} onClick={handleApplyButtonClick} />
          </s.Footer>
        </s.Container>
      }
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <div>
        <FilterButton title={"Filters"} isMenuOpen={isOpen} />
      </div>
    </NewPopover>
  );
};
