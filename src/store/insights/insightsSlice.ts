import { createSlice } from "zustand-slices";
import type { Sorting } from "../../components/common/SortingSelector/types";
import { SORTING_ORDER } from "../../components/common/SortingSelector/types";
import type { IssuesFiltersData } from "../../components/Insights/InsightsCatalog/FilterPanel/IssuesFilter/types";
import type { InsightFilterType } from "../../components/Insights/InsightsCatalog/types";
import {
  SORTING_CRITERION,
  ViewMode
} from "../../components/Insights/InsightsCatalog/types";
import type {
  InsightsData,
  InsightViewType
} from "../../components/Insights/types";
import type { IssueCriticality } from "../../redux/services/types";

interface InsightsState {
  data: InsightsData | null;
  isDataLoading: boolean;
  search: string;
  page: number;
  sorting: Sorting;
  viewMode: ViewMode;
  filters: InsightFilterType[];
  filteredInsightTypes: string[];
  filteredInsightTypesInGlobalScope: string[];
  filteredCriticalityLevels: IssueCriticality[];
  filteredCriticalityLevelsInGlobalScope: IssueCriticality[];
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
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  },
  viewMode: ViewMode.All,
  filters: [],
  filteredInsightTypes: [],
  filteredInsightTypesInGlobalScope: [],
  filteredCriticalityLevels: ["Medium", "High"],
  filteredCriticalityLevelsInGlobalScope: ["Medium", "High"],
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
    setInsightsFilteredInsightTypesInGlobalScope: (
      filteredInsightTypesInGlobalScope: string[]
    ) => set({ filteredInsightTypesInGlobalScope }),
    setInsightsFilteredCriticalityLevels: (
      filteredCriticalityLevels: IssueCriticality[]
    ) => set({ filteredCriticalityLevels }),
    setInsightsFilteredCriticalityLevelsInGlobalScope: (
      filteredCriticalityLevelsInGlobalScope: IssueCriticality[]
    ) => set({ filteredCriticalityLevelsInGlobalScope }),
    setInsightViewType: (insightViewType: InsightViewType) =>
      set({ insightViewType }),
    setInsightsIssuesFilters: (issuesFilters: IssuesFiltersData) =>
      set({ issuesFilters }),
    setAreInsightsIssuesFiltersLoading: (areIssuesFiltersLoading: boolean) =>
      set({ areIssuesFiltersLoading }),
    resetInsights: () => set(initialState)
  }
});
