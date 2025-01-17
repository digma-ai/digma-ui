export interface SuggestionBarProps {
  insightId?: string;
  onClose: () => void;
}

export type AssetsViewMode = "actionItems" | "code";

export enum RecommendationPriority {
  Low = "low",
  Medium = "medium",
  High = "high"
}
