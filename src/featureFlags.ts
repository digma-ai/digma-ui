import { gte, valid } from "semver";
import { ConfigContextData } from "./components/common/App/types";
import { FeatureFlag } from "./types";

export const featureFlagMinBackendVersions: Record<FeatureFlag, string> = {
  [FeatureFlag.IS_DASHBOARD_CLIENT_SPANS_OVERALL_IMPACT_ENABLED]:
    "v0.2.172-alpha.8",
  [FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE]: "v0.2.174",
  [FeatureFlag.IS_ASSETS_OVERALL_IMPACT_HIDDEN]: "v0.2.181-alpha.1",
  [FeatureFlag.IS_INSIGHT_TICKET_LINKAGE_ENABLED]: "v0.2.200",
  [FeatureFlag.IS_ASSETS_COMPLEX_FILTER_ENABLED]: "v0.2.215",
  [FeatureFlag.IS_INSIGHT_DISMISSAL_ENABLED]: "v0.2.238",
  [FeatureFlag.IS_RECALCULATE_BUBBLE_ENABLED]: "v0.2.244",
  [FeatureFlag.IS_ANALYTICS_TAB_VISIBLE]: "v0.2.244"
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
