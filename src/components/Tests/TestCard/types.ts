import type { Test, TestsData } from "../types";

export interface TestCardProps {
  test: Test;
  spanContexts: TestsData["spanContexts"];
  onTicketInfoOpen: (test: Test) => void;
}

export interface RunTestPayload {
  methodCodeObjectId: string;
}

export interface GoToTracePayload {
  traceId: string;
  displayName?: string;
  spanCodeObjectId?: string;
}

export interface GoToSpanOfTestPayload {
  environment: string;
  spanCodeObjectId: string;
  methodCodeObjectId: string | null;
}
