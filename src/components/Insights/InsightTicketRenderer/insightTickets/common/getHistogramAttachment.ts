import type { GetAboutResponse } from "../../../../../redux/services/types";
import type { BackendInfo } from "../../../../common/App/types";
import { getInsightHistogramUrl } from "../../../getInsightHistogramUrl";
import type { EndpointInsight, SpanInsight } from "../../../types";

export const getHistogramAttachment = <T extends SpanInsight | EndpointInsight>(
  baseURL: string | null,
  insight: T | null,
  backendInfo: BackendInfo | GetAboutResponse | null
) => {
  if (!insight) {
    return undefined;
  }

  const url = getInsightHistogramUrl(
    baseURL,
    insight.type,
    insight.environment,
    insight.spanInfo?.spanCodeObjectId ?? "",
    backendInfo
  );

  if (!url) {
    return undefined;
  }

  return {
    url,
    fileName: `histogram.html`
  };
};
