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

const renderIndicator = (score: number) => (
  <s.IndicatorContainer>
    <s.Indicator $score={score} />
  </s.IndicatorContainer>
);

export const ImpactScore = (props: ImpactScoreProps) => {
  let indicatorPosition: "start" | "end" | undefined;

  if (props.score >= 0 && props.showIndicator) {
    indicatorPosition = "end";

    if (props.indicatorPosition) {
      indicatorPosition = props.indicatorPosition;
    }
  }

  return (
    <Tooltip title={props.score}>
      <s.Container>
        {indicatorPosition === "start" && renderIndicator(props.score)}
        {getImpactScoreLabel(props.score)}
        {indicatorPosition === "end" && renderIndicator(props.score)}
      </s.Container>
    </Tooltip>
  );
};
