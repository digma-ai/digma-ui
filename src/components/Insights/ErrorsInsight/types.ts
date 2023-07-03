import { CodeObjectErrorsInsight } from "../types";

export interface ErrorsInsightProps {
  insight: CodeObjectErrorsInsight;
  onErrorSelect: (id: string) => void;
  onExpandButtonClick: () => void;
}
