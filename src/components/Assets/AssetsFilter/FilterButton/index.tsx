import { isNumber } from "../../../../typeGuards/isNumber";
import { FunnelIcon } from "../../../common/icons/FunnelIcon";
import * as s from "./styles";
import { FilterButtonProps } from "./types";

export const FilterButton = (props: FilterButtonProps) => (
  <s.Button
    $hasSelectedItems={isNumber(props.selectedCount) && props.selectedCount > 0}
  >
    <FunnelIcon color={"currentColor"} size={14} />
    <s.Title>{props.title}</s.Title>
    {props.showCount &&
      isNumber(props.selectedCount) &&
      props.selectedCount > 0 &&
      !props.isLoading && <s.Number>{props.selectedCount}</s.Number>}
  </s.Button>
);
