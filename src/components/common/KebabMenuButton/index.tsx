import { ThreeDotsIcon } from "../icons/ThreeDotsIcon";

import * as s from "./styles";
import { KebabMenuButtonProps } from "./types";

export const KebabMenuButton = ({
  disabled,
  className
}: KebabMenuButtonProps) => (
  <s.Container disabled={disabled} className={className}>
    <ThreeDotsIcon color={"currentColor"} size={14} />
  </s.Container>
);
