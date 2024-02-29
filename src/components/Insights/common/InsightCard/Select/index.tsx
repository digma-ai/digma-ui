import { useState } from "react";
import { MenuList } from "../../../../Navigation/common/MenuList";
import { Popup } from "../../../../Navigation/common/Popup";
import { NewPopover } from "../../../../common/NewPopover";
import { ChevronIcon } from "../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import { Tooltip } from "../../../../common/v3/Tooltip";
import * as s from "./styles";
import { SelectOption, SelectProps } from "./types";

export const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = props.options.find((x) => x.value === props.value);

  const handleOptionClick = (option: SelectOption) => {
    setIsOpen(false);
    props.onChange(option.value);
  };

  const handleExpandButtonClick = () => {
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
      onOpenChange={props.isDisabled || !isOpen ? undefined : setIsOpen}
      isOpen={props.isDisabled ? false : isOpen}
      placement={"bottom-start"}
    >
      <s.SelectBar $isDisabled={props.isDisabled} $isOpen={isOpen}>
        {selectedOption ? (
          <Tooltip title={selectedOption.label}>
            {selectedOption.customContent ? (
              <>{selectedOption.customContent}</>
            ) : (
              <s.SelectedValue>{selectedOption.label}</s.SelectedValue>
            )}
          </Tooltip>
        ) : (
          props.placeholder
        )}
        <s.Divider />
        <s.ExpandButton onClick={handleExpandButtonClick}>
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