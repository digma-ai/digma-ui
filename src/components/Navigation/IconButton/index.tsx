import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = (props: IconButtonProps) => (
  <s.Button className={props.className} disabled={props.isDisabled}>
    <props.icon size={16} color={"currentColor"} />
  </s.Button>
);
