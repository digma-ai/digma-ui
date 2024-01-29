import { useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { InsightType } from "../../../types";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { Select } from "../../common/Select";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { actions } from "../actions";
import * as s from "./styles";
import {
  AssetFilterCategory,
  AssetsFilterProps,
  AssetsFiltersData
} from "./types";

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
  const [data, setData] = useState<AssetsFiltersData>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [selectedConsumers, setSelectedConsumers] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const [areFiltersApplied, setAreFiltersApplied] = useState(true);
  const previousAreFiltersApplied = usePrevious(areFiltersApplied);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_ASSET_FILTERS_DATA,
      payload: {}
    });

    const handleData = (data: unknown) => {
      const filtersData = data as AssetsFiltersData;
      setData(filtersData);
      setAreFiltersApplied(true);
    };

    dispatcher.addActionListener(actions.SET_ASSET_FILTERS_DATA, handleData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ASSET_FILTERS_DATA,
        handleData
      );
    };
  }, []);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (isBoolean(previousAreFiltersApplied) && !areFiltersApplied) {
      window.sendMessageToDigma({
        action: actions.GET_ASSET_FILTERS_DATA,
        payload: {
          services: selectedServices,
          operations: [
            ...selectedEndpoints,
            ...selectedConsumers,
            ...selectedInternals
          ],
          insights: selectedInsights
        }
      });
    }
  }, [
    previousAreFiltersApplied,
    areFiltersApplied,
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights
  ]);

  const handleClearFiltersButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.GET_ASSET_FILTERS_DATA,
      payload: {}
    });
  };

  const handleApplyButtonClick = () => {
    props.onApply({
      services: selectedServices,
      operations: [
        ...selectedEndpoints,
        ...selectedConsumers,
        ...selectedInternals
      ],
      insights: selectedInsights
    });
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

    setAreFiltersApplied(false);
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

  const isClearFiltersButtonDisabled = [
    selectedServices,
    selectedEndpoints,
    selectedConsumers,
    selectedInternals,
    selectedInsights
  ].every((x) => x.length === 0);

  return (
    <NewPopover
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
              disabled={isClearFiltersButtonDisabled}
              onClick={handleClearFiltersButtonClick}
            />
            <NewButton
              label={"Apply"}
              onClick={handleApplyButtonClick}
              disabled={areFiltersApplied}
            />
          </s.Footer>
        </s.Container>
      }
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <s.MenuButton>
        Filters
        <s.MenuButtonChevronIconContainer>
          <ChevronIcon
            color={"currentColor"}
            size={14}
            direction={isOpen ? Direction.UP : Direction.DOWN}
          />
        </s.MenuButtonChevronIconContainer>
      </s.MenuButton>
    </NewPopover>
  );
};
