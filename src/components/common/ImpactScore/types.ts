export interface ImpactScoreProps {
  score: number;
  showIndicator?: boolean;
  indicatorPosition?: "start" | "end";
}

export interface ImpactScoreIndicatorProps {
  $score: number;
}
