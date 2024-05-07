import { gte, valid } from "semver";
import { ConfigContextData } from "./components/common/App/types";
import { FeatureFlag } from "./types";

export const featureFlagMinBackendVersions: Record<FeatureFlag, string> = {
  [FeatureFlag.ARE_HIGHLIGHTS_IMPACT_ENABLED]: "0.3.7",
  [FeatureFlag.ARE_INSIGHT_STATS_ENABLED]: "0.3.7",
  [FeatureFlag.IS_HIGHLIGHTS_SPAN_INFO_ENABLED]: "0.3.14"
};

export const getFeatureFlagValue = (
  config: ConfigContextData,
  featureFlag: FeatureFlag
) => {
  const backendVersion = config.backendInfo?.applicationVersion;

  return (
    backendVersion &&
    (backendVersion === "unknown" ||
      (valid(backendVersion) &&
        gte(backendVersion, featureFlagMinBackendVersions[featureFlag])))
  );
};
