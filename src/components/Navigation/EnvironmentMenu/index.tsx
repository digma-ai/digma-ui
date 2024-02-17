import { useState } from "react";
import { Environment } from "../../common/App/types";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { GlobeIcon } from "../../common/icons/GlobeIcon";
import { Direction } from "../../common/icons/types";
import { MenuList } from "../MenuList";
import { Popup } from "../Popup";
import * as s from "./styles";
import { EnvironmentMenuProps } from "./types";

export const EnvironmentMenu = (props: EnvironmentMenuProps) => {
  const [isEnvironmentMenuOpen, setIsEnvironmentMenuOpen] = useState(false);

  const handleEnvironmentClick = (environment: Environment) => {
    props.onEnvironmentChange(environment);
    setIsEnvironmentMenuOpen(false);
  };

  return (
    <NewPopover
      content={
        <Popup height={"40px"}>
          <MenuList
            items={props.environments.map((x) => ({
              id: x.originalName,
              label: x.name,
              onClick: () => handleEnvironmentClick(x),
              icon: <GlobeIcon color={"currentColor"} />
            }))}
          />
        </Popup>
      }
      onOpenChange={props.isDisabled ? undefined : setIsEnvironmentMenuOpen}
      isOpen={isEnvironmentMenuOpen}
      placement={"bottom-start"}
      sameWidth={true}
    >
      <s.EnvironmentBar
        $isDisabled={props.isDisabled}
        $isActive={Boolean(props.selectedEnvironment)}
        $isMenuOpen={isEnvironmentMenuOpen}
      >
        <s.GlobeIconContainer>
          <GlobeIcon size={16} color={"currentColor"} />
        </s.GlobeIconContainer>
        Environments
        <s.SelectedEnvironmentName>
          {props.selectedEnvironment?.originalName}
        </s.SelectedEnvironmentName>
        <s.ChevronIconContainer>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={isEnvironmentMenuOpen ? Direction.UP : Direction.DOWN}
          />
        </s.ChevronIconContainer>
      </s.EnvironmentBar>
    </NewPopover>
  );
};
