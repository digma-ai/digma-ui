import * as s from "./styles";
import { KeyValueProps } from "./types";

export const KeyValue = ({ label, children }: KeyValueProps) => (
  <s.Container>
    <s.Label>{label}:</s.Label>
    {children}
  </s.Container>
);
