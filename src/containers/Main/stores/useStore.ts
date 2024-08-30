import { create } from "zustand";
import { withActions, withSlices } from "zustand-slices";
import { Scope } from "../../../components/common/App/types";
import { globalSlice } from "../slices/globalSlice";
import { insightsSlice } from "../slices/insightSlice";
import { createSelectors } from "./createSelectors";

export const useStore = createSelectors(
  create(
    withActions(withSlices(globalSlice, insightsSlice), {
      setScope: (scope: Scope) => (state) => {
        return state.global.scope?.span?.spanCodeObjectId !==
          scope.span?.spanCodeObjectId
          ? {
              ...state,
              global: { ...state.global, scope },
              insights: { ...state.insights, page: 0, search: "" }
            }
          : state;
      }
    })
  )
);
