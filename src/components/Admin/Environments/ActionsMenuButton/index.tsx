import { useState } from "react";
import { useAdminDispatch } from "../../../../containers/Admin/hooks";
import { setEnvironmentToDelete } from "../../../../redux/slices/environmentsSlice";
import { TrashBinIcon } from "../../../common/icons/16px/TrashBinIcon";
import { ThreeDotsVerticalIcon } from "../../../common/icons/ThreeDotsVerticalIcon";
import { NewPopover } from "../../../common/NewPopover";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { MenuList } from "../../../Navigation/common/MenuList";
import * as s from "./styles";
import type { ActionMenuButtonProps } from "./types";

export const ActionsMenuButton = ({ environment }: ActionMenuButtonProps) => {
  const [isKebabButtonMenuOpen, setIsKebabButtonMenuOpen] = useState(false);
  const dispatch = useAdminDispatch();

  const handleDeleteMenuItemClick = () => {
    dispatch(setEnvironmentToDelete(environment.id));
  };

  const handleKebabMenuOpenChange = (isOpen: boolean) => {
    setIsKebabButtonMenuOpen(isOpen);
  };

  return (
    <NewPopover
      content={
        <s.Popup>
          <MenuList
            items={[
              {
                id: "delete",
                icon: <TrashBinIcon />,
                label: "Delete",
                onClick: handleDeleteMenuItemClick
              }
            ]}
          />
        </s.Popup>
      }
      onOpenChange={handleKebabMenuOpenChange}
      isOpen={isKebabButtonMenuOpen}
      placement={"bottom-end"}
    >
      <NewIconButton
        icon={ThreeDotsVerticalIcon}
        buttonType={"secondaryBorderless"}
      />
    </NewPopover>
  );
};
