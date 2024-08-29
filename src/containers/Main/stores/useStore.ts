import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { globalSlice } from "../slices/globalSlice";
import { insightsSlice } from "../slices/insightSlice";
import { scopeSlice } from "../slices/scopeSlice";
import { createSelectors } from "./createSelectors";

export const useStore = createSelectors(
  create(withSlices(globalSlice, insightsSlice, scopeSlice))
);
