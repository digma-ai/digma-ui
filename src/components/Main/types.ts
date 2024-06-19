export interface GetHighlightsTopIssuesDataPayload {
  query: {
    scopedCodeObjectId: string | null;
    environments: string[];
  };
}

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

// TODO: Add more events
export enum SCOPE_CHANGE_EVENTS {
  RECENT_ACTIVITY_ENVIRONMENT_SELECT = "recentActivityEnvironmentSelect",
  RECENT_ACTIVITY_SPAN_SELECT = "recentActivitySpanSelect"
}
