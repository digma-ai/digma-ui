import { createSlice } from "zustand-slices";
import type { ViewMode } from "../../components/Assets/AssetsViewScopeConfiguration/types";
import type {
  GetAssetsCategoriesResponse,
  GetAssetsResponse
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
  assets: GetAssetsResponse | null;
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
  showAssetsHeaderToolBox: boolean;
}

const allFiltersInitialState: {
  filters: AssetsFilters | null;
  viewMode: ViewMode;
  search: string;
} = {
  filters: null,
  viewMode: "descendants",
  search: ""
};

const initialState: AssetsState = {
  ...allFiltersInitialState,
  assetCategoriesData: null,
  assets: null,
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
    setAssets: (assets: GetAssetsResponse) => set({ assets }),
    setAssetsFilters: (filters: AssetsFilters | null) => set({ filters }),
    setAssetsViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setAssetsSearch: (search: string) => set({ search }),
    setShowAssetsHeaderToolBox: (showAssetsHeaderToolBox: boolean) =>
      set({ showAssetsHeaderToolBox }),
    resetAssets: () => set(initialState)
  }
});
