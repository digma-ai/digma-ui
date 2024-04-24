import { ScoreIndicator } from "../ScoreIndicator";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { ImpactScoreProps } from "./types";

export const getImpactScoreLabel = (score: number) => {
  if (score <= 0) {
    return "Waiting for data";
  }

  if (score < 0.4) {
    return "Low";
  }

  if (score < 0.8) {
    return "Medium";
  }

  return "High";
};

export const ImpactScore = (props: ImpactScoreProps) => {
  let indicatorPosition: "start" | "end" | undefined;

  if (props.score > 0 && props.showIndicator) {
    indicatorPosition = "end";

    if (props.indicatorPosition) {
      indicatorPosition = props.indicatorPosition;
    }
  }

  return (
    <Tooltip title={props.score}>
      <s.Container>
        {indicatorPosition === "start" && (
          <ScoreIndicator score={props.score} />
        )}
        {getImpactScoreLabel(props.score)}
        {indicatorPosition === "end" && <ScoreIndicator score={props.score} />}
      </s.Container>
    </Tooltip>
  );
};
