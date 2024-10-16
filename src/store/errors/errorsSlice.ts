import { createSlice } from "zustand-slices";
import { EndpointFilterData } from "../../components/Errors/GlobalErrorsList/GlobalErrorsFilters/types";
import {
  GlobalErrorData,
  SetGlobalErrorsDataPayload
} from "../../components/Errors/GlobalErrorsList/types";

export const PAGE_SIZE = 10;

export enum GLOBAL_ERROR_SORTING_CRITERION {
  CRITICALITY = "Criticality",
  LATEST = "Latest"
}

export type ErrorFilter = "Services" | "Endpoints" | "ErrorTypes";
export type ErrorHandlingType = "Handled" | "Unhandled";
export type ErrorCriticality = "High" | "Medium" | "Low";

export interface GlobalErrorsFiltersState {
  services: string[] | null;
  endpoints: EndpointFilterData[] | null;
  errorTypes: string[] | null;
}

export interface GlobalErrorsSelectedFiltersState {
  services: string[];
  endpoints: string[];
  errorTypes: string[];
  criticality: ErrorCriticality[];
  handlingTypes: ErrorHandlingType[];
}

export interface ErrorsState {
  globalErrorsList: GlobalErrorData[] | null;
  globalErrorsTotalCount: number;
  areGlobalErrorsLoading: boolean;
  globalErrorsSearch: string;
  globalErrorsPage: number;
  globalErrorsPageSize: number;
  globalErrorsSorting: GLOBAL_ERROR_SORTING_CRITERION;
  globalErrorsFilters: GlobalErrorsFiltersState;
  globalErrorsSelectedFilters: GlobalErrorsSelectedFiltersState;
}

const selectedFiltersInitialState = {
  services: [],
  endpoints: [],
  errorTypes: [],
  criticality: [],
  handlingTypes: []
};

export const initialState: ErrorsState = {
  globalErrorsList: null,
  globalErrorsTotalCount: 0,
  areGlobalErrorsLoading: false,
  globalErrorsSearch: "",
  globalErrorsPage: 0,
  globalErrorsPageSize: PAGE_SIZE,
  globalErrorsSorting: GLOBAL_ERROR_SORTING_CRITERION.CRITICALITY,
  globalErrorsFilters: {
    services: null,
    endpoints: null,
    errorTypes: null
  },
  globalErrorsSelectedFilters: selectedFiltersInitialState
};

const set = (update: Partial<ErrorsState>) => (state: ErrorsState) => ({
  ...state,
  ...update
});

export const errorsSlice = createSlice({
  name: "errors",
  value: initialState,
  actions: {
    setGlobalErrorsData: (data: SetGlobalErrorsDataPayload | null) =>
      set({
        globalErrorsList: data?.list ?? [],
        globalErrorsTotalCount: data?.totalCount ?? 0
      }),
    setAreGlobalErrorsLoading: (areGlobalErrorsLoading: boolean) =>
      set({ areGlobalErrorsLoading }),
    setGlobalErrorsSearch: (search: string) =>
      set({ globalErrorsSearch: search }),
    setGlobalErrorsPage: (page: number) => set({ globalErrorsPage: page }),
    setGlobalErrorsPageSize: (pageSize: number) =>
      set({ globalErrorsPageSize: pageSize }),
    setGlobalErrorsSorting: (sorting: GLOBAL_ERROR_SORTING_CRITERION) =>
      set({ globalErrorsSorting: sorting }),
    setGlobalErrorsFilters: (filters: ErrorsState["globalErrorsFilters"]) =>
      set({ globalErrorsFilters: filters }),
    setGlobalErrorsSelectedFilters: (
      filters: ErrorsState["globalErrorsSelectedFilters"]
    ) => set({ globalErrorsSelectedFilters: filters }),
    resetGlobalErrorsSelectedFilters: () =>
      set({ globalErrorsSelectedFilters: selectedFiltersInitialState }),
    resetGlobalErrors: () => set(initialState)
  }
});
