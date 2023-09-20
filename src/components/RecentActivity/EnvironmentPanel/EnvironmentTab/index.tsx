import { useCallback, useContext, useRef, useState } from "react";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { Badge } from "../../../common/Badge";
import { KebabMenuButton } from "../../../common/KebabMenuButton";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import { DesktopIcon } from "../../../common/icons/DesktopIcon";
import { InfinityIcon } from "../../../common/icons/InfinityIcon";
import { TrashBinIcon } from "../../../common/icons/TrashBinIcon";
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
    ((config.digmaStatus?.connection.status && !props.environment.isPending) ||
      props.environment.isPending);

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
        props.onEnvironmentDelete(props.environment.originalName);
        break;
    }

    setIsMenuOpen(false);
  };

  const menuItems = [{ label: "Delete", value: "delete", icon: TrashBinIcon }];

  const renderIcon = () => {
    if (!props.environment.type) {
      return null;
    }

    return props.environment.name === props.environment.originalName ? (
      <InfinityIcon size={16} color={"currentColor"} />
    ) : (
      <DesktopIcon size={16} color={"currentColor"} />
    );
  };

  return (
    <s.Container
      ref={containerRef}
      isSelected={props.isSelected}
      isPending={props.environment.isPending}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {props.environment.hasRecentActivity && (
        <s.BadgeContainer>
          <Badge />
        </s.BadgeContainer>
      )}
      {renderIcon()}
      <Tooltip title={props.environment.name}>
        <s.Label>{props.environment.name}</s.Label>
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
