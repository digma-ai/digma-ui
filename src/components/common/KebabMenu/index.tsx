import { useState } from "react";
import { MenuList } from "../../Navigation/common/MenuList";
import { ThreeDotsVerticalIcon } from "../icons/ThreeDotsVerticalIcon";
import { NewPopover } from "../NewPopover";
import { NewIconButton } from "../v3/NewIconButton";
import * as s from "./styles";
import type { KebabMenuProps } from "./types";

export const KebabMenu = ({ items }: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKebabMenuOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <NewPopover
      content={
        <s.Popup>
          <MenuList items={items} />
        </s.Popup>
      }
      onOpenChange={handleKebabMenuOpenChange}
      isOpen={isOpen}
      placement={"bottom-end"}
    >
      <NewIconButton
        icon={ThreeDotsVerticalIcon}
        buttonType={"secondaryBorderless"}
      />
    </NewPopover>
  );
};
