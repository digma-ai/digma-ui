import {
  ErrorCriticality,
  ErrorHandlingType,
  GLOBAL_ERROR_SORTING_CRITERION
} from "../../../store/errors/errorsSlice";

export interface GetGlobalErrorsDataPayload {
  environment: string;
  codeObjectId?: string;
  searchCriteria?: string;
  sortBy?: GLOBAL_ERROR_SORTING_CRITERION;
  page?: number;
  pageSize?: number;
  services?: string[];
  endpoints?: string[];
  errorTypes?: string[];
  criticality?: ErrorCriticality[];
  handlingTypes?: ErrorHandlingType[];
}

export interface GlobalErrorData {
  id: string;
  errorType: string;
  fromDisplayName: string;
  fromFullyQualifiedName?: string;
  fromCodeObjectId: string;
  status: string;
  firstDetected: string;
  lastDetected: string;
  affectedEndpoints: {
    service: string;
    displayName: string;
    spanCodeObjectId: string;
  }[];
  score: {
    score: number;
    scoreParams: {
      Occurrences: number;
      Recent: number;
      Trend: number;
      Unhandled: number;
    };
  };
}

export interface SetGlobalErrorsDataPayload {
  totalCount: number;
  list: GlobalErrorData[];
}
