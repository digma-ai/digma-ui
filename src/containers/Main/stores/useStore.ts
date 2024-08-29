import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { createGlobalSlice, GlobalSlice } from "../slices/createGlobalSlice";
import {
  createInsightsSlice,
  InsightsSlice
} from "../slices/createInsightSlice";
import { createScopeSlice, ScopeSlice } from "../slices/createScopeSlice";
import { createSelectors } from "./createSelectors";

export interface StoreState {
  insights: InsightsSlice;
  global: GlobalSlice;
  scope: ScopeSlice;
}

export const useStore = createSelectors(
  create(
    withSlices(createScopeSlice(), createGlobalSlice(), createInsightsSlice())
  )
);
