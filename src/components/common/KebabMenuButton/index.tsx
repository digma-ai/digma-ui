import { ThreeDotsVerticalIcon } from "../icons/ThreeDotsVerticalIcon";

import * as s from "./styles";
import { KebabMenuButtonProps } from "./types";

export const KebabMenuButton = ({
  disabled,
  className
}: KebabMenuButtonProps) => (
  <s.Container disabled={disabled} className={className}>
    <ThreeDotsVerticalIcon color={"currentColor"} size={14} />
  </s.Container>
);
