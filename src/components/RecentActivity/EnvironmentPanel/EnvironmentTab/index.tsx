import { useCallback, useContext, useRef, useState } from "react";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { greenScale } from "../../../common/App/v2colors";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { KebabMenuButton } from "../../../common/KebabMenuButton";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import { TrashBinIcon } from "../../../common/icons/TrashBinIcon";
import { Badge } from "../../Badge";
import { EnvironmentMenu } from "../../EnvironmentMenu";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = useContext(ConfigContext);
  const isMenuVisible =
    window.recentActivityIsEnvironmentManagementEnabled === true &&
    config.digmaStatus?.connection.status;

  const containerRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView(false);
    }

    props.onClick(props.environment);
  };

  const handleMenuItemSelect = (value: string) => {
    switch (value) {
      case "delete":
        props.onEnvironmentDelete(props.environment.id);
        break;
    }

    setIsMenuOpen(false);
  };

  const menuItems = [{ label: "Delete", value: "delete", icon: TrashBinIcon }];

  return (
    <s.Container
      ref={containerRef}
      $isSelected={props.isSelected}
      $isPending={props.environment.isPending}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <EnvironmentIcon environment={props.environment} />
      <Tooltip title={props.environment.name}>
        <s.LabelContainer>
          <s.Label>{props.environment.name}</s.Label>
          {props.environment.hasRecentActivity && (
            <Badge
              backgroundColor={greenScale[300]}
              borderColor={greenScale[400]}
            />
          )}
        </s.LabelContainer>
      </Tooltip>
      {isMenuVisible &&
        menuItems.length > 0 &&
        (isHovered || isFocused || isMenuOpen) && (
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
              <KebabMenuButton />
            </span>
          </NewPopover>
        )}
    </s.Container>
  );
};
