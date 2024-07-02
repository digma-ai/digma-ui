import { Tooltip } from "../../../common/Tooltip";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = ({
  title,
  onClick,
  disabled,
  icon: Icon,
  size
}: IconButtonProps) => (
  <Tooltip title={title}>
    <s.Button onClick={onClick} disabled={disabled}>
      <Icon color={"currentColor"} size={size} />
    </s.Button>
  </Tooltip>
);
