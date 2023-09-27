import { ThreeDotsIcon } from "../icons/ThreeDotsIcon";

import * as s from "./styles";
import { KebabMenuButtonProps } from "./types";

export const KebabMenuButton = (props: KebabMenuButtonProps) => (
  <s.Container disabled={props.disabled}>
    <ThreeDotsIcon color={"currentColor"} size={14} />
  </s.Container>
);
