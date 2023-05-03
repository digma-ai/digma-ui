import { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { DefaultTheme, useTheme } from "styled-components";
import { IconButton } from "../../common/IconButton";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoFlatIcon } from "../../common/icons/DigmaLogoFlatIcon";
import { ListIcon } from "../../common/icons/ListIcon";
import { TableIcon } from "../../common/icons/TableIcon";
import { Direction } from "../../common/icons/types";
import { EnvironmentTab } from "./EnvironmentTab";
import * as s from "./styles";
import { EnvironmentPanelProps, ScrollDirection } from "./types";

const FONT_WIDTH_TRANSITION_THRESHOLD = 5; // in pixels

const getCarouselIconColor = (theme: DefaultTheme, isDisabled: boolean) => {
  switch (theme.mode) {
    case "light":
      return isDisabled ? "#b9c0d4" : "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return isDisabled ? "#7c7c94" : "#e2e7ff";
  }
};

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const theme = useTheme();
  const [scrollLeft, setScrollLeft] = useState(0);
  const environmentListContainerDimensions = useDimensions();
  const environmentListDimensions = useDimensions();

  useEffect(() => {
    const entry = environmentListContainerDimensions.entry;
    if (entry) {
      setScrollLeft(entry.target.scrollLeft);
    }
  }, [
    environmentListContainerDimensions.entry,
    environmentListDimensions.entry
  ]);

  const handleEnvironmentTabClick = (name: string) => {
    props.onEnvironmentSelect(name);
  };

  const icons = {
    list: ListIcon,
    table: TableIcon
  };

  const handleViewModeButtonClick = () => {
    const mode = props.viewMode === "table" ? "list" : "table";
    props.onViewModeChange(mode);
  };

  const handleCarouselButtonClick = (direction: ScrollDirection) => {
    const { entry: containerEntry, width: containerWidth } =
      environmentListContainerDimensions;
    const { entry } = environmentListDimensions;

    if (containerEntry && entry) {
      let delta = containerWidth;
      if (direction === "left") {
        delta *= -1;
      }

      let newScrollLeft = containerEntry.target.scrollLeft + delta;

      const maxScrollLeft = containerEntry.target.scrollWidth - containerWidth;
      if (newScrollLeft >= maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
      }

      if (newScrollLeft < 0) {
        newScrollLeft = 0;
      }

      setScrollLeft(newScrollLeft);
      containerEntry.target.scrollLeft = newScrollLeft;
    }
  };

  const isCarouselButtonDisabled = (direction: ScrollDirection) => {
    const { entry: containerEntry, width: containerWidth } =
      environmentListContainerDimensions;
    const { entry } = environmentListDimensions;

    if (containerEntry && entry) {
      if (direction === "left") {
        return scrollLeft === 0;
      }

      if (direction === "right") {
        return (
          scrollLeft + containerWidth + FONT_WIDTH_TRANSITION_THRESHOLD >=
          containerEntry.target.scrollWidth
        );
      }
    }

    return false;
  };

  const isLeftCarouselButtonDisabled = isCarouselButtonDisabled("left");
  const isRightCarouselButtonDisabled = isCarouselButtonDisabled("right");

  const areCarouselButtonsVisible =
    environmentListDimensions.width -
      environmentListContainerDimensions.width >=
    FONT_WIDTH_TRANSITION_THRESHOLD;

  return (
    <s.BorderContainer>
      <s.Container>
        <s.LogoRotationContainer>
          <s.LogoContainer>
            <DigmaLogoFlatIcon size={22} />
          </s.LogoContainer>
        </s.LogoRotationContainer>
        <s.CarouselButtonContainer key={"left"}>
          {areCarouselButtonsVisible && (
            <s.CarouselButton
              onClick={() => handleCarouselButtonClick("left")}
              disabled={isLeftCarouselButtonDisabled}
            >
              <ChevronIcon
                direction={Direction.LEFT}
                color={getCarouselIconColor(
                  theme,
                  isLeftCarouselButtonDisabled
                )}
              />
            </s.CarouselButton>
          )}
        </s.CarouselButtonContainer>
        <s.EnvironmentListContainer
          ref={environmentListContainerDimensions.observe}
        >
          <s.EnvironmentList ref={environmentListDimensions.observe}>
            {props.environments.map((environment) => (
              <EnvironmentTab
                key={environment.name}
                text={environment.name}
                hasBadge={environment.hasBadge}
                isSelected={props.selectedEnvironment === environment.name}
                onClick={handleEnvironmentTabClick}
              />
            ))}
          </s.EnvironmentList>
        </s.EnvironmentListContainer>
        <s.CarouselButtonContainer key={"right"}>
          {areCarouselButtonsVisible && (
            <s.CarouselButton
              onClick={() => handleCarouselButtonClick("right")}
              disabled={isRightCarouselButtonDisabled}
            >
              <ChevronIcon
                direction={Direction.RIGHT}
                color={getCarouselIconColor(
                  theme,
                  isRightCarouselButtonDisabled
                )}
              />
            </s.CarouselButton>
          )}
        </s.CarouselButtonContainer>
        <s.ViewModeButtonContainer>
          <IconButton
            icon={icons[props.viewMode]}
            onClick={handleViewModeButtonClick}
          />
        </s.ViewModeButtonContainer>
      </s.Container>
    </s.BorderContainer>
  );
};
