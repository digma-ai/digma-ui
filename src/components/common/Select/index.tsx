import { useState } from "react";
import { isString } from "../../../typeGuards/isString";
import { Checkbox } from "../Checkbox";
import { NewPopover } from "../NewPopover";
import { ChevronIcon } from "../icons/ChevronIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import { SelectProps } from "./types";

export const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const selectedValues = props.items
    .filter((x) => x.selected)
    .map((x) => x.value);

  const filteredItems = props.items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchValue)
  );

  return (
    <NewPopover
      content={
        <s.MenuContainer>
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
          <s.OptionList>
            {filteredItems.length > 0 ? (
              filteredItems.map((x) => {
                const handleClick = () => {
                  props.onItemClick(x.value);
                };

                return (
                  <s.OptionListItem key={x.value} onClick={handleClick}>
                    <Checkbox
                      value={Boolean(x.selected)}
                      label={""}
                      onChange={() => undefined}
                    />
                    {x.label}
                  </s.OptionListItem>
                );
              })
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
      <s.Button $isOpen={isOpen} onClick={handleButtonClick}>
        {isString(props.title) && <s.ButtonLabel>{props.title}</s.ButtonLabel>}
        {selectedValues.length > 0 && (
          <s.Number>{selectedValues.length}</s.Number>
        )}
        {props.counts && (
          <s.Counts>
            <s.FilteredCount>{props.counts.filtered}</s.FilteredCount>/
            {props.counts.total}
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
