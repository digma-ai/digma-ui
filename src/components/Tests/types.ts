import { Duration } from "../../globals";
import { SpanInfo } from "../../types";

export interface Test {
  name: string;
  spanInfo: SpanInfo;
  result: "success" | "fail" | "error";
  runAt: string;
  duration: Duration;
  environment: string;
  environmentId: string;
  errorOrFailMessage: string | null;
  traceId: string;
  commitId: string | null;
  ticketId: string | null;
  contextsSpanCodeObjectIds: string[];
}

export interface TestsData {
  paging: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  };
  spanContexts: {
    displayName: string;
    spanCodeObjectId: string;
    methodCodeObjectId: string | null;
  }[];
  entries: Test[];
}

export interface SetSpanLatestDataPayload {
  data: TestsData | null;
  error: {
    message: string;
  } | null;
}

export interface TestsProps {
  data?: SetSpanLatestDataPayload;
}
