import { ComponentType } from "react";
import { isNumber } from "../../../../../typeGuards/isNumber";
import { Tooltip } from "../../../../common/v3/Tooltip";
import * as s from "./styles";
import { FilterChipComponentProps, FilterChipProps, FilterType } from "./types";

const filtersData: Record<
  FilterType,
  {
    Component: ComponentType<FilterChipComponentProps>;
    label: string;
  }
> = {
  critical: {
    Component: s.CriticalFilterChip,
    label: "Critical"
  },
  unread: {
    Component: s.UnreadFilterChip,
    label: "Unread"
  },
  all: {
    Component: s.FilterChip,
    label: "All"
  }
};

export const FilterChip = ({
  disabled,
  selected,
  type,
  onClick,
  count
}: FilterChipProps) => {
  const { Component, label } = filtersData[type];
  return (
    <Tooltip title={label}>
      <Component disabled={disabled} $selected={selected} onClick={onClick}>
        <Tooltip title={label}>
          <span>{label}</span>
        </Tooltip>
        {isNumber(count) ? (
          <s.StatCounter>{count}</s.StatCounter>
        ) : (
          <Tooltip
            title={
              "To see more statistics, please update digma backend to the latest version"
            }
          >
            <s.StatCounter>N/A</s.StatCounter>
          </Tooltip>
        )}
      </Component>
    </Tooltip>
  );
};
