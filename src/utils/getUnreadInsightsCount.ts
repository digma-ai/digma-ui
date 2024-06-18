import { ConfigContextData } from "../components/common/App/types";

export const getUnreadInsightsCount = (config: ConfigContextData) => {
  if (
    config.insightStats &&
    config.scope?.span?.spanCodeObjectId ===
      config.insightStats.scope?.span.spanCodeObjectId
  ) {
    if (config.insightStats.unreadInsightsCount > 0) {
      return config.insightStats.unreadInsightsCount;
    }
  }

  return config.scope?.unreadInsightsCount ?? 0;
};
