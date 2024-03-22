import { useContext, useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { RECENT_ACTIVITY_CONTAINER_ID } from "..";
import { actions as globalActions } from "../../../actions";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { SetObservabilityPayload } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { MenuList } from "../../Navigation/common/MenuList";
import { ListItemIconContainer } from "../../Navigation/common/MenuList/styles";
import { Popup } from "../../Navigation/common/Popup";
import { ConfigContext } from "../../common/App/ConfigContext";
import { NewButton } from "../../common/NewButton";
import { NewPopover } from "../../common/NewPopover";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import { PlusIcon } from "../../common/icons/12px/PlusIcon";
import { HammerIcon } from "../../common/icons/16px/HammerIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/16px/OpenTelemetryLogoIcon";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DigmaLogoIcon } from "../../common/icons/DigmaLogoIcon";
import { ThreeDotsIcon } from "../../common/icons/ThreeDotsIcon";
import { Direction } from "../../common/icons/types";
import { AddEnvironmentDialog } from "../AddEnvironmentDialog";
import { trackingEvents } from "../tracking";
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
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
  const config = useContext(ConfigContext);

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

  const renderKebabMenuButton = () => {
    const boundaryEl =
      document.getElementById(RECENT_ACTIVITY_CONTAINER_ID) || undefined;

    const handleObservabilityChange = (value: boolean) => {
      sendTrackingEvent(trackingEvents.OBSERVABILITY_TOGGLE_SWITCHED, {
        value
      });
      window.sendMessageToDigma<SetObservabilityPayload>({
        action: globalActions.SET_OBSERVABILITY,
        payload: {
          isObservabilityEnabled: value
        }
      });
      setIsKebabMenuOpen(false);
    };

    const handleTroubleshootingClick = () => {
      window.sendMessageToDigma({
        action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
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
                  id: "observability",
                  customContent: (
                    <s.ObservabilityListItem>
                      <ListItemIconContainer>
                        <OpenTelemetryLogoIcon
                          size={16}
                          color={"currentColor"}
                        />
                      </ListItemIconContainer>
                      Observability
                      <s.ObservabilityToggleSwitchContainer>
                        <ToggleSwitch
                          label={""}
                          onChange={handleObservabilityChange}
                          checked={config.isObservabilityEnabled}
                        />
                      </s.ObservabilityToggleSwitchContainer>
                    </s.ObservabilityListItem>
                  )
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
