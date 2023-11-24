import { GetEnvironmentResponse } from "../../api/web/services/environments";

export interface EnvironmentInfoData {
  data: GetEnvironmentResponse | null;
  error: {
    message: string;
  } | null;
}
