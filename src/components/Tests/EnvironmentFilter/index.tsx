import { useState } from "react";
import { FilterMenu } from "../../common/FilterMenu";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { GlobeIcon } from "../../common/icons/GlobeIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { EnvironmentFilterProps } from "./types";

export const EnvironmentFilter = (props: EnvironmentFilterProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (value: string) => {
    props.onMenuItemClick(value);
  };

  const handleServiceMenuClose = () => {
    setIsMenuOpen(false);
  };

  const selectedItems = props.items.filter((x) => x.selected);

  return (
    <NewPopover
      content={
        <FilterMenu
          title={"Filter by environments"}
          items={props.items}
          onItemClick={handleMenuItemClick}
          onClose={handleServiceMenuClose}
          isLoading={props.isLoading}
        />
      }
      onOpenChange={setIsMenuOpen}
      isOpen={isMenuOpen}
      placement={"bottom-start"}
    >
      <s.MenuButton $isOpen={isMenuOpen}>
        <s.MenuButtonLabel>
          <s.IconContainer>
            <GlobeIcon color={"currentColor"} />
          </s.IconContainer>
          <span>Environment :</span>
          {selectedItems && selectedItems.length > 0 && !props.isLoading ? (
            <s.Number>{selectedItems.length}</s.Number>
          ) : (
            <s.SelectedEntriesNumberPlaceholder>
              All
            </s.SelectedEntriesNumberPlaceholder>
          )}
        </s.MenuButtonLabel>
        <s.MenuChevronIconContainer>
          <ChevronIcon
            color={"currentColor"}
            size={14}
            direction={isMenuOpen ? Direction.UP : Direction.DOWN}
          />
        </s.MenuChevronIconContainer>
      </s.MenuButton>
    </NewPopover>
  );
};
