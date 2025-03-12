import { getFeatureFlagValue } from "../../featureFlags";
import type { GetAboutResponse } from "../../redux/services/types";
import { FeatureFlag, InsightType } from "../../types";
import type { BackendInfo } from "../common/App/types";

export const getInsightHistogramUrl = (
  baseURL: string | null,
  insightType: InsightType,
  environmentId: string,
  spanCodeObjectId: string,
  backendInfo: BackendInfo | GetAboutResponse | null
) => {
  switch (insightType) {
    case InsightType.SpanScaling: {
      const histogramUrlParams = new URLSearchParams({
        env: environmentId,
        scoid: spanCodeObjectId
      });

      const path = "/Graphs/graphForSpanScaling";
      return `${baseURL ?? ""}${path}?${histogramUrlParams.toString()}`;
    }
    case InsightType.EndpointSlowdownSource:
    case InsightType.SpanDurations:
    case InsightType.SpanPerformanceAnomaly: {
      const isSpanPercentilesHistogramIsEnabled = getFeatureFlagValue(
        backendInfo,
        FeatureFlag.IsHttpGetMethodSpanPercentilesHistogramEnabled
      );

      if (!isSpanPercentilesHistogramIsEnabled) {
        return undefined;
      }

      const histogramUrlParams = new URLSearchParams({
        environment: environmentId,
        spanCodeObjectId: spanCodeObjectId
      });

      const path = "/Graphs/graphForSpanPercentiles";
      return `${baseURL ?? ""}${path}?${histogramUrlParams.toString()}`;
    }
  }
};
