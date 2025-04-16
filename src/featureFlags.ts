import { gte, valid } from "semver";
import type { BackendInfo } from "./components/common/App/types";
import type { GetAboutResponse } from "./redux/services/types";
import { FeatureFlag } from "./types";

export const featureFlagMinBackendVersions: Record<FeatureFlag, string> = {
  [FeatureFlag.IsHighlightsImpactEnabled]: "0.3.7",
  [FeatureFlag.AreInsightStatsEnabled]: "0.3.7",
  [FeatureFlag.AreNewInstrumentationAttributesEnabled]: "0.3.15",
  [FeatureFlag.IsHighlightsScalingEnabled]: "0.3.17",
  [FeatureFlag.IsHighlightsSpanInfoEnabled]: "0.3.19",
  [FeatureFlag.IsDurationBreakdownQuantityEnabled]: "0.3.34",
  [FeatureFlag.AreIssuesFiltersEnabled]: "0.3.72",
  [FeatureFlag.AreSpanEnvironmentsEnabled]: "0.3.95",
  [FeatureFlag.IsReportEnabled]: "0.3.95",
  [FeatureFlag.AreIssuesServicesFiltersEnabled]: "0.3.103",
  [FeatureFlag.AreExtendedAssetsFiltersEnabled]: "0.3.107",
  [FeatureFlag.IsNewImpactScoreCalculationEnabled]: "0.3.107",
  [FeatureFlag.RecentActivitySpansCountEnabled]: "0.3.118",
  [FeatureFlag.IsMetricsReportEnabled]: "0.3.120-alpha.15",
  [FeatureFlag.IsMetricsReportCriticalityEnabled]: "0.3.121",
  [FeatureFlag.IsMetricsReportDataFilterEnabled]: "0.3.122-alpha.3",
  [FeatureFlag.IsMetricsReportEndpointViewEnabled]: "0.3.122-alpha.3",
  [FeatureFlag.AreGlobalErrorsEnabled]: "0.3.129",
  [FeatureFlag.AreGlobalErrorsFiltersEnabled]: "0.3.140-alpha.2",
  [FeatureFlag.IsErrorOccurrenceChartEnabled]: "0.3.141-alpha.3",
  [FeatureFlag.AreGlobalErrorsCriticalityAndUnhandledFiltersEnabled]: "0.3.145",
  [FeatureFlag.IsGlobalErrorPinEnabled]: "0.3.147",
  [FeatureFlag.IsGlobalErrorDismissEnabled]: "0.3.148",
  [FeatureFlag.IsGlobalErrorsLastDaysFilterEnabled]: "0.3.149",
  [FeatureFlag.IsDurationBreakdownPercentageOfCallsEnabled]: "0.3.193",
  [FeatureFlag.IsHttpGetMethodSpanPercentilesHistogramEnabled]: "0.3.199",
  [FeatureFlag.IsInsightSeveritySortingEnabled]: "0.3.204",
  [FeatureFlag.IsUserIdEnabled]: "0.3.212",
  [FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled]: "0.3.214",
  [FeatureFlag.IsNewBehaviorForMetricsTimeModesEnabled]: "0.3.274",
  [FeatureFlag.IsIssuesLastDaysFilterEnabled]: "0.3.277-alpha.3"
};

export const getFeatureFlagValue = (
  backendInfo: BackendInfo | GetAboutResponse | null | undefined,
  featureFlag: FeatureFlag
): boolean => {
  const backendVersion = backendInfo?.applicationVersion;

  return Boolean(
    backendVersion &&
      (backendVersion === "unknown" ||
        (valid(backendVersion) &&
          gte(backendVersion, featureFlagMinBackendVersions[featureFlag])))
  );
};
