import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { EnvironmentIcon } from "../../common/EnvironmentIcon";
import { Tooltip } from "../../common/Tooltip";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentBarProps } from "./types";

export const EnvironmentBar = (props: EnvironmentBarProps) => {
  const handleEnvironmentBarClick = () => {
    sendTrackingEvent(trackingEvents.ENVIRONMENT_BAR_CLICKED);
    props.onClick();
  };

  return (
    <s.EnvironmentBar
      $isDisabled={!props.selectedEnvironment}
      $isMenuOpen={props.isMenuOpen}
      onClick={handleEnvironmentBarClick}
    >
      <s.EnvironmentIconContainer>
        {props.selectedEnvironment ? (
          <EnvironmentIcon environment={props.selectedEnvironment} />
        ) : (
          <GlobeIcon size={16} color={"currentColor"} />
        )}
      </s.EnvironmentIconContainer>
      {props.selectedEnvironment ? (
        <Tooltip title={props.selectedEnvironment.name}>
          <s.SelectedEnvironmentName>
            {props.selectedEnvironment.name}
          </s.SelectedEnvironmentName>
        </Tooltip>
      ) : (
        "No environments"
      )}
      <s.ChevronIconContainer>
        <ChevronIcon
          size={16}
          color={"currentColor"}
          direction={props.isMenuOpen ? Direction.UP : Direction.DOWN}
        />
      </s.ChevronIconContainer>
    </s.EnvironmentBar>
  );
};
