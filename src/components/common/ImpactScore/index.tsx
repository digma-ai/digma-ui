import { getFeatureFlagValue } from "../../../featureFlags";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../types";
import { BackendInfo } from "../App/types";
import { ScoreIndicator } from "../ScoreIndicator";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { ImpactScoreProps } from "./types";

const getImpactScoreLabel = (
  score: number,
  backendInfo: BackendInfo | null
) => {
  const isNewImpactScoreCalculationEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_NEW_IMPACT_SCORE_CALCULATION_ENABLED
  );

  if (isNewImpactScoreCalculationEnabled) {
    if (score <= 0) {
      return "Waiting for data";
    }

    if (score <= 0.01) {
      return "Low";
    }

    if (score <= 0.1) {
      return "Medium";
    }

    return "High";
  }

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
  const { backendInfo } = useConfigSelector();

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
        {getImpactScoreLabel(score, backendInfo)}
        {scoreIndicatorPosition === "end" && <ScoreIndicator score={score} />}
      </s.Container>
    </Tooltip>
  );
};
