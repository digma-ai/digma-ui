import { isUndefined } from "../../../../../../../../typeGuards/isUndefined";
import { NewButton } from "../../../../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import { ActionButtonProps } from "./types";

export const ActionButton = ({
  type,
  icon,
  label,
  title,
  onClick,
  isDisabled
}: ActionButtonProps) => {
  if (type === "icon") {
    return (
      <Tooltip title={title} isDisabled={isUndefined(title)}>
        <NewIconButton
          icon={icon}
          onClick={onClick}
          isDisabled={isDisabled}
          buttonType={"secondaryBorderless"}
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip title={title} isDisabled={isUndefined(title)}>
      <NewButton
        icon={icon}
        label={label}
        onClick={onClick}
        isDisabled={isDisabled}
      />
    </Tooltip>
  );
};
