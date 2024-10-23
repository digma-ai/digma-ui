import { useCallback, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { actions } from "../actions";
import { PinUnpinErrorPayload } from "../NewErrorCard/types";
import { SetPinUnpinErrorResultPayload } from "./types";

export const usePinning = (errorId: string) => {
  const { environment } = useConfigSelector();
  const [data, setData] = useState<{
    action: string;
    payload: SetPinUnpinErrorResultPayload;
  } | null>(null);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false);

  useEffect(() => {
    const handlePinErrorResult = (payload: unknown) => {
      handleResult(actions.PIN_ERROR, payload);
    };

    const handleUnpinErrorResult = (payload: unknown) => {
      handleResult(actions.UNPIN_ERROR, payload);
    };

    const handleResult = (action: string, data: unknown) => {
      const payload = data as SetPinUnpinErrorResultPayload;
      if (errorId === payload.id) {
        setData({ action, payload });
        setIsOperationInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_PIN_ERROR_RESULT,
      handlePinErrorResult
    );
    dispatcher.addActionListener(
      actions.SET_UNPIN_ERROR_RESULT,
      handleUnpinErrorResult
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_PIN_ERROR_RESULT,
        handlePinErrorResult
      );
      dispatcher.removeActionListener(
        actions.SET_UNPIN_ERROR_RESULT,
        handleUnpinErrorResult
      );
    };
  }, [errorId]);

  const sendAction = useCallback(
    (action: string) => {
      if (!environment) {
        return;
      }

      window.sendMessageToDigma<PinUnpinErrorPayload>({
        action,
        payload: {
          id: errorId,
          environment: environment?.id
        }
      });
      setIsOperationInProgress(true);
    },
    [errorId, environment]
  );

  const pin = useCallback(() => {
    sendAction(actions.PIN_ERROR);
  }, [sendAction]);

  const unpin = useCallback(() => {
    sendAction(actions.UNPIN_ERROR);
  }, [sendAction]);

  return {
    pin,
    unpin,
    data,
    isInProgress: isOperationInProgress
  };
};
