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

export const ImpactScore = ({
  score,
  showIndicator,
  indicatorPosition
}: ImpactScoreProps) => {
  let scoreIndicatorPosition: "start" | "end" | undefined;

  if (score > 0 && showIndicator) {
    scoreIndicatorPosition = "end";

    if (scoreIndicatorPosition) {
      scoreIndicatorPosition = indicatorPosition;
    }
  }

  return (
    <Tooltip title={score}>
      <s.Container>
        {scoreIndicatorPosition === "start" && <ScoreIndicator score={score} />}
        {getImpactScoreLabel(score)}
        {scoreIndicatorPosition === "end" && <ScoreIndicator score={score} />}
      </s.Container>
    </Tooltip>
  );
};
