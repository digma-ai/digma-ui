import type { ChangeEvent } from "react";
import { useState } from "react";
import { Checkbox } from "../Checkbox";
import { NewCircleLoader } from "../NewCircleLoader";
import { Tooltip } from "../Tooltip";
import { CrossIcon } from "../icons/CrossIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import type { FilterMenuProps } from "./types";

export const FilterMenu = ({
  onClose,
  onItemClick,
  items,
  isLoading,
  title
}: FilterMenuProps) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleMenuItemClick = (value: string) => () => {
    onItemClick(value);
  };

  const filteredItems = items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchInputValue.toLowerCase())
  );

  const selectedItems = items.filter((x) => x.selected);

  const renderContent = () => {
    if (isLoading) {
      return (
        <s.EmptyStateContainer>
          <NewCircleLoader size={24} />
        </s.EmptyStateContainer>
      );
    }

    return (
      <>
        {selectedItems.length > 0 && (
          <s.TagsContainer>
            {selectedItems.map((x) => (
              <Tooltip title={x.label} key={x.value}>
                <s.Tag>
                  <s.TagText>{x.label}</s.TagText>
                  <s.IconButton onClick={handleMenuItemClick(x.value)}>
                    <CrossIcon color={"currentColor"} size={14} />
                  </s.IconButton>
                </s.Tag>
              </Tooltip>
            ))}
          </s.TagsContainer>
        )}
        <s.List>
          {filteredItems.map((item) => (
            <s.ListItem key={item.value}>
              <Checkbox
                label={item.label}
                value={Boolean(item.selected)}
                onChange={() => {
                  handleMenuItemClick(item.value);
                }}
              />
            </s.ListItem>
          ))}
        </s.List>
      </>
    );
  };

  return (
    <s.Container>
      <s.Header>
        {title}
        <s.IconButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.IconButton>
      </s.Header>
      <s.SearchInputContainer>
        <s.SearchInputIconContainer>
          <MagnifierIcon color={"currentColor"} size={14} />
        </s.SearchInputIconContainer>
        <s.SearchInput
          placeholder={"Search"}
          onChange={handleSearchInputChange}
        />
      </s.SearchInputContainer>
      <s.ContentContainer>{renderContent()}</s.ContentContainer>
    </s.Container>
  );
};
