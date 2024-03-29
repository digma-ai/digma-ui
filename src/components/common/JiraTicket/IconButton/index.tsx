import { Tooltip } from "../../../common/Tooltip";
import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = (props: IconButtonProps) => (
  <Tooltip title={props.title}>
    <s.Button onClick={props.onClick} disabled={props.disabled}>
      <props.icon color={"currentColor"} size={props.size} />
    </s.Button>
  </Tooltip>
);
