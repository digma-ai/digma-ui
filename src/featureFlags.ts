import { gte, valid } from "semver";
import { BackendInfo } from "./components/common/App/types";
import { FeatureFlag } from "./types";

export const featureFlagMinBackendVersions: Record<FeatureFlag, string> = {
  [FeatureFlag.IS_HIGHLIGHTS_IMPACT_ENABLED]: "0.3.7",
  [FeatureFlag.ARE_INSIGHT_STATS_ENABLED]: "0.3.7",
  [FeatureFlag.ARE_NEW_INSTRUMENTATION_ATTRIBUTES_ENABLED]: "0.3.15",
  [FeatureFlag.IS_HIGHLIGHTS_SCALING_ENABLED]: "0.3.17",
  [FeatureFlag.IS_HIGHLIGHTS_SPAN_INFO_ENABLED]: "0.3.19",
  [FeatureFlag.IS_DURATION_BREAKDOWN_QUANTITY_ENABLED]: "0.3.34",
  [FeatureFlag.ARE_ISSUES_FILTERS_ENABLED]: "0.3.72",
  [FeatureFlag.ARE_SPAN_ENVIRONMENTS_ENABLED]: "0.3.95",
  [FeatureFlag.IS_REPORT_ENABLED]: "0.3.95",
  [FeatureFlag.ARE_ISSUES_SERVICES_FILTERS_ENABLED]: "0.3.103",
  [FeatureFlag.ARE_EXTENDED_ASSETS_FILTERS_ENABLED]: "0.3.107",
  [FeatureFlag.IS_NEW_IMPACT_SCORE_CALCULATION_ENABLED]: "0.3.107"
};

export const getFeatureFlagValue = (
  backendInfo: BackendInfo | null,
  featureFlag: FeatureFlag
) => {
  const backendVersion = backendInfo?.applicationVersion;

  return (
    backendVersion &&
    (backendVersion === "unknown" ||
      (valid(backendVersion) &&
        gte(backendVersion, featureFlagMinBackendVersions[featureFlag])))
  );
};
