import { Duration } from "../../../globals";
import { AssetFilterQuery } from "../AssetsFilter/types";
import { AssetScopeOption } from "../AssetsViewScopeConfiguration/types";

export interface AssetListProps {
  onGoToAllAssets: () => void;
  assetTypeId: string;
  filters?: AssetFilterQuery;
  searchQuery: string;
  scopeViewOptions: AssetScopeOption | null;
  setRefresher: (refresher: () => void) => void;
  onAssetCountChange: (count: number) => void;
}

export enum SORTING_CRITERION {
  CRITICAL_INSIGHTS = "criticalinsights",
  PERFORMANCE = "p50",
  SLOWEST_FIVE_PERCENT = "p95",
  LATEST = "latest",
  NAME = "displayname",
  PERFORMANCE_IMPACT = "performanceimpact"
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
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingOrderIconContainerProps {
  $sortingOrder: SORTING_ORDER;
}

export interface Insight {
  type: string;
  importance: number;
  criticality: number;
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
  instrumentationLibrary?: string;
  insights: Insight[];
  latestSpanTimestamp: string;
  /** @deprecated */
  impactScores?: ImpactScores;
  impactScore: number;
  service: string;
  services: string[];
  spanCodeObjectId: string;
  firstDetected?: string;
}

export interface AssetsData {
  data: AssetEntry[];
  totalCount: number;
  filteredCount: number;
}
