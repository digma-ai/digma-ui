import { createSlice } from "zustand-slices";
import {
  AssetsData,
  Sorting,
  SORTING_CRITERION,
  SORTING_ORDER
} from "../../components/Assets/AssetList/types";
import { AssetCategoryData } from "../../components/Assets/AssetTypeList/types";
import { AssetFilterQuery } from "../../components/Assets/AssetsFilter/types";
import { ViewMode } from "../../components/Assets/AssetsViewScopeConfiguration/types";

export interface AssetsState {
  assetCategories: AssetCategoryData[] | null;
  areAssetCategoriesLoading: boolean;
  selectedAssetCategory: string | null;
  assets: AssetsData | null;
  areAssetsLoading: boolean;
  filters: AssetFilterQuery;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting;
}

const allFiltersInitialState: {
  filters: AssetFilterQuery;
  viewMode: ViewMode;
  search: string;
  page: number;
  sorting: Sorting;
} = {
  filters: {
    services: [],
    operations: [],
    insights: []
  },
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
  assetCategories: null,
  areAssetCategoriesLoading: false,
  selectedAssetCategory: null,
  assets: null,
  areAssetsLoading: false
};

const set = (update: Partial<AssetsState>) => (state: AssetsState) => ({
  ...state,
  ...update
});

export const assetsSlice = createSlice({
  name: "assets",
  value: initialState,
  actions: {
    setAssetCategories: (categories: AssetCategoryData[]) =>
      set({ assetCategories: categories }),
    setAreAssetCategoriesLoading: (isLoading: boolean) =>
      set({ areAssetCategoriesLoading: isLoading }),
    setSelectedAssetCategory: (category: string | null) =>
      set({ selectedAssetCategory: category }),
    setAssets: (assets: AssetsData) => set({ assets }),
    setAreAssetsLoading: (isLoading: boolean) =>
      set({ areAssetsLoading: isLoading }),
    setAssetsFilters: (filters: AssetFilterQuery) => set({ filters }),
    setAssetsViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setAssetsSearch: (search: string) => set({ search }),
    setAssetsPage: (page: number) => set({ page }),
    setAssetsSorting: (sorting: Sorting) => set({ sorting }),
    resetAssets: () => set(initialState)
  }
});
