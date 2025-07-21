import type { ErrorStatusInfo } from "../../../../redux/services/types";
import type { StatusDetails } from "../../../../redux/slices/incidentsSlice";

export const isErrorStatusDetails = (
  statusDetails: StatusDetails
): statusDetails is StatusDetails<ErrorStatusInfo> =>
  statusDetails.status === "error";
