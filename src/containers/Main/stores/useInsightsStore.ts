import { create } from "zustand";
import {
  Sorting,
  SORTING_ORDER
} from "../../../components/common/SortingSelector/types";
import {
  InsightFilterType,
  SORTING_CRITERION,
  ViewMode
} from "../../../components/Insights/InsightsCatalog/types";
import { IssuesFiltersData } from "../../../components/Insights/Issues/IssuesFilter/types";
import {
  InsightsData,
  InsightViewType
} from "../../../components/Insights/types";
import { createSelectors } from "./createSelectors";

export interface InsightsState {
  data: InsightsData | null;
  isDataLoading: boolean;
  search: string;
  page: number;
  sorting: Sorting;
  viewMode: ViewMode;
  filters: InsightFilterType[];
  filteredInsightTypes: string[];
  insightViewType: InsightViewType | null;
  issuesFilters: IssuesFiltersData | null;
  areIssuesFiltersLoading: boolean;
}

export const initialState: InsightsState = {
  data: null,
  isDataLoading: false,
  search: "",
  page: 0,
  sorting: {
    criterion: SORTING_CRITERION.LATEST,
    order: SORTING_ORDER.DESC
  },
  viewMode: ViewMode.All,
  filters: [],
  filteredInsightTypes: [],
  insightViewType: null,
  issuesFilters: null,
  areIssuesFiltersLoading: false
};

export interface InsightsActions {
  setData: (data: InsightsData) => void;
  setIsDataLoading: (isDataLoading: boolean) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setSorting: (sorting: Sorting) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setFilters: (filters: InsightFilterType[]) => void;
  setFilteredInsightTypes: (insightTypes: string[]) => void;
  setInsightViewType: (insightViewType: InsightViewType) => void;
  setIssuesFilters: (filters: IssuesFiltersData) => void;
  setAreIssuesFiltersLoading: (areIssuesFiltersLoading: boolean) => void;
  reset: () => void;
}

export const useInsightsStore = createSelectors(
  create<InsightsState & InsightsActions>()((set) => ({
    ...initialState,
    setData: (data) => set({ data }),
    setIsDataLoading: (isDataLoading) => set({ isDataLoading }),
    setSearch: (search) => set({ search }),
    setPage: (page) => set({ page }),
    setSorting: (sorting) => set({ sorting }),
    setViewMode: (viewMode) => set({ viewMode }),
    setFilters: (filters) => set({ filters }),
    setFilteredInsightTypes: (filteredInsightTypes) =>
      set({ filteredInsightTypes }),
    setInsightViewType: (insightViewType) => set({ insightViewType }),
    setIssuesFilters: (issuesFilters) => set({ issuesFilters }),
    setAreIssuesFiltersLoading: (areIssuesFiltersLoading) =>
      set({ areIssuesFiltersLoading }),
    reset: () => set(initialState)
  }))
);
