import type { InsightType } from "../../../../../../types";
import type { CodeObjectErrorsInsight } from "../../../../types";
import type { InsightCardCommonProps } from "../../types";

export interface ErrorsInsightProps extends InsightCardCommonProps {
  insight: CodeObjectErrorsInsight;
  onErrorSelect: (id: string, insightType: InsightType) => void;
  onExpandButtonClick: () => void;
}
