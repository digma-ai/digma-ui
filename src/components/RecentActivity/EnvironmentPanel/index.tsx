import { useContext, useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { DefaultTheme, useTheme } from "styled-components";
import { RECENT_ACTIVITY_CONTAINER_ID } from "..";
import { ConfigContext } from "../../common/App/ConfigContext";
import { IconButton } from "../../common/IconButton";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoFlatDetailedIcon } from "../../common/icons/DigmaLogoFlatDetailedIcon";
import { ListIcon } from "../../common/icons/ListIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import { TableIcon } from "../../common/icons/TableIcon";
import { Direction } from "../../common/icons/types";
import { AddEnvironmentDialog } from "../AddEnvironmentDialog";
import { ExtendedEnvironment } from "../types";
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

const getPlusButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#494b57";
    case "dark":
    case "dark-jetbrains":
      return "#dfe1e5";
  }
};

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const theme = useTheme();
  const [scrollLeft, setScrollLeft] = useState(0);
  const environmentListContainerDimensions = useDimensions();
  const environmentListDimensions = useDimensions();
  const plusButtonIconColor = getPlusButtonIconColor(theme);
  const [isAddEnvironmentDialogOpen, setIsAddEnvironmentDialogOpen] =
    useState(false);
  const config = useContext(ConfigContext);
  const isAddButtonVisible =
    config.digmaStatus?.isRunning &&
    window.recentActivityIsEnvironmentManagementEnabled === true;

  useEffect(() => {
    const entry = environmentListContainerDimensions.entry;
    if (entry) {
      setScrollLeft(entry.target.scrollLeft);
    }
  }, [
    environmentListContainerDimensions.entry,
    environmentListDimensions.entry
  ]);

  const handleEnvironmentTabClick = (environment: ExtendedEnvironment) => {
    props.onEnvironmentSelect(environment);
  };

  const icons = {
    list: ListIcon,
    table: TableIcon
  };

  const handleViewModeButtonClick = () => {
    const mode = props.viewMode === "table" ? "list" : "table";
    props.onViewModeChange(mode);
  };

  const handleCloseAddEnvironmentDialog = () => {
    setIsAddEnvironmentDialogOpen(false);
  };

  const handleEnvironmentAdd = (environmentName: string) => {
    props.onEnvironmentAdd(environmentName);
    // props.onEnvironmentSelect(newEnvironment);
  };

  const handleEnvironmentDelete = (environment: string) => {
    props.onEnvironmentDelete(environment);
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

  const renderAddButton = () => {
    const boundaryEl =
      document.getElementById(RECENT_ACTIVITY_CONTAINER_ID) || undefined;

    return (
      <NewPopover
        boundary={boundaryEl}
        placement={"bottom-start"}
        onOpenChange={setIsAddEnvironmentDialogOpen}
        isOpen={isAddEnvironmentDialogOpen}
        content={
          <AddEnvironmentDialog
            onClose={handleCloseAddEnvironmentDialog}
            onEnvironmentAdd={handleEnvironmentAdd}
            environments={props.environments}
          />
        }
      >
        <div>
          <s.AddButton>
            <PlusIcon color={plusButtonIconColor} />
          </s.AddButton>
        </div>
      </NewPopover>
    );
  };

  return (
    <s.BorderContainer>
      <s.Container>
        <s.LogoRotationContainer>
          <s.LogoContainer>
            <DigmaLogoFlatDetailedIcon color={"#5154ec"} size={22} />
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
                environment={environment}
                isSelected={
                  props.selectedEnvironment?.name === environment.name
                }
                onClick={handleEnvironmentTabClick}
                onEnvironmentDelete={handleEnvironmentDelete}
              />
            ))}
          </s.EnvironmentList>
          {!areCarouselButtonsVisible &&
            isAddButtonVisible &&
            renderAddButton()}
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
        {areCarouselButtonsVisible && isAddButtonVisible && renderAddButton()}
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
