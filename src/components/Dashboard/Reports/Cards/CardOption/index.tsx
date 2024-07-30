import * as s from "./styles";
import { CardOptionsProps } from "./types";

export const CardOption = ({
  title,
  counter,
  type,
  isActive,
  disabled
}: CardOptionsProps) => (
  <s.Container
    $type={type ?? "default"}
    $disabled={disabled}
    $isActive={isActive}
  >
    <s.Counter> {counter}</s.Counter>
    <s.Title>{title}</s.Title>
  </s.Container>
);
