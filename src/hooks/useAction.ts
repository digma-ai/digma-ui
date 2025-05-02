import { useCallback, useEffect, useState } from "react";
import { dispatcher } from "../dispatcher";

interface Identifier {
  id: string;
}

/** @deprecated */
export const useAction = <
  TPayload extends Identifier,
  TResponse extends Identifier
>(
  requestAction: string,
  responseAction: string,
  payload: TPayload,
  mapId?: (response: TResponse) => string
) => {
  const [data, setData] = useState<{
    action: string;
    payload: TResponse;
  } | null>(null);
  const [isOperationInProgress, setIsOperationInProgress] = useState(false);

  useEffect(() => {
    const handleActionResponse = (data: unknown) => {
      const result = data as TResponse;
      const responseId = mapId ? mapId(result) : result.id;
      if (payload.id === responseId) {
        setData({ action: responseAction, payload: result });
        setIsOperationInProgress(false);
      }
    };

    dispatcher.addActionListener(responseAction, handleActionResponse);

    return () => {
      dispatcher.removeActionListener(responseAction, handleActionResponse);
    };
  }, [mapId, payload, payload.id, responseAction]);

  const sendAction = useCallback(
    (action: string) => {
      window.sendMessageToDigma<TPayload>({
        action,
        payload: payload
      });
      setIsOperationInProgress(true);
    },
    [payload]
  );

  const execute = useCallback(() => {
    sendAction(requestAction);
  }, [requestAction, sendAction]);

  return {
    execute,
    data,
    isOperationInProgress
  };
};
