import * as s from "./styles";
import type { GlowingIconButtonProps } from "./types";

export const GlowingIconButton = ({
  type,
  onClick,
  icon
}: GlowingIconButtonProps) => (
  <s.BorderContainer $type={type} onClick={onClick}>
    <s.BorderlessIconButton icon={icon} />
  </s.BorderContainer>
);
