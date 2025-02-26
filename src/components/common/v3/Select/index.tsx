import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { isString } from "../../../../typeGuards/isString";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { NewPopover } from "../../NewPopover";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { MagnifierIcon } from "../../icons/MagnifierIcon";
import { Direction } from "../../icons/types";
import { Checkmark } from "../Checkmark";
import { Tooltip } from "../Tooltip";
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

export const Select = ({
  multiselect,
  items,
  onChange,
  disabled,
  icon: Icon,
  placeholder,
  className,
  searchable,
  showSelectedState,
  useShift,
  sameWidth,
  ButtonComponent,
  menuHeight
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

  const handleItemClick = (item: SelectItem) => () => {
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchValue("");
    }
  }, [isOpen]);

  const selectedValues = items.filter((x) => x.selected).map((x) => x.value);

  const filteredItems = items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchValue)
  );

  const sortedItems = multiselect
    ? filteredItems.sort(sortItemsBySelectedState)
    : filteredItems;

  const isSelectedStateEnabled =
    isUndefined(showSelectedState) || showSelectedState;

  const optionListHasVerticalScrollbar = Boolean(
    optionListRef?.current &&
      optionListRef.current.scrollHeight > optionListRef.current.clientHeight
  );
  const isSearchBarVisible =
    (Boolean(searchable) || (isUndefined(searchable) && items.length > 10)) &&
    (optionListHasVerticalScrollbar || searchValue.length > 0);
  const isActive =
    isOpen || (isSelectedStateEnabled && selectedValues.length > 0);
  return (
    <NewPopover
      sameWidth={sameWidth !== false}
      useShift={useShift !== false}
      content={
        <s.MenuContainer $height={menuHeight}>
          {isSearchBarVisible && (
            <s.SearchInputContainer>
              <s.SearchInputIconContainer>
                <MagnifierIcon />
              </s.SearchInputIconContainer>
              <s.SearchInput
                type={"text"}
                placeholder={"Search"}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </s.SearchInputContainer>
          )}
          <s.OptionList ref={getOptionListRef}>
            {sortedItems.length > 0 ? (
              sortedItems.map((x) => (
                <s.OptionListItem
                  key={x.value}
                  onClick={handleItemClick(x)}
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
              <s.NoResultsContainer>
                <span>No results</span>
                {searchValue?.length > 0 && (
                  <s.NoSearchResults>
                    <span>Check spelling or try to search</span>
                    <span>something else.</span>
                  </s.NoSearchResults>
                )}
              </s.NoResultsContainer>
            )}
          </s.OptionList>
        </s.MenuContainer>
      }
      onOpenChange={disabled ? undefined : setIsOpen}
      isOpen={disabled ? false : isOpen}
      placement={"bottom-start"}
    >
      {ButtonComponent ? (
        <ButtonComponent onClick={handleButtonClick} disabled={disabled} />
      ) : (
        <s.Button
          $isActive={isActive}
          onClick={handleButtonClick}
          disabled={disabled}
          className={className}
        >
          {Icon && (
            <s.ButtonIconContainer>
              <Icon color={"currentColor"} />
            </s.ButtonIconContainer>
          )}
          {isString(placeholder) && (
            <Tooltip title={placeholder} isDisabled={placeholder.length === 0}>
              <s.ButtonLabel $isActive={isActive}>{placeholder}</s.ButtonLabel>
            </Tooltip>
          )}
          {multiselect &&
            isSelectedStateEnabled &&
            selectedValues.length > 0 && (
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
      )}
    </NewPopover>
  );
};
