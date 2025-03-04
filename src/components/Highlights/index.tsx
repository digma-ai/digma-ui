// import { getFeatureFlagValue } from "../../featureFlags";
// import { useGetAboutQuery } from "../../redux/services/digma";
// import { FeatureFlag } from "../../types";
// import { Impact } from "./Impact";
import { Performance } from "./Performance";
// import { Scaling } from "./Scaling";
// import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  // const { data: about } = useGetAboutQuery();

  // const areImpactHighlightsVisible = Boolean(
  //   about &&
  //     getFeatureFlagValue(about, FeatureFlag.IS_HIGHLIGHTS_IMPACT_ENABLED)
  // );
  // const areScalingHighlightsVisible = Boolean(
  //   about &&
  //     getFeatureFlagValue(about, FeatureFlag.IS_HIGHLIGHTS_SCALING_ENABLED)
  // );

  return (
    <s.Container>
      {/* <TopIssues /> */}
      <Performance />
      {/* {areImpactHighlightsVisible && <Impact />} */}
      {/* {areScalingHighlightsVisible && <Scaling />} */}
    </s.Container>
  );
};
