import type { GetErrorResponse } from "../../../../redux/services/types";

export interface ErrorDetailsCardHeaderProps {
  onGoBack: () => void;
  data: GetErrorResponse;
}
