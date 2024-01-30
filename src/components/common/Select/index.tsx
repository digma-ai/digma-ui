import { useState } from "react";
import { isString } from "../../../typeGuards/isString";
import { Checkbox } from "../Checkbox";
import { NewPopover } from "../NewPopover";
import { Tooltip } from "../Tooltip";
import { ChevronIcon } from "../icons/ChevronIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import { SelectItem, SelectProps } from "./types";

export const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleItemClick = (item: SelectItem) => {
    if (!item.enabled) {
      return;
    }

    if (!props.multiselect) {
      props.onChange(item.value);
      return;
    }

    const otherSelectedItems = props.items
      .filter((x) => x.selected && x.value !== item.value)
      .map((x) => x.value);

    const newValue = item.selected
      ? otherSelectedItems
      : [...otherSelectedItems, item.value];

    props.onChange(newValue);
  };

  const selectedValues = props.items
    .filter((x) => x.selected)
    .map((x) => x.value);

  const filteredItems = props.items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchValue)
  );

  return (
    <NewPopover
      sameWidth={true}
      content={
        <s.MenuContainer>
          {props.searchable && (
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
          <s.OptionList>
            {filteredItems.length > 0 ? (
              filteredItems.map((x) => (
                <s.OptionListItem
                  key={x.value}
                  onClick={() => handleItemClick(x)}
                  $enabled={x.enabled}
                  $selected={x.selected}
                >
                  {props.multiselect && (
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
      onOpenChange={setIsOpen}
      isOpen={isOpen}
      placement={"bottom-start"}
    >
      <s.Button $isActive={isOpen} onClick={handleButtonClick}>
        {isString(props.placeholder) && (
          <s.ButtonLabel $isActive={isOpen}>{props.placeholder}</s.ButtonLabel>
        )}
        {selectedValues.length > 0 && (
          <s.Number>{selectedValues.length}</s.Number>
        )}
        {props.counts && (
          <s.Counts>
            {props.counts.filtered < props.counts.total ? (
              <s.FilteredCount>{props.counts.filtered}</s.FilteredCount>
            ) : (
              props.counts.filtered
            )}
            /{props.counts.total}
          </s.Counts>
        )}
        <s.ChevronIconContainer>
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
