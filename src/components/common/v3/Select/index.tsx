import { useState } from "react";
import { isString } from "../../../../typeGuards/isString";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { NewPopover } from "../../NewPopover";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { Direction } from "../../icons/types";
import { Checkmark } from "../Checkmark";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { SelectItem, SelectProps } from "./types";

const sortItemsBySelectedState = (a: SelectItem, b: SelectItem) => {
  if (a.selected && !b.selected) {
    return -1;
  }

  if (!a.selected && b.selected) {
    return 1;
  }

  return 0;
};

export const Select = ({
  multiselect,
  items,
  onChange,
  disabled,
  icon: Icon,
  placeholder,
  className,
  showSelectedState
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: SelectItem) => {
    if (!item.enabled) {
      return;
    }

    if (!multiselect) {
      onChange(item.value);
      setIsOpen(false);
      return;
    }

    const otherSelectedItems = items
      .filter((x) => x.selected && x.value !== item.value)
      .map((x) => x.value);

    const newValue = item.selected
      ? otherSelectedItems
      : [...otherSelectedItems, item.value];

    onChange(newValue);
  };

  const selectedValues = items.filter((x) => x.selected).map((x) => x.value);
  const sortedItems = multiselect
    ? items.sort(sortItemsBySelectedState)
    : items;
  const isSelectedStateEnabled =
    isUndefined(showSelectedState) || showSelectedState;

  return (
    <NewPopover
      sameWidth={true}
      content={
        <s.MenuContainer>
          <s.OptionList>
            {sortedItems.length > 0 ? (
              sortedItems.map((x) => (
                <s.OptionListItem
                  key={x.value}
                  onClick={() => handleItemClick(x)}
                  $enabled={x.enabled}
                  $selected={x.selected}
                >
                  {multiselect && (
                    <Checkmark
                      value={Boolean(x.selected)}
                      onChange={() => undefined}
                      disabled={!x.enabled}
                    />
                  )}
                  <Tooltip title={x.label}>
                    <s.OptionListItemLabel>{x.label}</s.OptionListItemLabel>
                  </Tooltip>
                </s.OptionListItem>
              ))
            ) : (
              <s.NoResultsContainer>No results</s.NoResultsContainer>
            )}
          </s.OptionList>
        </s.MenuContainer>
      }
      onOpenChange={disabled ? undefined : setIsOpen}
      isOpen={disabled ? false : isOpen}
      placement={"bottom-start"}
    >
      <s.Button
        $isActive={
          isOpen || (isSelectedStateEnabled && selectedValues.length > 0)
        }
        onClick={handleButtonClick}
        disabled={disabled}
        className={className}
      >
        {Icon && <Icon color={"currentColor"} />}
        {isString(placeholder) && <s.ButtonLabel>{placeholder}</s.ButtonLabel>}
        {multiselect && isSelectedStateEnabled && selectedValues.length > 0 && (
          <s.Number>{selectedValues.length}</s.Number>
        )}
        <s.ChevronIconContainer $disabled={disabled}>
          <ChevronIcon
            color={"currentColor"}
            size={14}
            direction={isOpen ? Direction.UP : Direction.DOWN}
          />
        </s.ChevronIconContainer>
      </s.Button>
    </NewPopover>
  );
};
