import { CodeObjectErrorsInsight, InsightProps } from "../types";

export interface ErrorsInsightProps extends InsightProps {
  insight: CodeObjectErrorsInsight;
  onErrorSelect: (id: string) => void;
  onExpandButtonClick: () => void;
}
