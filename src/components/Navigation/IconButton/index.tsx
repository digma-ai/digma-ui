import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = (props: IconButtonProps) => (
  <s.Button
    className={props.className}
    onClick={props.onClick}
    disabled={props.isDisabled}
  >
    {props.icon}
  </s.Button>
);
