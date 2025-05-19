import type { RefObject } from "react";
import type { GetAboutResponse } from "../../../../redux/services/types";
import type { BackendInfo } from "../../../common/App/types";

export interface GlobalErrorsFiltersProps {
  environmentId?: string;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  selectedServices?: string[];
  spanCodeObjectId?: string;
  popupBoundaryRef?: RefObject<HTMLElement>;
  width?: number;
}
