import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { getFeatureFlagValue } from "../../featureFlags";
import { FeatureFlag } from "../../types";
import { Impact } from "./Impact";
import { Performance } from "./Performance";
import { Scaling } from "./Scaling";
import { SpanInfo } from "./SpanInfo";
import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  const backendInfo = useGlobalStore().backendInfo;

  const isSpanInfoVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_HIGHLIGHTS_SPAN_INFO_ENABLED
  );
  const areImpactHighlightsVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_HIGHLIGHTS_IMPACT_ENABLED
  );
  const areScalingHighlightsVisible = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_HIGHLIGHTS_SCALING_ENABLED
  );

  return (
    <s.Container>
      {isSpanInfoVisible && <SpanInfo />}
      <TopIssues />
      <Performance />
      {areImpactHighlightsVisible && <Impact />}
      {areScalingHighlightsVisible && <Scaling />}
    </s.Container>
  );
};
