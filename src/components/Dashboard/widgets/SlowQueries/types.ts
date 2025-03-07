import type { Duration } from "../../../../redux/services/types";

export interface SlowQueryEntry {
  spanCodeObjectId: string;
  displayName: string;
  p50: Duration | null;
  p95: Duration | null;
}

export interface SlowQueriesProps {
  environment: string;
}
