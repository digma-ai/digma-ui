import { QueryStatus } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import {
  useDismissInsightMutation,
  useUndismissInsightMutation
} from "../../../../../../../../../redux/services/digma";
import { actions } from "../../../../../../../actions";
import type { DismissUndismissResponsePayload } from "../types";

export const useDismissal = (insightId: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: DismissUndismissResponsePayload;
  } | null>(null);

  const [dismiss, dismissResult] = useDismissInsightMutation();
  const [undismiss, undismissResult] = useUndismissInsightMutation();

  useEffect(() => {
    if (
      [QueryStatus.fulfilled, QueryStatus.rejected].includes(
        dismissResult.status
      )
    ) {
      setData({
        action: actions.DISMISS,
        payload: {
          insightId,
          id: insightId,
          status: dismissResult.isSuccess ? "success" : "failure"
        }
      });
    }
  }, [dismissResult, insightId]);

  useEffect(() => {
    if (
      [QueryStatus.fulfilled, QueryStatus.rejected].includes(
        undismissResult.status
      )
    ) {
      setData({
        action: actions.UNDISMISS,
        payload: {
          insightId,
          id: insightId,
          status: undismissResult.isSuccess ? "success" : "failure"
        }
      });
    }
  }, [undismissResult, insightId]);

  return {
    dismiss: () => {
      void dismiss({ uid: insightId });
    },
    show: () => {
      void undismiss({ uid: insightId });
    },
    data,
    isDismissalChangeInProgress:
      dismissResult.isLoading || undismissResult.isLoading
  };
};
