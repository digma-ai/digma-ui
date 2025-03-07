import { createSlice } from "zustand-slices";
import type { Sorting } from "../../components/common/SortingSelector/types";
import { SORTING_ORDER } from "../../components/common/SortingSelector/types";
import type { InsightFilterType } from "../../components/Insights/InsightsCatalog/types";
import {
  SORTING_CRITERION,
  ViewMode
} from "../../components/Insights/InsightsCatalog/types";
import type {
  InsightType,
  InsightViewType
} from "../../components/Insights/types";
import type {
  GetInsightsResponse,
  GetIssuesFiltersResponse,
  GetIssuesResponse,
  IssueCriticality
} from "../../redux/services/types";

export type InsightsData = GetIssuesResponse | GetInsightsResponse;

interface InsightsState {
  data: InsightsData | null;
  isDataLoading: boolean;
  search: string;
  page: number;
  sorting: Sorting;
  viewMode: ViewMode;
  filters: InsightFilterType[];
  filteredInsightTypes: InsightType[];
  filteredInsightTypesInGlobalScope: InsightType[];
  filteredCriticalityLevels: IssueCriticality[];
  filteredCriticalityLevelsInGlobalScope: IssueCriticality[];
  insightViewType: InsightViewType | null;
  issuesFilters: GetIssuesFiltersResponse | null;
  areIssuesFiltersLoading: boolean;
}

export const initialState: InsightsState = {
  data: null,
  isDataLoading: false,
  search: "",
  page: 0,
  sorting: {
    criterion: SORTING_CRITERION.CRITICALITY,
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
    setInsightsFilteredInsightTypes: (filteredInsightTypes: InsightType[]) =>
      set({ filteredInsightTypes }),
    setInsightsFilteredInsightTypesInGlobalScope: (
      filteredInsightTypesInGlobalScope: InsightType[]
    ) => set({ filteredInsightTypesInGlobalScope }),
    setInsightsFilteredCriticalityLevels: (
      filteredCriticalityLevels: IssueCriticality[]
    ) => set({ filteredCriticalityLevels }),
    setInsightsFilteredCriticalityLevelsInGlobalScope: (
      filteredCriticalityLevelsInGlobalScope: IssueCriticality[]
    ) => set({ filteredCriticalityLevelsInGlobalScope }),
    setInsightViewType: (insightViewType: InsightViewType) =>
      set({ insightViewType }),
    setInsightsIssuesFilters: (issuesFilters: GetIssuesFiltersResponse) =>
      set({ issuesFilters }),
    setAreInsightsIssuesFiltersLoading: (areIssuesFiltersLoading: boolean) =>
      set({ areIssuesFiltersLoading }),
    resetInsights: () => set(initialState)
  }
});
