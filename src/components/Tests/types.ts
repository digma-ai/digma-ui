import { Duration } from "../../globals";
import { InsightType } from "../../types";

export interface SetSpanLatestDataPayload {
  data: {
    spanContexts: {
      spanInfo: {
        displayName: string;
        spanCodeObjectId: string;
        methodCodeObjectId?: string;
      };
      tests: {
        name: string;
        spanInfo: {
          displayName: string;
          spanCodeObjectId: string;
          methodCodeObjectId?: string;
        };
        result: "success" | "fail" | "error";
        runAt: string;
        duration: Duration;
        environment: string;
        errorOrFailMessage?: string;
        traceId: string;
        commitId?: string;
        ticketId?: string;
        insights: InsightType[];
        contextsSpanCodeObjectIds: string[];
      }[];
    }[];
  };
  error?: {
    message: string;
  };
}
