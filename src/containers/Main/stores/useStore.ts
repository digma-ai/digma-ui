import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { createGlobalSlice } from "../slices/createGlobalSlice";
import { createInsightsSlice } from "../slices/createInsightSlice";
import { createScopeSlice } from "../slices/createScopeSlice";

export const useStore = create(
  withSlices(createGlobalSlice(), createInsightsSlice(), createScopeSlice())
);
