import * as s from "./styles";
import type { OverviewWidgetProps } from "./types";

export const OverviewWidget = ({ children }: OverviewWidgetProps) => (
  <s.Container>{children}</s.Container>
);
