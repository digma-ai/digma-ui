import { MouseEvent, useState } from "react";
import { MenuList } from "../../../../../../../Navigation/common/MenuList";
import { Popup } from "../../../../../../../Navigation/common/Popup";
import { NewPopover } from "../../../../../../../common/NewPopover";
import { ChevronIcon } from "../../../../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../../../../common/icons/types";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import * as s from "./styles";
import { SelectOption, SelectProps } from "./types";

export const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = props.options.find((x) => x.value === props.value);

  const handleOptionClick = (option: SelectOption) => {
    setIsOpen(false);
    props.onChange(option.value);
  };

  const handleSelectBarClick = (e: MouseEvent<HTMLElement>) => {
    // Prevent the dropdown from opening when clicking on a link inside the selected item
    if ((e.target as HTMLElement).tagName === "A") {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <NewPopover
      sameWidth={true}
      content={
        <Popup height={"125px"}>
          <MenuList
            items={props.options.map((x) => ({
              id: x.value,
              label: x.label,
              onClick: () => handleOptionClick(x)
            }))}
          />
        </Popup>
      }
      onOpenChange={props.isDisabled ? undefined : setIsOpen}
      useClickInteraction={false}
      isOpen={props.isDisabled ? false : isOpen}
      placement={"bottom-start"}
    >
      <s.SelectBar
        $isDisabled={props.isDisabled}
        $isOpen={isOpen}
        onClick={handleSelectBarClick}
      >
        {selectedOption ? (
          <s.SelectedValue>
            {selectedOption.customContent ? (
              selectedOption.customContent
            ) : (
              <Tooltip title={selectedOption.label}>
                <span>{selectedOption.label}</span>
              </Tooltip>
            )}
          </s.SelectedValue>
        ) : (
          props.placeholder
        )}
        <s.Divider />
        <s.ExpandButton>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={isOpen ? Direction.UP : Direction.DOWN}
          />
        </s.ExpandButton>
      </s.SelectBar>
    </NewPopover>
  );
};
