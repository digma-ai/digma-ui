import { Duration } from "../../../globals";

export interface SlowQueryEntry {
  spanCodeObjectId: string;
  displayName: string;
  p50: Duration | null;
  p95: Duration | null;
  type: "SlowQuery";
}

export interface SlowQueriesData {
  data: {
    entries: SlowQueryEntry[];
    totalCount: number;
  };
  type: string;
}

export interface SlowQueriesProps {
  data?: SlowQueriesData;
  environment: string;
}
