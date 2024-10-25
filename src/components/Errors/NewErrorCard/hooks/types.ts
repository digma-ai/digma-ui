export interface DismissPayload {
  id: string;
  status: "success" | "failure";
  error?: {
    message: string;
  };
}

export interface UndismissPayload {
  id: string;
  status: "success" | "failure";
  error?: {
    message: string;
  };
}
