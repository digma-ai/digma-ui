import type { MouseEvent } from "react";
import { useState } from "react";
import { MenuList } from "../../../../../../../../Navigation/common/MenuList";
import { Popup } from "../../../../../../../../Navigation/common/Popup";
import { NewPopover } from "../../../../../../../../common/NewPopover";
import { ChevronIcon } from "../../../../../../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../../../../../../common/icons/types";
import { Tooltip } from "../../../../../../../../common/v3/Tooltip";
import * as s from "./styles";
import type { SelectOption, SelectProps } from "./types";

export const Select = ({
  options,
  onChange,
  isDisabled,
  value,
  placeholder,
  listHeader
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((x) => x.value === value);

  const handleOptionClick = (option: SelectOption) => {
    setIsOpen(false);
    onChange(option.value);
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
            header={listHeader}
            items={options.map((x) => ({
              id: x.value,
              label: x.label,
              customContent: x.customContent
                ? x.customContent({
                    isSelected: false,
                    onClick: () => handleOptionClick(x)
                  })
                : null
            }))}
          />
        </Popup>
      }
      onOpenChange={isDisabled ? undefined : setIsOpen}
      useClickInteraction={false}
      isOpen={isDisabled ? false : isOpen}
      placement={"bottom-start"}
    >
      <s.SelectBar
        $isDisabled={isDisabled}
        $isOpen={isOpen}
        onClick={handleSelectBarClick}
      >
        {selectedOption ? (
          <s.SelectedValue>
            {selectedOption.customContent ? (
              selectedOption.customContent({ isSelected: true, onClick: null })
            ) : (
              <Tooltip title={selectedOption.label}>
                <span>{selectedOption.label}</span>
              </Tooltip>
            )}
          </s.SelectedValue>
        ) : (
          placeholder
        )}
        <s.Divider />
        <s.ExpandButton>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={isOpen ? Direction.Up : Direction.Down}
          />
        </s.ExpandButton>
      </s.SelectBar>
    </NewPopover>
  );
};
