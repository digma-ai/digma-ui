import { useEffect, useState, type MouseEvent } from "react";
import { useMatch } from "react-router";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { ArrowDownToRightIcon } from "../../../../common/icons/12px/ArrowDownToRightIcon";
import { ChevronIcon } from "../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { NavigationItem, NavMenuItemProps } from "./types";

export const NavMenuItem = ({ item, onClick }: NavMenuItemProps) => {
  const match = useMatch(`${item.route}/*`);
  const isActive = Boolean(match);
  const [isExpanded, setIsExpanded] = useState(isActive);
  const hasSubItems = Boolean(item.items && item.items.length > 0);

  const handleItemClick =
    (item: NavigationItem) => (e: MouseEvent<HTMLAnchorElement>) => {
      sendUserActionTrackingEvent(trackingEvents.NAV_MENU_ITEM_CLICKED, {
        item: item.name
      });
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
      <s.ItemLink to={item.route} onClick={handleItemClick(item)}>
        {item.icon}
        <span>{item.name}</span>
        {item.items && item.items.length > 0 && (
          <s.ChevronIconContainer>
            <ChevronIcon
              size={16}
              color={"currentColor"}
              direction={isExpanded ? Direction.Up : Direction.Down}
            />
          </s.ChevronIconContainer>
        )}
      </s.ItemLink>
      {hasSubItems && isExpanded && (
        <s.SubList>
          {item.items?.map((x) => (
            <s.SubListItemLink
              to={x.route}
              key={x.id}
              onClick={handleItemClick(x)}
            >
              <ArrowDownToRightIcon size={12} color={"currentColor"} />
              <span>{x.name}</span>
            </s.SubListItemLink>
          ))}
        </s.SubList>
      )}
    </s.Container>
  );
};
