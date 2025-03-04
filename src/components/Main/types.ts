export interface LoginPayload {
  email: string;
  password: string;
}

export interface ErrorData {
  errorCode: string;
  description: string;
}

export interface LoginResult {
  error: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResult {
  errors?: ErrorData[];
  success: string;
}

export interface ViewData {
  id: string;
  path?: string;
}

export interface ReactRouterLocationState {
  navigatedWithCustomHistory?: boolean;
}

export interface HistoryState extends ReactRouterLocationState {
  environmentId?: string;
  spanCodeObjectId?: string;
  spanDisplayName?: string;
}
