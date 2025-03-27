import { createSlice } from "zustand-slices";
import type { ViewMode } from "../../components/Assets/AssetsViewScopeConfiguration/types";
import type { Sorting } from "../../components/common/SortingSelector/types";
import type {
  GetAssetsCategoriesResponse,
  GetAssetsResponse
} from "../../redux/services/types";
import {
  AssetsSortingCriterion,
  SortingOrder
} from "../../redux/services/types";
import type { InsightType } from "../../types";

export interface AssetsFilters {
  services: string[];
  endpoints: string[];
  consumers: string[];
  internals: string[];
  insights: InsightType[];
  scopedSpanCodeObjectId?: string;
  directOnly?: boolean;
  displayName?: string;
}

export interface AssetsState {
  assetCategoriesData: GetAssetsCategoriesResponse | null;
  isAssetCategoriesDataLoading: boolean;
  assets: GetAssetsResponse | null;
  areAssetsLoading: boolean;
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting<AssetsSortingCriterion>;
  showAssetsHeaderToolBox: boolean;
}

const allFiltersInitialState: {
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting<AssetsSortingCriterion>;
} = {
  filters: null,
  viewMode: "descendants",
  search: "",
  page: 0,
  sorting: {
    criterion: AssetsSortingCriterion.CriticalInsights,
    order: SortingOrder.Desc
  }
};

const initialState: AssetsState = {
  ...allFiltersInitialState,
  assetCategoriesData: null,
  isAssetCategoriesDataLoading: false,
  assets: null,
  areAssetsLoading: false,
  showAssetsHeaderToolBox: true
};

const set = (update: Partial<AssetsState>) => (state: AssetsState) => ({
  ...state,
  ...update
});

export const assetsSlice = createSlice({
  name: "assets",
  value: initialState,
  actions: {
    setAssetCategoriesData: (data: GetAssetsCategoriesResponse) =>
      set({ assetCategoriesData: data }),
    setIsAssetCategoriesDataLoading: (isLoading: boolean) =>
      set({ isAssetCategoriesDataLoading: isLoading }),
    setAssets: (assets: GetAssetsResponse) => set({ assets }),
    setAreAssetsLoading: (isLoading: boolean) =>
      set({ areAssetsLoading: isLoading }),
    setAssetsFilters: (filters: AssetsFilters | null) => set({ filters }),
    setAssetsViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setAssetsSearch: (search: string) => set({ search }),
    setAssetsPage: (page: number) => set({ page }),
    setAssetsSorting: (sorting: Sorting<AssetsSortingCriterion>) =>
      set({ sorting }),
    setShowAssetsHeaderToolBox: (showAssetsHeaderToolBox: boolean) =>
      set({ showAssetsHeaderToolBox }),
    resetAssets: () => set(initialState)
  }
});
