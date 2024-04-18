import { useState } from "react";
import { greenScale } from "../../../common/App/v2colors";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import { TrashBinIcon } from "../../../common/icons/16px/TrashBinIcon";
import { WrenchIcon } from "../../../common/icons/16px/WrenchIcon";
import { Badge } from "../../Badge";
import { EnvironmentMenu } from "../../EnvironmentMenu";
import { EnvironmentMenuItem } from "../../EnvironmentMenu/types";
import { getEnvironmentTabId } from "./getEnvironmentTabIdPrefix";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    props.onClick(props.environment);
  };

  const handleMenuItemSelect = (value: string) => {
    switch (value) {
      case "setup-instructions":
        props.onEnvironmentSetupInstructionsShow(props.environment.id);
        break;
      case "delete":
        props.onEnvironmentDelete(props.environment.id);
        break;
    }

    setIsMenuOpen(false);
  };

  const menuItems: EnvironmentMenuItem[] = [
    { label: "How to setup", value: "setup-instructions", icon: WrenchIcon },
    { label: "Delete", value: "delete", icon: TrashBinIcon }
  ];

  const environmentTabId = getEnvironmentTabId(props.environment.id);

  return (
    <s.Container
      id={environmentTabId}
      $isSelected={props.isSelected}
      onClick={handleClick}
    >
      <EnvironmentIcon environment={props.environment} />
      <Tooltip title={props.environment.name}>
        <s.LabelContainer>
          <s.Label $isSelected={props.isSelected}>
            {props.environment.name}
          </s.Label>
          {props.environment.hasRecentActivity && (
            <Badge
              backgroundColor={greenScale[300]}
              borderColor={greenScale[400]}
            />
          )}
        </s.LabelContainer>
      </Tooltip>
      {menuItems.length > 0 && (
        <NewPopover
          content={
            <EnvironmentMenu
              items={menuItems}
              onSelect={handleMenuItemSelect}
            />
          }
          onOpenChange={setIsMenuOpen}
          isOpen={isMenuOpen}
          placement={"bottom-start"}
        >
          <span>
            <s.StyledKebabMenuButton
              $isMenuOpen={isMenuOpen}
              $isSelected={props.isSelected}
            />
          </span>
        </NewPopover>
      )}
    </s.Container>
  );
};
