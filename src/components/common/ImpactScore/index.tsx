import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { ImpactScoreProps } from "./types";

const getImpactScoreLabel = (score: number) => {
  if (score < 0) {
    return "No data";
  }

  if (score < 0.4) {
    return "Low";
  }

  if (score < 0.8) {
    return "Medium";
  }

  return "High";
};

export const ImpactScore = (props: ImpactScoreProps) => (
  <Tooltip title={props.score}>
    <s.Container>
      {getImpactScoreLabel(props.score)}
      {props.score >= 0 && props.showIndicator && (
        <s.IndicatorContainer>
          <s.Indicator $score={props.score} />
        </s.IndicatorContainer>
      )}
    </s.Container>
  </Tooltip>
);
