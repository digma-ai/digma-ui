import { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { RECENT_ACTIVITY_CONTAINER_ID } from "..";
import { actions as globalActions } from "../../../actions";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { MenuList } from "../../Navigation/common/MenuList";
import { Popup } from "../../Navigation/common/Popup";
import { OpenDocumentationPayload } from "../../Navigation/types";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { PlusIcon } from "../../common/icons/12px/PlusIcon";
import { FourPointedStarIcon } from "../../common/icons/16px/FourPointedStarIcon";
import { HammerIcon } from "../../common/icons/16px/HammerIcon";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoIcon } from "../../common/icons/DigmaLogoIcon";
import { ThreeDotsIcon } from "../../common/icons/ThreeDotsIcon";
import { Direction } from "../../common/icons/types";
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
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);

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
    return (
      <NewButton
        label={"Add Environment"}
        size={"small"}
        icon={PlusIcon}
        onClick={props.onEnvironmentAdd}
      />
    );
  };

  const renderKebabMenuButton = () => {
    const boundaryEl =
      document.getElementById(RECENT_ACTIVITY_CONTAINER_ID) || undefined;

    const handleTroubleshootingClick = () => {
      window.sendMessageToDigma({
        action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
      });
      setIsKebabMenuOpen(false);
    };

    const handleInsightsOverviewClick = () => {
      window.sendMessageToDigma<OpenDocumentationPayload>({
        action: globalActions.OPEN_DOCUMENTATION,
        payload: {
          page: "environment-types"
        }
      });
      setIsKebabMenuOpen(false);
    };

    const handleSlackLinkClick = () => {
      openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
      setIsKebabMenuOpen(false);
    };

    return (
      <NewPopover
        boundary={boundaryEl}
        placement={"bottom-end"}
        onOpenChange={setIsKebabMenuOpen}
        isOpen={isKebabMenuOpen}
        content={
          <Popup>
            <MenuList
              items={[
                {
                  id: "insightsOverview",
                  label: "Insights Overview",
                  icon: (
                    <FourPointedStarIcon size={16} color={"currentColor"} />
                  ),
                  onClick: handleInsightsOverviewClick
                },
                {
                  id: "troubleshooting",
                  label: "Troubleshooting",
                  icon: <HammerIcon size={16} color={"currentColor"} />,
                  onClick: handleTroubleshootingClick
                },
                {
                  id: "slack",
                  label: "Digma Channel",
                  icon: <SlackLogoIcon size={16} color={"currentColor"} />,
                  onClick: handleSlackLinkClick
                }
              ]}
            />
          </Popup>
        }
      >
        <div>
          <NewButton buttonType={"tertiary"} icon={ThreeDotsIcon} />
        </div>
      </NewPopover>
    );
  };

  return (
    <s.Container>
      <s.LogoContainer>
        <DigmaLogoIcon size={20} />
      </s.LogoContainer>
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
        {renderKebabMenuButton()}
      </s.ButtonsContainer>
    </s.Container>
  );
};
