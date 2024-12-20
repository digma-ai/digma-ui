import * as s from "./styles";
import type { ReportWidgetProps } from "./types";

export const ReportWidget = ({ title }: ReportWidgetProps) => (
  <s.Container>
    <s.TitleContainer>
      <s.Title>{title}</s.Title>
    </s.TitleContainer>
  </s.Container>
);
