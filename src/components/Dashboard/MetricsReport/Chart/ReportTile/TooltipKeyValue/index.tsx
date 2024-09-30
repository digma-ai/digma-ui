import * as s from "./styles";
import { TooltipKeyValueProps } from "./types";

export const TooltipKeyValue = ({ label, children }: TooltipKeyValueProps) => (
  <s.Container>
    <s.Label>{label}:</s.Label>
    {children}
  </s.Container>
);
