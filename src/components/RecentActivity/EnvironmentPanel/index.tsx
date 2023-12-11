import { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { RECENT_ACTIVITY_CONTAINER_ID } from "..";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoIcon } from "../../common/icons/DigmaLogoIcon";
import { PlusIcon } from "../../common/icons/PlusIcon";
import { Direction } from "../../common/icons/types";
import { AddEnvironmentDialog } from "../AddEnvironmentDialog";
import { ExtendedEnvironment } from "../types";
import { EnvironmentTab } from "./EnvironmentTab";
import * as s from "./styles";
import { EnvironmentPanelProps, ScrollDirection } from "./types";

const FONT_WIDTH_TRANSITION_THRESHOLD = 5; // in pixels

const isAddButtonVisible =
  window.recentActivityIsEnvironmentManagementEnabled === true;

export const EnvironmentPanel = (props: EnvironmentPanelProps) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const environmentListContainerDimensions = useDimensions();
  const environmentListDimensions = useDimensions();
  const [isAddEnvironmentDialogOpen, setIsAddEnvironmentDialogOpen] =
    useState(false);

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

  const handleCloseAddEnvironmentDialog = () => {
    setIsAddEnvironmentDialogOpen(false);
  };

  const handleEnvironmentAdd = (environmentName: string) => {
    props.onEnvironmentAdd(environmentName);
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
        placement={"bottom-end"}
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
          <NewButton label={"Add Environment"} size={"small"} icon={PlusIcon} />
        </div>
      </NewPopover>
    );
  };

  return (
    <s.Container>
      <s.LogoRotationContainer>
        <s.LogoContainer>
          <DigmaLogoIcon size={12} />
        </s.LogoContainer>
      </s.LogoRotationContainer>
      <s.Divider />
      <s.CarouselButtonContainer key={"left"}>
        {areCarouselButtonsVisible && (
          <s.CarouselButton
            onClick={() => handleCarouselButtonClick("left")}
            disabled={isLeftCarouselButtonDisabled}
          >
            <ChevronIcon direction={Direction.LEFT} color={"currentColor"} />
          </s.CarouselButton>
        )}
      </s.CarouselButtonContainer>
      <s.EnvironmentListContainer
        ref={environmentListContainerDimensions.observe}
      >
        <s.EnvironmentList ref={environmentListDimensions.observe}>
          {props.environments.map((environment) => (
            <EnvironmentTab
              key={environment.originalName}
              environment={environment}
              isSelected={
                props.selectedEnvironment?.originalName ===
                environment.originalName
              }
              onClick={handleEnvironmentTabClick}
              onEnvironmentDelete={handleEnvironmentDelete}
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
            <ChevronIcon direction={Direction.RIGHT} color={"currentColor"} />
          </s.CarouselButton>
        )}
      </s.CarouselButtonContainer>
      <s.ButtonsContainer>
        {isAddButtonVisible && renderAddButton()}
      </s.ButtonsContainer>
    </s.Container>
  );
};
