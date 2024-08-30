import { createSlice } from "zustand-slices";
import {
  Sorting,
  SORTING_ORDER
} from "../../components/common/SortingSelector/types";
import {
  InsightFilterType,
  SORTING_CRITERION,
  ViewMode
} from "../../components/Insights/InsightsCatalog/types";
import { IssuesFiltersData } from "../../components/Insights/Issues/IssuesFilter/types";
import { InsightsData, InsightViewType } from "../../components/Insights/types";

interface InsightsState {
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

const initialState: InsightsState = {
  data: null,
  isDataLoading: false,
  search: "",
  page: 0,
  sorting: {
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  },
  viewMode: ViewMode.All,
  filters: [],
  filteredInsightTypes: [],
  insightViewType: null,
  issuesFilters: null,
  areIssuesFiltersLoading: false
};

const set = (update: Partial<InsightsState>) => (state: InsightsState) => ({
  ...state,
  ...update
});

export const insightsSlice = createSlice({
  name: "insights",
  value: initialState,
  actions: {
    setData: (data: InsightsData) => set({ data }),
    setIsDataLoading: (isDataLoading: boolean) => set({ isDataLoading }),
    setSearch: (search: string) => set({ search }),
    setPage: (page: number) => set({ page }),
    setSorting: (sorting: Sorting) => set({ sorting }),
    setViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setFilters: (filters: InsightFilterType[]) => set({ filters }),
    setFilteredInsightTypes: (filteredInsightTypes: string[]) =>
      set({ filteredInsightTypes }),
    setInsightViewType: (insightViewType: InsightViewType) =>
      set({ insightViewType }),
    setIssuesFilters: (issuesFilters: IssuesFiltersData) =>
      set({ issuesFilters }),
    setAreIssuesFiltersLoading: (areIssuesFiltersLoading: boolean) =>
      set({ areIssuesFiltersLoading }),
    insightsReset: () => set(initialState)
  }
});
