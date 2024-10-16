import { ErrorFilter } from "../../../../store/errors/errorsSlice";

export interface GetGlobalErrorsFiltersDataPayload {
  environment: string;
  filterName?: string;
  filterData?: {
    services?: string[];
    values: string[];
  };
}

export interface FilterData<T> {
  filterName: ErrorFilter;
  values: T[];
}

export interface EndpointFilterData {
  spanCodeObjectId: string;
  displayName: string;
}

export interface SetGlobalErrorsFiltersDataPayload {
  filters: FilterData<string | EndpointFilterData>[];
}
