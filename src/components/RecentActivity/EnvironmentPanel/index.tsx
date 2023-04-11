import { useState } from "react";
import useDimensions from "react-cool-dimensions";
import { DefaultTheme, useTheme } from "styled-components";
import { IconButton } from "../../common/IconButton";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoFlatIcon } from "../../common/icons/DigmaLogoFlatIcon";
import { ListIcon } from "../../common/icons/ListIcon";
import { TableIcon } from "../../common/icons/TableIcon";
import { DIRECTION } from "../../common/icons/types";
import { EnvironmentTab } from "./EnvironmentTab";
import * as s from "./styles";
import { EnvironmentPanelProps, ScrollDirection } from "./types";

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
  const { observe, width, entry } = useDimensions();

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
    if (entry) {
      let delta = width;
      if (direction === "left") {
        delta *= -1;
      }

      let newScrollLeft = entry.target.scrollLeft + delta;

      const maxScrollLeft = entry.target.scrollWidth - width;
      if (newScrollLeft >= maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
      }

      if (newScrollLeft < 0) {
        newScrollLeft = 0;
      }

      setScrollLeft(newScrollLeft);
      entry.target.scrollLeft = newScrollLeft;
    }
  };

  const isCarouselButtonDisabled = (direction: ScrollDirection) => {
    if (entry) {
      if (direction === "left") {
        return scrollLeft === 0;
      }

      if (direction === "right") {
        return scrollLeft === entry.target.scrollWidth - width;
      }
    }

    return false;
  };

  const isLeftCarouselButtonDisabled = isCarouselButtonDisabled("left");
  const isRightCarouselButtonDisabled = isCarouselButtonDisabled("right");

  return (
    <s.BorderContainer>
      <s.Container>
        <s.LogoRotationContainer>
          <s.LogoContainer>
            <DigmaLogoFlatIcon size={22} />
          </s.LogoContainer>
        </s.LogoRotationContainer>
        <s.CarouselButton
          key={"left"}
          onClick={() => handleCarouselButtonClick("left")}
          disabled={isLeftCarouselButtonDisabled}
        >
          <ChevronIcon
            direction={DIRECTION.LEFT}
            color={getCarouselIconColor(theme, isLeftCarouselButtonDisabled)}
          />
        </s.CarouselButton>
        <s.EnvironmentList ref={observe}>
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
        <s.CarouselButton
          key={"right"}
          onClick={() => handleCarouselButtonClick("right")}
          disabled={isRightCarouselButtonDisabled}
        >
          <ChevronIcon
            direction={DIRECTION.RIGHT}
            color={getCarouselIconColor(theme, isRightCarouselButtonDisabled)}
          />
        </s.CarouselButton>
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
