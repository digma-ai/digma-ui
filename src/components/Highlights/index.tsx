import { getFeatureFlagValue } from "../../featureFlags";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { FeatureFlag } from "../../types";
import { Impact } from "./Impact";
import { Performance } from "./Performance";
import { Scaling } from "./Scaling";
import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  const { backendInfo } = useConfigSelector();

  const areImpactHighlightsVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsHighlightsImpactEnabled
  );
  const areScalingHighlightsVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IsHighlightsScalingEnabled
  );

  return (
    <s.Container>
      <TopIssues />
      <Performance />
      {areImpactHighlightsVisible && <Impact />}
      {areScalingHighlightsVisible && <Scaling />}
    </s.Container>
  );
};
