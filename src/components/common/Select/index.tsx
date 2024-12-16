import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { isString } from "../../../typeGuards/isString";
import { Checkbox } from "../Checkbox";
import { NewPopover } from "../NewPopover";
import { Tooltip } from "../Tooltip";
import { ChevronIcon } from "../icons/ChevronIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import type { SelectItem, SelectProps } from "./types";

const sortItemsBySelectedState = (a: SelectItem, b: SelectItem) => {
  if (a.selected && !b.selected) {
    return -1;
  }

  if (!a.selected && b.selected) {
    return 1;
  }

  return 0;
};

/** @deprecated */
export const Select = ({
  multiselect,
  items,
  onChange,
  searchable,
  disabled,
  icon: Icon,
  placeholder,
  counts
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const optionListRef = useRef<HTMLUListElement | null>(null);
  const { observe } = useDimensions();

  const getOptionListRef = useCallback(
    (el: HTMLUListElement | null) => {
      observe(el);
      optionListRef.current = el;
    },
    [observe]
  );

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleItemClick = (item: SelectItem) => {
    if (!item.enabled) {
      return;
    }

    if (!multiselect) {
      onChange(item.value);
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

  const filteredItems = items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchValue)
  );

  const sortedItems = filteredItems.sort(sortItemsBySelectedState);

  const optionListHasVerticalScrollbar = Boolean(
    optionListRef?.current &&
      optionListRef.current.scrollHeight > optionListRef.current.clientHeight
  );

  const isSearchBarVisible =
    searchable && (optionListHasVerticalScrollbar || searchValue.length > 0);

  return (
    <NewPopover
      sameWidth={true}
      content={
        <s.MenuContainer>
          {isSearchBarVisible && (
            <s.SearchInputContainer>
              <s.SearchInputIconContainer>
                <MagnifierIcon />
              </s.SearchInputIconContainer>
              <s.SearchInput
                type={"text"}
                placeholder={"Search"}
                onChange={handleSearchChange}
              />
            </s.SearchInputContainer>
          )}
          <s.OptionList ref={getOptionListRef}>
            {sortedItems.length > 0 ? (
              sortedItems.map((x) => (
                <s.OptionListItem
                  key={x.value}
                  onClick={() => handleItemClick(x)}
                  $enabled={x.enabled}
                  $selected={x.selected}
                >
                  {multiselect && (
                    <Checkbox
                      value={Boolean(x.selected)}
                      label={""}
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
        $isActive={isOpen}
        onClick={handleButtonClick}
        disabled={disabled}
      >
        {Icon && <Icon color={"currentColor"} />}
        {isString(placeholder) && <s.ButtonLabel>{placeholder}</s.ButtonLabel>}
        {selectedValues.length > 0 && (
          <s.Number>{selectedValues.length}</s.Number>
        )}
        {counts && (
          <s.Counts>
            {counts.filtered < counts.total ? (
              <s.FilteredCount>{counts.filtered}</s.FilteredCount>
            ) : (
              counts.filtered
            )}
            /{counts.total}
          </s.Counts>
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
