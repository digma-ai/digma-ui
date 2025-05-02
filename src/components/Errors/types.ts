import type { Error } from "../../redux/services/types";

export interface GetErrorsDataPayload {
  spanCodeObjectId: string;
  methodId?: string;
}

export interface SetErrorsDataPayload {
  errors: Error[];
}
