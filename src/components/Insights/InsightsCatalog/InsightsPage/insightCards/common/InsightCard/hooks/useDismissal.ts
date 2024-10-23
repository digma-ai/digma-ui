import { useCallback, useEffect, useState } from "react";
import { dispatcher } from "../../../../../../../../dispatcher";
import { actions } from "../../../../../../actions";
import { DismissUndismissInsightPayload } from "../../../../../../types";
import { DismissUndismissResponsePayload } from "../types";

export const useDismissal = (insightId: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: DismissUndismissResponsePayload;
  } | null>(null);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false);

  useEffect(() => {
    const handleDismissResponse = (payload: unknown) => {
      handleResponse(actions.SET_DISMISS_RESPONSE, payload);
    };

    const handleUndismissResponse = (payload: unknown) => {
      handleResponse(actions.SET_UNDISMISS_RESPONSE, payload);
    };

    const handleResponse = (action: string, data: unknown) => {
      const payload = data as DismissUndismissResponsePayload;
      if (insightId === payload.insightId) {
        setData({ action, payload });
        setIsOperationInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_DISMISS_RESPONSE,
      handleDismissResponse
    );
    dispatcher.addActionListener(
      actions.SET_UNDISMISS_RESPONSE,
      handleUndismissResponse
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DISMISS_RESPONSE,
        handleDismissResponse
      );
      dispatcher.removeActionListener(
        actions.SET_UNDISMISS_RESPONSE,
        handleUndismissResponse
      );
    };
  }, [insightId]);

  const sendAction = useCallback(
    (action: string) => {
      window.sendMessageToDigma<DismissUndismissInsightPayload>({
        action,
        payload: {
          insightId
        }
      });
      setIsOperationInProgress(true);
    },
    [insightId]
  );

  const dismiss = useCallback(() => {
    sendAction(actions.DISMISS);
  }, [sendAction]);

  const undismiss = useCallback(() => {
    sendAction(actions.UNDISMISS);
  }, [sendAction]);

  return {
    dismiss,
    show: undismiss,
    data,
    isDismissalChangeInProgress: isOperationInProgress
  };
};
