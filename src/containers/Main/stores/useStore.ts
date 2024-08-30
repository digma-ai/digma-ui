import { create } from "zustand";
import { withSlices } from "zustand-slices";
import { Scope } from "../../../components/common/App/types";
import { globalSlice } from "../slices/globalSlice";
import { insightsSlice } from "../slices/insightSlice";
import { createSelectors } from "./createSelectors";
import { withMutableActions } from "./withMutableActions";

export const useStore = createSelectors(
  create(
    withMutableActions(withSlices(globalSlice, insightsSlice), {
      setScope: (scope: Scope) => (_, set) => {
        set((state) =>
          state.global.scope?.span?.spanCodeObjectId !==
          scope.span?.spanCodeObjectId
            ? {
                ...state,
                global: { ...state.global, scope },
                insights: { ...state.insights, page: 0, search: "" }
              }
            : state
        );
      }
    })
  )
);
