import { useAdminDispatch } from "../../../../containers/Admin/hooks";
import { setIsSidebarOpen } from "../../../../redux/slices/environmentsManagerSlice";
import { PlusIcon } from "../../../common/icons/16px/PlusIcon";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { Tooltip } from "../../../common/v3/Tooltip";

export const CreateEnvironmentButton = () => {
  const dispatch = useAdminDispatch();

  const handleClick = () => {
    dispatch(setIsSidebarOpen(true));
  };

  return (
    <Tooltip title={"Create new environment"}>
      <NewIconButton
        buttonType={"secondary"}
        icon={PlusIcon}
        size={"large"}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
