import { EnvironmentIcon } from "../../common/EnvironmentIcon";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { GlobeIcon } from "../../common/icons/16px/GlobeIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { EnvironmentBarProps } from "./types";

export const EnvironmentBar = (props: EnvironmentBarProps) => {
  const handleEnvironmentBarClick = () => {
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
        <s.SelectedEnvironmentName>
          {props.selectedEnvironment.name}
        </s.SelectedEnvironmentName>
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
