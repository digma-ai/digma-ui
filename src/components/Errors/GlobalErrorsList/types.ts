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
  criticalities?: ErrorCriticality[];
  handlingTypes?: ErrorHandlingType[];
  dismissed?: boolean;
  lastDays?: number;
}

export interface GlobalErrorData {
  id: string;
  errorType: string;
  fromDisplayName: string;
  fromFullyQualifiedName?: string;
  fromCodeObjectId: string;
  fromSpanCodeObjectId?: string | null;
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
  pinnedAt?: string;
  isDismissed?: boolean;
  unhandled?: boolean;
}

export interface SetGlobalErrorsDataPayload {
  totalCount: number;
  dismissedCount?: number;
  list: GlobalErrorData[];
}

export interface SetPinUnpinErrorResultPayload {
  id: string;
  status: "success" | "failure";
  error?: {
    message: string;
  };
}

export interface DismissBtnIconProps {
  $isDismissedMode: boolean;
}
