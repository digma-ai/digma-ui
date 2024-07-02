export interface AssetsFilterProps {
  filters?: AssetFilterQuery;
  onApply: (filter: AssetFilterQuery) => void;
}

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
}
