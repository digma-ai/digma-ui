import { useContext } from "react";
import { getFeatureFlagValue } from "../../featureFlags";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { Impact } from "./Impact";
import { Performance } from "./Performance";
import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  const config = useContext(ConfigContext);
  const areImpactHighlightsVisible = getFeatureFlagValue(
    config,
    FeatureFlag.ARE_IMPACT_HIGHLIGHTS_ENABLED
  );

  return (
    <s.Container>
      <TopIssues />
      <Performance />
      {areImpactHighlightsVisible && <Impact />}
    </s.Container>
  );
};
