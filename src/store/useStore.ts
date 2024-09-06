import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { Scope } from "../components/common/App/types";
import { assetsSlice } from "./assetsSlice/assetsSlice";
import { configSlice } from "./config/configSlice";
import { insightsSlice } from "./insights/insightsSlice";
import { withMutableActions } from "./withMutableActions";

export const useStore = create(
  withMutableActions(withSlices(configSlice, insightsSlice, assetsSlice), {
    setScope: (scope: Scope) => (_, set) => {
      set((state) =>
        state.config.scope?.span?.spanCodeObjectId !==
        scope.span?.spanCodeObjectId
          ? {
              ...state,
              config: { ...state.config, scope },
              insights: { ...state.insights, page: 0, search: "" }
            }
          : state
      );
    }
  })
);
