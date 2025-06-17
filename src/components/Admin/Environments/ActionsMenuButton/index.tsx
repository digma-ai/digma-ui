import { useAdminDispatch } from "../../../../containers/Admin/hooks";
import { setEnvironmentToDelete } from "../../../../redux/slices/environmentsManagerSlice";
import { TrashBinIcon } from "../../../common/icons/16px/TrashBinIcon";
import { KebabMenu } from "../../../common/KebabMenu";
import type { MenuItem } from "../../../Navigation/common/MenuList/types";
import type { ActionMenuButtonProps } from "./types";

export const ActionsMenuButton = ({ environment }: ActionMenuButtonProps) => {
  const dispatch = useAdminDispatch();

  const handleDeleteMenuItemClick = () => {
    dispatch(setEnvironmentToDelete(environment.id));
  };

  const items: MenuItem[] = [
    {
      id: "delete",
      icon: <TrashBinIcon />,
      label: "Delete",
      onClick: handleDeleteMenuItemClick
    }
  ];

  return <KebabMenu items={items} />;
};
