import type { GetAboutResponse } from "../../../../../redux/services/types";
import type { BackendInfo } from "../../../../common/App/types";
import {
  getInsightHistogramUrl,
  type HistogramType
} from "../../../getInsightHistogramUrl";
import type { SpanInsight } from "../../../types";

const getApiUrl = <T extends SpanInsight>(
  baseURL: string | null,
  histogramType: HistogramType,
  insight: T,
  backendInfo: BackendInfo | GetAboutResponse | null
) => {
  switch (histogramType) {
    case "spanScaling": {
      return getInsightHistogramUrl(
        baseURL,
        histogramType,
        insight.environment,
        insight.spanInfo?.spanCodeObjectId ?? "",
        backendInfo
      );
    }
    case "spanPercentiles": {
      return getInsightHistogramUrl(
        baseURL,
        histogramType,
        insight.environment,
        insight.spanInfo?.spanCodeObjectId ?? "",
        backendInfo
      );
    }
  }
};

export const getHistogramAttachment = <T extends SpanInsight>(
  baseURL: string | null,
  insight: T | null,
  histogramType: "spanScaling" | "spanPercentiles",
  backendInfo: BackendInfo | GetAboutResponse | null
) => {
  if (!insight) {
    return undefined;
  }

  const url = getApiUrl(baseURL, histogramType, insight, backendInfo);

  if (!url) {
    return undefined;
  }

  return {
    url,
    fileName: `histogram.html`
  };
};
