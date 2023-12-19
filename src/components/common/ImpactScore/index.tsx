import { useContext } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { FeatureFlag } from "../../../types";
import { ConfigContext } from "../App/ConfigContext";
import { ConfigContextData } from "../App/types";
import { ScoreIndicator } from "../ScoreIndicator";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { ImpactScoreProps } from "./types";

const getImpactScoreLabel = (score: number, config: ConfigContextData) => {
  const isWaitingForDataLabel = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_OVERALL_IMPACT_HIDDEN
  );

  if (isWaitingForDataLabel) {
    if (score <= 0) {
      return "Waiting for data";
    }
  } else {
    if (score < 0) {
      return "No data";
    }
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
  const config = useContext(ConfigContext);
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
        {getImpactScoreLabel(props.score, config)}
        {indicatorPosition === "end" && <ScoreIndicator score={props.score} />}
      </s.Container>
    </Tooltip>
  );
};
