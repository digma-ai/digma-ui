import * as s from "./styles";
import { ScoreIndicatorProps } from "./types";

export const ScoreIndicator = (props: ScoreIndicatorProps) => (
  <s.Container>
    <s.Indicator $score={props.score} />
  </s.Container>
);
