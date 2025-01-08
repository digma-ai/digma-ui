import { useEffect, useState, type MouseEvent } from "react";
import { useMatch } from "react-router-dom";
import { ArrowDownToRightIcon } from "../../../../common/icons/12px/ArrowDownToRightIcon";
import { ChevronIcon } from "../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";
import type { NavMenuItemProps } from "./types";

export const NavMenuItem = ({ item, onClick }: NavMenuItemProps) => {
  const match = useMatch(`${item.route}/*`);
  const isActive = Boolean(match);
  const [isExpanded, setIsExpanded] = useState(isActive);
  const hasSubItems = Boolean(item.items && item.items.length > 0);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (item.items) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      onClick?.();
    }
  };

  useEffect(() => {
    setIsExpanded(isActive);
  }, [isActive]);

  return (
    <s.Container key={item.id} $isActive={isActive}>
      <s.ItemLink to={item.route} onClick={handleClick}>
        {item.icon}
        <span>{item.name}</span>
        {item.items && item.items.length > 0 && (
          <s.ChevronIconContainer>
            <ChevronIcon
              size={16}
              color={"currentColor"}
              direction={isExpanded ? Direction.UP : Direction.DOWN}
            />
          </s.ChevronIconContainer>
        )}
      </s.ItemLink>
      {hasSubItems && isExpanded && (
        <s.SubList>
          {item.items?.map((x) => (
            <s.SubListItemLink to={x.route} key={x.id}>
              <ArrowDownToRightIcon size={12} color={"currentColor"} />
              <span>{x.name}</span>
            </s.SubListItemLink>
          ))}
        </s.SubList>
      )}
    </s.Container>
  );
};
