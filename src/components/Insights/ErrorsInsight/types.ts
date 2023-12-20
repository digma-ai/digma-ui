import { InsightType } from "../../../types";
import { CodeObjectErrorsInsight, InsightProps } from "../types";

export interface ErrorsInsightProps extends InsightProps {
  insight: CodeObjectErrorsInsight;
  onErrorSelect: (id: string, insightType: InsightType) => void;
  onExpandButtonClick: () => void;
}
