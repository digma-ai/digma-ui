import { createSlice } from "zustand-slices";
import type {
  EndpointFilterData,
  ErrorCriticality,
  ErrorHandlingType,
  ErrorListItem,
  GetGlobalErrorsResponse
} from "../../redux/services/types";
import { GlobalErrorsSortingCriterion } from "../../redux/services/types";

export const PAGE_SIZE = 10;

export enum ViewMode {
  All,
  OnlyDismissed
}

export interface GlobalErrorsFiltersState {
  services: string[] | null;
  endpoints: EndpointFilterData[] | null;
  errorTypes: string[] | null;
}

export interface GlobalErrorsSelectedFiltersState {
  endpoints: string[];
  errorTypes: string[];
  criticalities: ErrorCriticality[];
  handlingTypes: ErrorHandlingType[];
}

export interface ErrorsState {
  globalErrorsList: ErrorListItem[] | null;
  globalErrorsTotalCount: number;
  areGlobalErrorsLoading: boolean;
  globalErrorsSearch: string;
  globalErrorsPage: number;
  globalErrorsPageSize: number;
  globalErrorsSorting: GlobalErrorsSortingCriterion;
  globalErrorsFilters: GlobalErrorsFiltersState;
  globalErrorsSelectedFilters: GlobalErrorsSelectedFiltersState | null;
  globalErrorsViewMode: ViewMode;
  errorDetailsWorkspaceItemsOnly: boolean;
  globalErrorsLastDays: number | null;
}

const globalErrorsWithoutFiltersInitialState: Omit<
  ErrorsState,
  "globalErrorsSelectedFilters" | "errorDetailsWorkspaceItemsOnly"
> = {
  globalErrorsList: null,
  globalErrorsTotalCount: 0,
  areGlobalErrorsLoading: false,
  globalErrorsSearch: "",
  globalErrorsPage: 0,
  globalErrorsPageSize: PAGE_SIZE,
  globalErrorsSorting: GlobalErrorsSortingCriterion.Criticality,
  globalErrorsFilters: {
    services: null,
    endpoints: null,
    errorTypes: null
  },
  globalErrorsViewMode: ViewMode.All,
  globalErrorsLastDays: null
};

const globalErrorsInitialState: Omit<
  ErrorsState,
  "errorDetailsWorkspaceItemsOnly"
> = {
  ...globalErrorsWithoutFiltersInitialState,
  globalErrorsSelectedFilters: null
};

const initialState: ErrorsState = {
  ...globalErrorsInitialState,
  errorDetailsWorkspaceItemsOnly: false
};

const set = (update: Partial<ErrorsState>) => (state: ErrorsState) => ({
  ...state,
  ...update
});

export const errorsSlice = createSlice({
  name: "errors",
  value: initialState,
  actions: {
    setGlobalErrorsData: (data: GetGlobalErrorsResponse | null) =>
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
    setGlobalErrorsSorting: (sorting: GlobalErrorsSortingCriterion) =>
      set({ globalErrorsSorting: sorting }),
    setGlobalErrorsFilters: (filters: ErrorsState["globalErrorsFilters"]) =>
      set({ globalErrorsFilters: filters }),
    setGlobalErrorsSelectedFilters: (
      filters: ErrorsState["globalErrorsSelectedFilters"]
    ) => set({ globalErrorsSelectedFilters: filters }),
    resetGlobalErrorsSelectedFilters: () =>
      set({
        globalErrorsSelectedFilters: {
          endpoints: [],
          errorTypes: [],
          criticalities: [],
          handlingTypes: []
        }
      }),
    setErrorDetailsWorkspaceItemsOnly: (
      errorDetailsWorkspaceItemsOnly: boolean
    ) => set({ errorDetailsWorkspaceItemsOnly }),
    setGlobalErrorsViewMode: (mode: ViewMode) =>
      set({ globalErrorsViewMode: mode }),
    setGlobalErrorsLastDays: (days: number | null) =>
      set({ globalErrorsLastDays: days }),
    resetGlobalErrors: () => set({ ...globalErrorsWithoutFiltersInitialState })
  }
});
