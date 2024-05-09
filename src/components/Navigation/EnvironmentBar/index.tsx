import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { EnvironmentIcon } from "../../common/EnvironmentIcon";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { Direction } from "../../common/icons/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentBarProps } from "./types";

export const EnvironmentBar = (props: EnvironmentBarProps) => {
  const handleEnvironmentBarClick = () => {
    if (!props.isDisabled) {
      sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_BAR_CLICKED);
      props.onClick();
    }
  };

  const environmentName = props.selectedEnvironment
    ? props.selectedEnvironment.name
    : "No environments";

  return (
    <s.EnvironmentBar
      $isDisabled={props.isDisabled}
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
      <Tooltip title={environmentName}>
        <s.SelectedEnvironmentName>{environmentName}</s.SelectedEnvironmentName>
      </Tooltip>
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
