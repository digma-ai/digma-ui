export type View =
  | "highlights"
  | "insights"
  | "assets"
  | "analytics"
  | "errors"
  | "errorsDetails"
  | "tests";

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
  errors?: ErrorData[];
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResult {
  errors?: ErrorData[];
  success: string;
}
