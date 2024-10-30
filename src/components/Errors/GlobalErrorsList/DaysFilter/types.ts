import { ErrorFilter } from "../../../../store/errors/errorsSlice";
import { ButtonProps } from "../../../common/v3/NewButton/types";

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
  onChanged: (days?: number) => void;
}

export interface CounterInputProps {
  $isActive: boolean;
}
