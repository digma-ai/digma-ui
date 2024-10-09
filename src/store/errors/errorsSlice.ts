import { createSlice } from "zustand-slices";
import {
  GlobalErrorData,
  SetGlobalErrorsDataPayload
} from "../../components/Errors/GlobalErrorsList/types";

export const PAGE_SIZE = 10;

export enum GLOBAL_ERROR_SORTING_CRITERION {
  CRITICALITY = "Criticality",
  LATEST = "Latest"
}

export interface ErrorsState {
  globalErrorsList: GlobalErrorData[] | null;
  globalErrorsTotalCount: number;
  areGlobalErrorsLoading: boolean;
  globalErrorsSearch: string;
  globalErrorsPage: number;
  globalErrorsPageSize: number;
  globalErrorsSorting: GLOBAL_ERROR_SORTING_CRITERION;
}

export const initialState: ErrorsState = {
  globalErrorsList: null,
  globalErrorsTotalCount: 0,
  areGlobalErrorsLoading: false,
  globalErrorsSearch: "",
  globalErrorsPage: 0,
  globalErrorsPageSize: PAGE_SIZE,
  globalErrorsSorting: GLOBAL_ERROR_SORTING_CRITERION.CRITICALITY
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
    resetGlobalErrors: () => set(initialState)
  }
});
