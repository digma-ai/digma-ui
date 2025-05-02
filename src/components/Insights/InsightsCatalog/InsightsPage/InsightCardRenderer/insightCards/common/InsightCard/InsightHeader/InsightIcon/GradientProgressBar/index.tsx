import * as s from "./styles";
import type { GradientBackgroundProps } from "./types";

export const GradientProgressBar = ({
  label,
  value,
  valueLabel
}: GradientBackgroundProps) => (
  <s.Container>
    <s.ProgressBarContainer>
      <s.Background />
      <s.Circle value={value} />
    </s.ProgressBarContainer>
    <s.Legend>
      <s.Label>{label}</s.Label>
      <s.ValueLabel>{valueLabel}</s.ValueLabel>
    </s.Legend>
  </s.Container>
);
