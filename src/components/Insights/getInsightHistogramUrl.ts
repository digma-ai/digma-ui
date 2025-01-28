import { getFeatureFlagValue } from "../../featureFlags";
import type { GetAboutResponse } from "../../redux/services/types";
import { FeatureFlag } from "../../types";
import type { BackendInfo } from "../common/App/types";

export type HistogramType = "spanScaling" | "spanPercentiles";

export const getInsightHistogramUrl = (
  baseURL: string | null,
  histogramType: HistogramType,
  environmentId: string,
  spanCodeObjectId: string,
  backendInfo: BackendInfo | GetAboutResponse | null
) => {
  switch (histogramType) {
    case "spanScaling": {
      const histogramUrlParams = new URLSearchParams({
        env: environmentId,
        scoid: spanCodeObjectId
      });

      const path = "/Graphs/graphForSpanScaling";
      return `${baseURL ?? ""}${path}?${histogramUrlParams.toString()}`;
    }
    case "spanPercentiles": {
      const isSpanPercentilesHistogramIsEnabled = Boolean(
        backendInfo &&
          getFeatureFlagValue(
            backendInfo,
            FeatureFlag.IS_HTTP_GET_METHOD_SPAN_PERCENTILES_HISTOGRAM_ENABLED
          )
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
