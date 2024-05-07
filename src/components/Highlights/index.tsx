import { useContext } from "react";
import { getFeatureFlagValue } from "../../featureFlags";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { Impact } from "./Impact";
import { Performance } from "./Performance";
import { SpanInfo } from "./SpanInfo";
import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  const config = useContext(ConfigContext);

  const isSpanInfoVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_HIGHLIGHTS_SPAN_INFO_ENABLED
  );

  const areImpactHighlightsVisible = getFeatureFlagValue(
    config,
    FeatureFlag.ARE_HIGHLIGHTS_IMPACT_ENABLED
  );

  return (
    <s.Container>
      {isSpanInfoVisible && <SpanInfo />}
      <TopIssues />
      <Performance />
      {areImpactHighlightsVisible && <Impact />}
    </s.Container>
  );
};
