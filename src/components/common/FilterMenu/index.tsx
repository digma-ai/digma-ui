import { ChangeEvent, useState } from "react";
import { Checkbox } from "../Checkbox";
import { NewCircleLoader } from "../NewCircleLoader";
import { Tooltip } from "../Tooltip";
import { CrossIcon } from "../icons/CrossIcon";
import { MagnifierIcon } from "../icons/MagnifierIcon";
import * as s from "./styles";
import { FilterMenuProps } from "./types";

export const FilterMenu = (props: FilterMenuProps) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleMenuItemClick = (value: string) => {
    props.onItemClick(value);
  };

  const filteredItems = props.items.filter((x) =>
    x.label.toLocaleLowerCase().includes(searchInputValue.toLowerCase())
  );

  const selectedItems = props.items.filter((x) => x.selected);

  const renderContent = () => {
    if (props.isLoading) {
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
                  <s.DeleteTagButton
                    onClick={() => handleMenuItemClick(x.value)}
                  >
                    <CrossIcon color={"currentColor"} size={14} />
                  </s.DeleteTagButton>
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
        {props.title}
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
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
