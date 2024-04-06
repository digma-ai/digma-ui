import { DigmathonInsightCardData } from "../types";

export type DigmathonInsightCardProps = {
  number: number;
  data: DigmathonInsightCardData;
  isActive: boolean;
};

export type ContainerProps = {
  $isActive: boolean;
};
