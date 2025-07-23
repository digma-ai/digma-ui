import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Dispatch, UnknownAction } from "redux";
import posthog from "../posthog";
import { isNumber } from "../typeGuards/isNumber";
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

const ignoredHTTPStatuses = [502, 503];

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

      if (isNumber(status) && ignoredHTTPStatuses.includes(status)) {
        return next(action);
      }

      if (
        rejectedAction.payload.error?.includes(
          "Error: TypeError: Failed to fetch"
        )
      ) {
        // Ignore network errors
        return next(action);
      }

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
