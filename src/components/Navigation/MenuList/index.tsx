import { ReactElement } from "react";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { groupBy } from "../../../utils/groupBy";
import { intersperse } from "../../../utils/intersperse";
import { Tooltip } from "../../common/Tooltip";
import * as s from "./styles";
import { MenuListProps } from "./types";

const UNGROUPED_GROUP_LABEL = "__ungrouped";

export const MenuList = (props: MenuListProps) => {
  const showGroupNames = isBoolean(props.showGroupNames)
    ? props.showGroupNames
    : true;

  const groups = groupBy(
    props.items,
    (item) => item.groupName || UNGROUPED_GROUP_LABEL
  );

  const groupElements = Object.entries(groups).map(([groupName, items]) => {
    return (
      <s.ListGroup key={groupName}>
        {showGroupNames && groupName !== UNGROUPED_GROUP_LABEL && (
          <s.ListGroupName>{groupName}</s.ListGroupName>
        )}
        {items.map((item) =>
          item.customContent ? (
            <li key={item.id}>{item.customContent}</li>
          ) : (
            <Tooltip title={item.label} key={item.id}>
              <s.ListItem onClick={item.onClick}>
                {item.icon && (
                  <s.ListItemIconContainer>{item.icon}</s.ListItemIconContainer>
                )}
                {item.label && <s.ListItemLabel>{item.label}</s.ListItemLabel>}
              </s.ListItem>
            </Tooltip>
          )
        )}
      </s.ListGroup>
    );
  });

  return (
    <s.List>
      {props.showGroupDividers
        ? intersperse<ReactElement, ReactElement>(
            groupElements,
            (i: number) => <s.ListGroupDivider key={`divider-${i}`} />
          )
        : groupElements}
    </s.List>
  );
};
