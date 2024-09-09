import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { greenScale } from "../../../common/App/v2colors";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import { ClearIcon } from "../../../common/icons/16px/ClearIcon";
import { TrashBinIcon } from "../../../common/icons/16px/TrashBinIcon";
import { WrenchIcon } from "../../../common/icons/16px/WrenchIcon";
import { Badge } from "../../Badge";
import { EnvironmentMenu } from "../../EnvironmentMenu";
import { EnvironmentMenuItem } from "../../EnvironmentMenu/types";
import { trackingEvents } from "../../tracking";
import { getEnvironmentTabId } from "./getEnvironmentTabIdPrefix";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = ({
  environment,
  isSelected,
  onClick,
  onEnvironmentSetupInstructionsShow,
  onEnvironmentClearData,
  onEnvironmentDelete
}: EnvironmentTabProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    onClick(environment);
  };

  const menuItems: EnvironmentMenuItem[] = [
    { label: "How to setup", value: "setup-instructions", icon: WrenchIcon },
    { label: "Clear data", value: "clear-data", icon: ClearIcon },
    { label: "Delete", value: "delete", icon: TrashBinIcon }
  ];

  const handleMenuItemSelect = (value: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.ENVIRONMENT_TAB_MENU_ITEM_SELECTED,
      {
        item: menuItems.find((x) => x.value === value)?.label ?? value
      }
    );
    switch (value) {
      case "setup-instructions":
        onEnvironmentSetupInstructionsShow(environment.id);
        break;
      case "clear-data":
        onEnvironmentClearData(environment.id);
        break;
      case "delete":
        onEnvironmentDelete(environment.id);
        break;
    }

    setIsMenuOpen(false);
  };

  const environmentTabId = getEnvironmentTabId(environment.id);

  return (
    <s.Container
      id={environmentTabId}
      $isSelected={isSelected}
      onClick={handleClick}
    >
      <EnvironmentIcon environment={environment} />
      <Tooltip title={environment.name}>
        <s.LabelContainer>
          <s.Label $isSelected={isSelected}>{environment.name}</s.Label>
          {environment.hasRecentActivity && (
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
              $isSelected={isSelected}
            />
          </span>
        </NewPopover>
      )}
    </s.Container>
  );
};
