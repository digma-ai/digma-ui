import { isRejectedWithValue } from "@reduxjs/toolkit";
import posthog from "posthog-js";
import type { Dispatch, UnknownAction } from "redux";
import { sendErrorTrackingEvent } from "../utils/actions/sendErrorTrackingEvent";
import { digmaApi } from "./services/digma";

interface RejectedQueryAction {
  meta: {
    arg: {
      endpointName: string;
    };
    baseQueryMeta?: {
      response?: {
        status?: number;
      };
    };
  };
  payload: {
    error?: string;
  };
}

export const posthogMiddleware =
  () => (next: Dispatch<UnknownAction>) => (action: UnknownAction) => {
    if (digmaApi.endpoints.getAbout.matchFulfilled(action)) {
      const data = action.payload;
      if (posthog?.__loaded) {
        posthog.register({
          "server.version": data.applicationVersion,
          "server.deploymentType": data.deploymentType,
          site: data.site
        });
      }
    }

    if (isRejectedWithValue(action) && action.meta) {
      const rejectedAction = action as RejectedQueryAction;

      const queryName = rejectedAction.meta.arg.endpointName;
      const status = rejectedAction.meta.baseQueryMeta?.response?.status;
      const errorMessage = rejectedAction.payload.error ?? "Unknown error";

      sendErrorTrackingEvent(
        new Error(
          `API request failed.${
            status ? ` Status code: ${status}.` : ""
          } Error: ${errorMessage}`
        ),
        {
          severity: "high",
          message: errorMessage,
          queryName: queryName
        }
      );
    }

    return next(action);
  };
