import { useEffect, useState } from "react";
import { useAction } from "../../../../hooks/useAction";
import { actions } from "../../actions";
import { DismissPayload, UndismissPayload } from "./types";

export const useDismissal = (id: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: DismissPayload | UndismissPayload;
  } | null>(null);

  const {
    isOperationInProgress: isDismissInProgress,
    execute: dismiss,
    data: dismissData
  } = useAction<{ id: string }, DismissPayload>(
    actions.DISMISS_ERROR,
    actions.SET_DISMISS_ERROR_RESULT,
    {
      id
    }
  );

  const {
    isOperationInProgress: isUndismissInProgress,
    execute: undismiss,
    data: undismissData
  } = useAction<{ id: string }, UndismissPayload>(
    actions.UNDISMISS_ERROR,
    actions.SET_UNDISMISS_ERROR_RESULT,
    {
      id
    }
  );

  useEffect(() => {
    setData(undismissData);
  }, [undismissData]);

  useEffect(() => {
    setData(dismissData);
  }, [dismissData]);

  return {
    dismiss,
    show: undismiss,
    data,
    isDismissalChangeInProgress: isDismissInProgress || isUndismissInProgress
  };
};