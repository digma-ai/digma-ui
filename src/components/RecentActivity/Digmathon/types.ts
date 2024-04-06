import { InsightType } from "../../Insights/types";

export interface DigmathonProgressProps {
  onGoBack: () => void;
  isCongratulationsView: boolean;
}

export interface DigmathonProgressData {
  insights: { type: InsightType; isFound: boolean }[];
}

export interface DigmathonInsightCardData {
  title: string;
  description: string;
  illustration: JSX.Element;
}

export interface DigmathonInsightData {
  type: InsightType;
  data: DigmathonInsightCardData | undefined;
  isFound: boolean;
}
