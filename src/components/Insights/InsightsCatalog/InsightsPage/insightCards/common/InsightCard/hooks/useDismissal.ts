import { useEffect, useState } from "react";
import { useAction } from "../../../../../../../../hooks/useAction";
import { actions } from "../../../../../../actions";
import type { DismissUndismissInsightPayload } from "../../../../../../types";
import type { DismissUndismissResponsePayload } from "../types";

const mapId = (response: DismissUndismissResponsePayload) => response.insightId;

export const useDismissal = (insightId: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: DismissUndismissResponsePayload;
  } | null>(null);

  const {
    isOperationInProgress: isDismissInProgress,
    execute: dismiss,
    data: dismissData
  } = useAction<
    DismissUndismissInsightPayload,
    DismissUndismissResponsePayload
  >(
    actions.DISMISS,
    actions.SET_DISMISS_RESPONSE,
    {
      id: insightId,
      insightId
    },
    mapId
  );

  const {
    isOperationInProgress: isUndismissInProgress,
    execute: undismiss,
    data: undismissData
  } = useAction<
    DismissUndismissInsightPayload,
    DismissUndismissResponsePayload
  >(
    actions.UNDISMISS,
    actions.SET_UNDISMISS_RESPONSE,
    {
      id: insightId,
      insightId
    },
    mapId
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
