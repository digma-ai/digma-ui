import { isNumber } from "../../../typeGuards/isNumber";
import { FunnelIcon } from "../icons/FunnelIcon";
import * as s from "./styles";
import { FilterButtonProps } from "./types";

export const FilterButton = ({
  selectedCount,
  title,
  showCount,
  isLoading,
  isActive,
  onClick
}: FilterButtonProps) => (
  <s.Button
    $hasSelectedItems={isNumber(selectedCount) && selectedCount > 0}
    $isActive={isActive}
    onClick={onClick}
  >
    <FunnelIcon color={"currentColor"} size={14} />
    <s.Title>{title}</s.Title>
    {showCount &&
      isNumber(selectedCount) &&
      selectedCount > 0 &&
      !isLoading && <s.Number>{selectedCount}</s.Number>}
  </s.Button>
);
