import { useMemo, useState } from "react";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import type { Environment } from "../../common/App/types";
import { EnvironmentIcon } from "../../common/EnvironmentIcon";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/12px/ChevronIcon";
import { GlobeIcon } from "../../common/icons/12px/GlobeIcon";
import { Direction } from "../../common/icons/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import { EnvironmentMenu } from "./EnvironmentMenu";
import * as s from "./styles";
import type { EnvironmentBarProps } from "./types";

export const EnvironmentBar = ({
  environments,
  onEnvironmentChange,
  selectedEnvironment
}: EnvironmentBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sortedEnvironments = useMemo(
    () => [...environments].sort((a, b) => a.name.localeCompare(b.name)),
    [environments]
  );

  const isDisabled = sortedEnvironments.length === 0;

  const handleMenuItemClick = (environment: Environment) => {
    setIsMenuOpen(false);
    onEnvironmentChange(environment);
  };

  const renderEnvironmentBar = () => {
    const environmentName = selectedEnvironment?.name ?? "";

    const handleEnvironmentBarClick = () => {
      if (!isDisabled) {
        sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_BAR_CLICKED);
      }
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <s.EnvironmentBar
        $isDisabled={isDisabled}
        onClick={handleEnvironmentBarClick}
      >
        <s.EnvironmentIconContainer>
          {selectedEnvironment ? (
            <EnvironmentIcon environment={selectedEnvironment} />
          ) : (
            <GlobeIcon color={"currentColor"} />
          )}
        </s.EnvironmentIconContainer>
        {selectedEnvironment && (
          <>
            <Tooltip title={environmentName}>
              <s.SelectedEnvironmentName>
                {environmentName}
              </s.SelectedEnvironmentName>
            </Tooltip>
            <span>/</span>
            <span>Home</span>
          </>
        )}
        {isDisabled && <span>No environments</span>}
        <s.ChevronIconContainer>
          <ChevronIcon
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

  // TODO: refactor this to use only popover
  return !isDisabled && isMenuOpen ? (
    <NewPopover
      content={
        <EnvironmentMenu
          selectedEnvironment={selectedEnvironment}
          environments={sortedEnvironments}
          onMenuItemClick={handleMenuItemClick}
        />
      }
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
