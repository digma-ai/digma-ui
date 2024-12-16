import * as s from "./styles";
import type { ScoreIndicatorProps } from "./types";

export const ScoreIndicator = ({ score }: ScoreIndicatorProps) => (
  <s.Container>
    <s.Indicator $score={score} />
  </s.Container>
);
