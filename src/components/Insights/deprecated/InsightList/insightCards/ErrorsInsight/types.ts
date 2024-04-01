import { InsightType } from "../../../../../../types";
import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { CodeObjectErrorsInsight } from "../../../../types";

export interface ErrorsInsightProps extends InsightCardCommonProps {
  insight: CodeObjectErrorsInsight;
  onErrorSelect: (id: string, insightType: InsightType) => void;
  onExpandButtonClick: () => void;
}
