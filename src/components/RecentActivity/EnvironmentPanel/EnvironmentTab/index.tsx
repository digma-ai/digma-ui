import { useCallback, useRef, useState } from "react";
import { Badge } from "../../../common/Badge";
import { KebabMenuButton } from "../../../common/KebabMenuButton";
import { Menu } from "../../../common/Menu";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/Tooltip";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = useCallback(() => {
    // console.log("handleMouseEnter");
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    // console.log("handleMouseLeave");
    setIsHovered(false);
  }, []);

  const handleFocus = useCallback(() => {
    // console.log("handleFocus");
    setIsFocused(true);
  }, []);
  const handleBlur = useCallback(() => {
    // console.log("handleBlur");
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
      case "Delete":
        props.onEnvironmentDelete(props.environment.name);
        break;
    }
  };

  const menuItems = [...(props.environment.isPending ? ["Delete"] : [])].map(
    (x) => ({ label: x, value: x })
  );

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
      <Tooltip title={props.environment.name}>
        <s.Label>{props.environment.name}</s.Label>
      </Tooltip>
      {menuItems.length > 0 && (isHovered || isFocused) && (
        <NewPopover
          content={<Menu items={menuItems} onSelect={handleMenuItemSelect} />}
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
