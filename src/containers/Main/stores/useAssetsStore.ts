import { create } from "zustand";
import {
  AssetsData,
  Sorting,
  SORTING_CRITERION,
  SORTING_ORDER
} from "../../../components/Assets/AssetList/types";
import { AssetCategoryData } from "../../../components/Assets/AssetTypeList/types";
import { AssetFilterQuery } from "../../../components/Assets/AssetsFilter/types";
import { ViewMode } from "../../../components/Assets/AssetsViewScopeConfiguration/types";
import { history } from "../history";
import { createSelectors } from "./createSelectors";

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

export interface AssetsActions {
  setAssetCategories: (categories: AssetCategoryData[]) => void;
  setAreAssetCategoriesLoading: (isLoading: boolean) => void;
  setSelectedAssetCategory: (category: string | null) => void;
  setAssets: (assets: AssetsData) => void;
  setAreAssetsLoading: (isLoading: boolean) => void;
  setFilters: (filters: AssetFilterQuery) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setSorting: (sorting: Sorting) => void;
  reset: () => void;
}

const updateHistoryState = (partialState: Partial<AssetsState>) => {
  const currentHistoryEntry = history.getCurrentLocation();

  if (currentHistoryEntry) {
    history.replaceEntry(currentHistoryEntry.location, {
      ...(currentHistoryEntry.state ?? {}),
      assets: {
        ...(currentHistoryEntry.state?.assets ?? allFiltersInitialState),
        ...partialState
      }
    });
  }
};

export const useAssetsStore = createSelectors(
  create<AssetsState & AssetsActions>()((set) => ({
    ...initialState,
    setAssetCategories: (categories) => set({ assetCategories: categories }),
    setAreAssetCategoriesLoading: (isLoading) =>
      set({ areAssetCategoriesLoading: isLoading }),
    setSelectedAssetCategory: (category) =>
      set({ selectedAssetCategory: category }),
    setAssets: (assets) => set({ assets }),
    setAreAssetsLoading: (isLoading) => set({ areAssetsLoading: isLoading }),
    setFilters: (filters) => {
      updateHistoryState({ filters });

      set({ filters });
    },
    setViewMode: (viewMode) => {
      updateHistoryState({ viewMode });

      set({ viewMode });
    },
    setSearch: (search) => {
      updateHistoryState({ search });

      set({ search });
    },
    setPage: (page) => {
      updateHistoryState({ page });

      set({ page });
    },
    setSorting: (sorting) => {
      updateHistoryState({ sorting });

      set({ sorting });
    },
    reset: () => set(initialState)
  }))
);
