import type { GetSpanInfoResponse } from "../../../redux/services/types";

export interface SpanInfoProps {
  onCollapse: () => void;
  data: GetSpanInfoResponse;
  spanCodeObjectId?: string;
}
