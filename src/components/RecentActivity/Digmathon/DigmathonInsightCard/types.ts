import { DigmathonInsightCardData } from "../../types";

export interface DigmathonInsightCardProps {
  number: number;
  data: DigmathonInsightCardData;
  isActive: boolean;
}

export interface ContainerProps {
  $isActive: boolean;
}
