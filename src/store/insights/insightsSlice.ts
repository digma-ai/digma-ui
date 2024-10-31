import { createSlice } from "zustand-slices";
import {
  Sorting,
  SORTING_ORDER
} from "../../components/common/SortingSelector/types";
import { IssuesFiltersData } from "../../components/Insights/InsightsCatalog/FilterPanel/IssuesFilter/types";
import {
  InsightFilterType,
  SORTING_CRITERION,
  ViewMode
} from "../../components/Insights/InsightsCatalog/types";
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
    setInsightsData: (data: InsightsData) => set({ data }),
    setIsInsightsDataLoading: (isDataLoading: boolean) =>
      set({ isDataLoading }),
    setInsightsSearch: (search: string) => set({ search }),
    setInsightsPage: (page: number) => set({ page }),
    setInsightsSorting: (sorting: Sorting) => set({ sorting }),
    setInsightsViewMode: (viewMode: ViewMode) => set({ viewMode }),
    setInsightsFilters: (filters: InsightFilterType[]) => set({ filters }),
    setInsightsFilteredInsightTypes: (filteredInsightTypes: string[]) =>
      set({ filteredInsightTypes }),
    setInsightViewType: (insightViewType: InsightViewType) =>
      set({ insightViewType }),
    setInsightsIssuesFilters: (issuesFilters: IssuesFiltersData) =>
      set({ issuesFilters }),
    setAreInsightsIssuesFiltersLoading: (areIssuesFiltersLoading: boolean) =>
      set({ areIssuesFiltersLoading }),
    resetInsights: () => set(initialState)
  }
});
