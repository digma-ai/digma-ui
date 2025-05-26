import { create } from "zustand";
import type { InsightsData } from "./insights/insightsSlice";

export interface AnalyticsState {
  data: InsightsData | null;
  isDataLoading: boolean;
}

export const initialState: AnalyticsState = {
  data: null,
  isDataLoading: false
};

export interface AnalyticsActions {
  setData: (data: InsightsData) => void;
  setIsDataLoading: (isDataLoading: boolean) => void;
  reset: () => void;
}

export const useIssuesStore = create<AnalyticsState & AnalyticsActions>()(
  (set) => ({
    ...initialState,
    setData: (data) => set({ data }),
    setIsDataLoading: (isDataLoading) => set({ isDataLoading }),
    reset: () => set(initialState)
  })
);
