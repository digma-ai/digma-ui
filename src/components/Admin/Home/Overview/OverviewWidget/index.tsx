import * as s from "./styles";
import type { OverviewWidgetProps } from "./types";

export const OverviewWidget = ({ children, id }: OverviewWidgetProps) => (
  <s.Container className={"overview-widget"} data-id={id}>
    {children}
  </s.Container>
);
