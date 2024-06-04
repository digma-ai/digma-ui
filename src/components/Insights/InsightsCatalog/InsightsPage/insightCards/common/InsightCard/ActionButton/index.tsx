import { isUndefined } from "../../../../../../../../typeGuards/isUndefined";
import { Button } from "../../../../../../../common/v3/Button";
import { IconButton } from "../../../../../../../common/v3/IconButton";
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
        <IconButton
          icon={{ component: icon, size: 16 }}
          onClick={onClick}
          isDisabled={isDisabled}
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip title={title} isDisabled={isUndefined(title)}>
      <Button
        icon={icon}
        label={label}
        onClick={onClick}
        isDisabled={isDisabled}
        buttonType={"tertiary"}
      />
    </Tooltip>
  );
};
