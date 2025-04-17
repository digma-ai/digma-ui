import { create } from "zustand";
import { withSlices } from "zustand-slices";
import type { Scope } from "../components/common/App/types";
import { assetsSlice } from "./assets/assetsSlice";
import { configSlice } from "./config/configSlice";
import { errorsSlice } from "./errors/errorsSlice";
import { insightsSlice } from "./insights/insightsSlice";
import { withMutableActions } from "./withMutableActions";

export const useStore = create(
  withMutableActions(
    withSlices(configSlice, insightsSlice, assetsSlice, errorsSlice),
    {
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
      },
      clearInsightsFilters: (spanCodeObjectId?: string) => (_, set) => {
        set((state) => ({
          ...state,
          config: {
            ...state.config,
            ...(spanCodeObjectId ? {} : { selectedServices: [] })
          },
          insights: {
            ...state.insights,
            page: 0,
            search: "",
            filters: [],
            lastDays: null,
            ...(spanCodeObjectId
              ? { filteredInsightTypes: [], filteredCriticalityLevels: [] }
              : {
                  filteredInsightTypesInGlobalScope: [],
                  filteredCriticalityLevelsInGlobalScope: []
                })
          }
        }));
      }
    }
  )
);
