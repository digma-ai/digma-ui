export interface DismissResultPayload {
  id: string;
  status: "success" | "failure";
  error?: {
    message: string;
  };
}

export interface UndismissResultPayload {
  id: string;
  status: "success" | "failure";
  error?: {
    message: string;
  };
}
