import { gte, valid } from "semver";
import type { BackendInfo } from "./components/common/App/types";
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
  [FeatureFlag.IS_NEW_IMPACT_SCORE_CALCULATION_ENABLED]: "0.3.107",
  [FeatureFlag.RECENT_ACTIVITY_SPANS_COUNT_ENABLED]: "0.3.118",
  [FeatureFlag.IS_METRICS_REPORT_ENABLED]: "0.3.120-alpha.15",
  [FeatureFlag.IS_METRICS_REPORT_CRITICALITY_ENABLED]: "0.3.121",
  [FeatureFlag.IS_METRICS_REPORT_DATA_FILTER_ENABLED]: "0.3.122-alpha.3",
  [FeatureFlag.IS_METRICS_REPORT_ENDPOINT_VIEW_ENABLED]: "0.3.122-alpha.3",
  [FeatureFlag.ARE_GLOBAL_ERRORS_ENABLED]: "0.3.129",
  [FeatureFlag.ARE_GLOBAL_ERRORS_FILTERS_ENABLED]: "0.3.140-alpha.2",
  [FeatureFlag.IS_ERROR_OCCURRENCE_CHART_ENABLED]: "0.3.141-alpha.3",
  [FeatureFlag.ARE_GLOBAL_ERRORS_CRITICALITY_AND_UNHANDLED_FILTERS_ENABLED]:
    "0.3.145",
  [FeatureFlag.IS_GLOBAL_ERROR_PIN_ENABLED]: "0.3.147",
  [FeatureFlag.IS_GLOBAL_ERROR_DISMISS_ENABLED]: "0.3.148",
  [FeatureFlag.IS_GLOBAL_ERROR_LAST_DAYS_FILTER_ENABLED]: "0.3.149"
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
