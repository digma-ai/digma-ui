import * as s from "./styles";
import type { CardOptionsProps } from "./types";

export const CardOption = ({
  title,
  counter,
  type = "default",
  isActive,
  disabled
}: CardOptionsProps) => (
  <s.Container $type={type} $disabled={disabled} $isActive={isActive}>
    <s.Counter>{counter}</s.Counter>
    <s.Title>{title}</s.Title>
  </s.Container>
);
