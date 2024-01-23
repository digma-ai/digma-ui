import { useEffect, useState } from "react";
import { InsightType } from "../../../types";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { Select } from "../../common/Select";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { actions } from "../actions";
import * as s from "./styles";
import { FiltersMenuProps } from "./types";

const insights = Object.values(InsightType).map((x) => x);

export const FiltersMenu = (props: FiltersMenuProps) => {
  const [services, setServices] = useState<string[]>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedInsights, setSelectedInsights] = useState<InsightType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const serviceItems = (services || []).map((x) => ({
    value: x,
    label: x,
    selected: selectedServices.includes(x)
  }));

  const insightItems = insights
    .map((x) => ({
      value: x as string,
      label: getInsightTypeInfo(x)?.label || "",
      selected: selectedInsights.includes(x)
    }))
    .filter((x) => x.label.length > 0);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_ASSET_FILTERS_DATA
    });
  }, []);

  const handleServicesMenuItemClick = (service: string) => {
    const oldSelectedServices = selectedServices || [];
    const serviceIndex = oldSelectedServices.findIndex((x) => x === service);

    if (serviceIndex < 0) {
      setSelectedServices([...oldSelectedServices, service]);
    } else {
      setSelectedServices([
        ...oldSelectedServices.slice(0, serviceIndex),
        ...oldSelectedServices.slice(serviceIndex + 1)
      ]);
    }
  };

  const handleInsightsMenuItemClick = (insightType: string) => {
    // TODO:
  };

  const handleClearFiltersButtonClick = () => {
    setSelectedServices([]);
  };
  const handleApplyButtonClick = () => {
    // TODO: send filters message
  };

  const areFiltersSet = selectedServices.length > 0;

  return (
    <NewPopover
      content={
        <s.Container>
          <s.Header>Filters</s.Header>
          Services
          <Select
            title={"Services"}
            items={serviceItems}
            onItemClick={handleServicesMenuItemClick}
          />
          Operations
          <Select
            title={"Endpoints"}
            items={serviceItems}
            onItemClick={handleServicesMenuItemClick}
          />
          <Select
            title={"Consumers"}
            items={serviceItems}
            onItemClick={handleServicesMenuItemClick}
          />
          <Select
            title={"Internal"}
            items={serviceItems}
            onItemClick={handleServicesMenuItemClick}
          />
          Insights
          <Select
            title={"Insights"}
            items={insightItems}
            onItemClick={handleInsightsMenuItemClick}
          />
          <s.Footer>
            <NewButton
              buttonType={"tertiary"}
              label={"Clear filters"}
              disabled={areFiltersSet}
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
