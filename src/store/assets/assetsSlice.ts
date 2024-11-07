import { createSlice } from "zustand-slices";
import {
  AssetsData,
  Sorting,
  SORTING_CRITERION,
  SORTING_ORDER
} from "../../components/Assets/AssetList/types";
import { AssetCategoriesData } from "../../components/Assets/AssetTypeList/types";
import { ViewMode } from "../../components/Assets/AssetsViewScopeConfiguration/types";

export interface AssetsFilters {
  services: string[];
  endpoints: string[];
  consumers: string[];
  internals: string[];
  insights: string[];
  scopedSpanCodeObjectId?: string;
  directOnly?: boolean;
  displayName?: string;
}

export interface AssetsState {
  assetCategoriesData: AssetCategoriesData | null;
  isAssetCategoriesDataLoading: boolean;
  selectedAssetCategory: string | null;
  assets: AssetsData | null;
  areAssetsLoading: boolean;
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting;
  showAssetsHeaderToolBox: boolean;
}

const allFiltersInitialState: {
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting;
} = {
  filters: null,
  viewMode: "descendants",
  search: "",
  page: 0,
  sorting: {
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  }
};

export const initialState: AssetsState = {
  ...allFiltersInitialState,
  assetCategoriesData: null,
  isAssetCategoriesDataLoading: false,
  selectedAssetCategory: null,
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
    setAssetCategoriesData: (data: AssetCategoriesData) =>
      set({ assetCategoriesData: data }),
    setIsAssetCategoriesDataLoading: (isLoading: boolean) =>
      set({ isAssetCategoriesDataLoading: isLoading }),
    setSelectedAssetCategory: (category: string | null) =>
      set({ selectedAssetCategory: category }),
    setAssets: (assets: AssetsData) => set({ assets }),
    setAreAssetsLoading: (isLoading: boolean) =>
      set({ areAssetsLoading: isLoading }),
    setAssetsFilters: (filters: AssetsFilters) => set({ filters }),
    setAssetsViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setAssetsSearch: (search: string) => set({ search }),
    setAssetsPage: (page: number) => set({ page }),
    setAssetsSorting: (sorting: Sorting) => set({ sorting }),
    setShowAssetsHeaderToolBox: (showAssetsHeaderToolBox: boolean) =>
      set({ showAssetsHeaderToolBox }),
    resetAssets: () => set(initialState)
  }
});
