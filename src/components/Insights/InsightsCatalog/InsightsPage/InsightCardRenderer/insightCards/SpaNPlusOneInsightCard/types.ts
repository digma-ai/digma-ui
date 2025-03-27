import type { InsightType } from "../../../../../../../types";
import type { SpaNPlusOneInsight, Trace } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpaNPlusOneInsightCardProps extends InsightCardCommonProps {
  insight: SpaNPlusOneInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}
