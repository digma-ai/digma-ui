import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { Environment } from "../../common/App/types";
import { EnvironmentIcon } from "../../common/EnvironmentIcon";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { Direction } from "../../common/icons/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { MenuList } from "../common/MenuList";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentBarProps } from "./types";

export const EnvironmentBar = ({
  environments,
  onEnvironmentChange,
  selectedEnvironment
}: EnvironmentBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDisabled = environments.length === 0;

  const renderEnvironmentMenu = () => {
    const handleMenuItemClick = (environment: Environment) => {
      setIsMenuOpen(false);
      onEnvironmentChange(environment);
    };

    return (
      <s.EnvironmentMenuPopup height={"140px"}>
        <MenuList
          items={environments.map((x) => ({
            id: x.id,
            label: x.name,
            onClick: () => handleMenuItemClick(x),
            icon: <EnvironmentIcon environment={x} />
          }))}
        />
      </s.EnvironmentMenuPopup>
    );
  };

  const renderEnvironmentBar = () => {
    const environmentName = selectedEnvironment?.name ?? "No environments";

    const handleEnvironmentBarClick = () => {
      if (!isDisabled) {
        sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_BAR_CLICKED);
      }
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <s.EnvironmentBar
        $isDisabled={isDisabled}
        $isMenuOpen={isMenuOpen}
        onClick={handleEnvironmentBarClick}
      >
        <s.EnvironmentIconContainer>
          {selectedEnvironment ? (
            <EnvironmentIcon environment={selectedEnvironment} />
          ) : (
            <GlobeIcon size={16} color={"currentColor"} />
          )}
        </s.EnvironmentIconContainer>
        <Tooltip title={environmentName}>
          <s.SelectedEnvironmentName>
            {environmentName}
          </s.SelectedEnvironmentName>
        </Tooltip>
        <s.ChevronIconContainer>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={isMenuOpen ? Direction.UP : Direction.DOWN}
          />
        </s.ChevronIconContainer>
      </s.EnvironmentBar>
    );
  };

  const handleEnvironmentMenuOpenChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  // TODO: refactor
  return !isDisabled && isMenuOpen ? (
    <NewPopover
      content={renderEnvironmentMenu()}
      onOpenChange={handleEnvironmentMenuOpenChange}
      isOpen={isMenuOpen}
      placement={"bottom"}
      sameWidth={true}
    >
      {renderEnvironmentBar()}
    </NewPopover>
  ) : (
    renderEnvironmentBar()
  );
};
