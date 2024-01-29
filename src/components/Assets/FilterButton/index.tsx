import { isNumber } from "../../../typeGuards/isNumber";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { FilterIcon } from "../../common/icons/FilterIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { FilterButtonProps } from "./types";

export const FilterButton = (props: FilterButtonProps) => (
  <s.Button>
    <s.Label>
      <FilterIcon color={"currentColor"} size={14} />
      <span>{props.title}</span>
      {props.showCount ? (
        isNumber(props.selectedCount) &&
        props.selectedCount > 0 &&
        !props.isLoading ? (
          <s.Number>{props.selectedCount}</s.Number>
        ) : (
          <s.SelectedItemsNumberPlaceholder>
            All
          </s.SelectedItemsNumberPlaceholder>
        )
      ) : null}
    </s.Label>
    <s.ChevronIconContainer>
      <ChevronIcon
        color={"currentColor"}
        size={14}
        direction={props.isMenuOpen ? Direction.UP : Direction.DOWN}
      />
    </s.ChevronIconContainer>
  </s.Button>
);
