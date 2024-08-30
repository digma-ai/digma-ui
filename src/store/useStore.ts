import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { Scope } from "../components/common/App/types";
import { configSlice } from "./config/configSlice";
import { insightsSlice } from "./insights/insightsSlice";
import { withMutableActions } from "./withMutableActions";

export const useStore = create(
  withMutableActions(withSlices(configSlice, insightsSlice), {
    setScope: (scope: Scope) => (_, set) => {
      set((state) =>
        state.config.scope?.span?.spanCodeObjectId !==
        scope.span?.spanCodeObjectId
          ? {
              ...state,
              global: { ...state.config, scope },
              insights: { ...state.insights, page: 0, search: "" }
            }
          : state
      );
    }
  })
);
