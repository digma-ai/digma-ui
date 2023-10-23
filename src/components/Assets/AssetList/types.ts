import { Duration } from "../../../globals";

export interface AssetListProps {
  data?: AssetsData;
  onBackButtonClick: () => void;
  assetTypeId: string;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  PERFORMANCE = "p50",
  SLOWEST_FIVE_PERCENT = "p95",
  LATEST = "latest",
  NAME = "displayname",
  PERFORMANCE_IMPACT = "performanceimpact",
  OVERALL_IMPACT = "overallimpact"
}

export enum SORTING_ORDER {
  ASC = "asc",
  DESC = "desc"
}

export interface Sorting {
  criterion: SORTING_CRITERION;
  order: SORTING_ORDER;
}

export interface SortingMenuButtonProps {
  isOpen: boolean;
}

export interface SortingOrderOptionProps {
  selected: boolean;
}

export interface Insight {
  type: string;
  importance: number;
}

export interface ImpactScores {
  ScoreExp25: number;
  ScoreExp1000: number;
}

export interface AssetEntry {
  assetType: string;
  p50: Duration | null;
  p95: Duration | null;
  displayName: string;
  insights: Insight[];
  latestSpanTimestamp: string;
  impactScores?: ImpactScores;
  service: string;
  spanCodeObjectId: string;
}

export interface AssetEntryWithServices extends AssetEntry {
  relatedServices: string[];
}

export type AssetsData = {
  data: AssetEntry[];
  totalCount: number;
};
