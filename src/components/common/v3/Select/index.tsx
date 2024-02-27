import { useState } from "react";
import { MenuList } from "../../../Navigation/common/MenuList";
import { Popup } from "../../../Navigation/common/Popup";
import { NewPopover } from "../../NewPopover";
import { ChevronIcon } from "../../icons/16px/ChevronIcon";
import { Direction } from "../../icons/types";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { SelectOption, SelectProps } from "./types";

export const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = props.options.find((x) => x.value === props.value);

  const handleOptionClick = (option: SelectOption) => {
    setIsOpen(false);
    props.onChange(option.value);
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
      isOpen={props.isDisabled ? false : isOpen}
      placement={"bottom-start"}
    >
      <s.SelectBar $isDisabled={props.isDisabled} $isOpen={isOpen}>
        {selectedOption ? (
          <Tooltip title={selectedOption.label}>
            <s.SelectedValue>{selectedOption.label}</s.SelectedValue>
          </Tooltip>
        ) : (
          props.placeholder
        )}
        <s.ChevronIconContainer>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={isOpen ? Direction.UP : Direction.DOWN}
          />
        </s.ChevronIconContainer>
      </s.SelectBar>
    </NewPopover>
  );
};
