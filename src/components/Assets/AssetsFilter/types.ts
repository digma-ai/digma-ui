import { InsightType } from "../../Insights/types";

export interface AssetFilterEntry {
  enabled: boolean;
  selected: boolean;
  name: string;
}

export interface AssetFilterCategory {
  categoryName?: string;
  categories?: AssetFilterCategory[];
  entries?: AssetFilterEntry[];
}

export interface AssetsFiltersData {
  categories: AssetFilterCategory[];
}

export interface AssetFilterQuery {
  services: string[];
  operations: string[];
  insights: string[];
  scopedSpanCodeObjectId?: string;
  directOnly?: boolean;
  displayName?: string;
}

export interface GetAssetFiltersDataPayload {
  query: AssetFilterQuery;
}

export interface GetAssetFiltersDataParams {
  services: string[];
  operations: string[];
  insights: InsightType[];
  viewMode?: string;
  scopeSpanCodeObjectId?: string;
  searchQuery: string;
}
