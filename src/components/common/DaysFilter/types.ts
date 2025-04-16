import type { ErrorFilter } from "../../../store/errors/errorsSlice";
import type { ButtonProps } from "../v3/NewButton/types";

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

export interface DaysButtonProps extends ButtonProps {
  $isActive: boolean;
}

export interface DaysFilterProps {
  onChange: (days?: number) => void;
  defaultValue: number;
  trackingPrefix?: string;
}

export interface CounterInputProps {
  $isActive: boolean;
}
