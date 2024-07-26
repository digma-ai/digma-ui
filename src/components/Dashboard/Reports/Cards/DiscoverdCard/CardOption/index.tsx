import * as s from "./styles";
import { DiscoverdCardProps } from "./types";

export const CardOption = ({
  title,
  counter,
  type,
  isActive,
  disabled
}: DiscoverdCardProps) => (
  <s.Container $type={type} $disabled={disabled} $isActive={isActive}>
    <s.Counter> {counter}</s.Counter>
    <s.Title>{title}</s.Title>
  </s.Container>
);
