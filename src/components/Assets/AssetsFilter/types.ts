import type { RefObject } from "react";
import type { GetAboutResponse } from "../../../redux/services/types";
import type { BackendInfo } from "../../common/App/types";

export interface AssetsFilterProps {
  popupBoundaryRef?: RefObject<HTMLElement>;
  spanCodeObjectId?: string;
  backendInfo?: BackendInfo | GetAboutResponse | null;
  environmentId?: string;
  selectedServices?: string[];
  width?: number;
}
