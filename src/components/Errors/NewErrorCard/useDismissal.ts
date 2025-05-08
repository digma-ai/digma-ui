import { useCallback, useState } from "react";
import {
  useDismissErrorMutation,
  useUndismissErrorMutation
} from "../../../redux/services/digma";
import type { DismissUndismissResultPayload } from "./types";

export const actions = {
  DISMISS_ERROR: "DISMISS_ERROR",
  UNDISMISS_ERROR: "UNDISMISS_ERROR"
};

export const useDismissal = (errorId: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: DismissUndismissResultPayload;
  } | null>(null);
  const [dismissError, dismissErrorResult] = useDismissErrorMutation();
  const [undismissError, undismissErrorResult] = useUndismissErrorMutation();

  const dismiss = useCallback(() => {
    dismissError({
      id: errorId
    })
      .unwrap()
      .then(() => {
        setData({
          action: actions.DISMISS_ERROR,
          payload: {
            id: errorId,
            status: "success"
          }
        });
      })
      .catch(() => {
        setData({
          action: actions.DISMISS_ERROR,
          payload: {
            id: errorId,
            status: "failure"
          }
        });
      });
  }, [errorId, dismissError]);

  const show = useCallback(() => {
    undismissError({
      id: errorId
    })
      .unwrap()
      .then(() => {
        setData({
          action: actions.UNDISMISS_ERROR,
          payload: {
            id: errorId,
            status: "success"
          }
        });
      })
      .catch(() => {
        setData({
          action: actions.UNDISMISS_ERROR,
          payload: {
            id: errorId,
            status: "failure"
          }
        });
      });
  }, [errorId, undismissError]);

  return {
    dismiss,
    show,
    data,
    isInProgress: dismissErrorResult.isLoading || undismissErrorResult.isLoading
  };
};
