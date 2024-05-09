import { DigmathonProgressData } from "../types";

export interface DigmathonProgressProps {
  data?: DigmathonProgressData;
  getData: () => void;
  foundIssuesCount: number;
  isDigmathonCompleted: boolean;
  onGoBack: () => void;
}
