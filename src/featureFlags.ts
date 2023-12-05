import { gte, valid } from "semver";
import { ConfigContextData } from "./components/common/App/types";
import { FeatureFlag } from "./types";

const featureFlagMinBackendVersions: Record<FeatureFlag, string> = {
  [FeatureFlag.IS_DASHBOARD_CLIENT_SPANS_OVERALL_IMPACT_ENABLED]:
    "v0.2.172-alpha.8",
  [FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE]: "v0.2.174",
  [FeatureFlag.IS_ASSETS_PERFORMANCE_IMPACT_HIDDEN]: "v0.2.181"
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
