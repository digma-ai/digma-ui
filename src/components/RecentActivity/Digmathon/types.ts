import { DigmathonInsightData } from "../types";

export interface DigmathonProgressProps {
  data?: DigmathonInsightData[];
  getData: () => void;
  foundIssuesCount: number;
  isDigmathonCompleted: boolean;
  onGoBack: () => void;
}
