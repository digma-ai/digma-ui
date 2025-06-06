import { useCallback, useState } from "react";
import {
  usePinErrorMutation,
  useUnpinErrorMutation
} from "../../../redux/services/digma";
import type { SetPinUnpinErrorResultPayload } from "./types";

export const actions = {
  PIN_ERROR: "PIN_ERROR",
  UNPIN_ERROR: "UNPIN_ERROR"
};

export const usePinning = (errorId: string) => {
  const [data, setData] = useState<{
    action: string;
    payload: SetPinUnpinErrorResultPayload;
  } | null>(null);
  const [pinError, pinErrorResult] = usePinErrorMutation();
  const [unpinError, unpinErrorResult] = useUnpinErrorMutation();

  const pin = useCallback(() => {
    pinError({
      id: errorId
    })
      .unwrap()
      .then(() => {
        setData({
          action: actions.PIN_ERROR,
          payload: {
            id: errorId,
            status: "success"
          }
        });
      })
      .catch(() => {
        setData({
          action: actions.PIN_ERROR,
          payload: {
            id: errorId,
            status: "failure"
          }
        });
      });
  }, [errorId, pinError]);

  const unpin = useCallback(() => {
    unpinError({
      id: errorId
    })
      .unwrap()
      .then(() => {
        setData({
          action: actions.UNPIN_ERROR,
          payload: {
            id: errorId,
            status: "success"
          }
        });
      })
      .catch(() => {
        setData({
          action: actions.UNPIN_ERROR,
          payload: {
            id: errorId,
            status: "failure"
          }
        });
      });
  }, [errorId, unpinError]);

  return {
    pin,
    unpin,
    data,
    isInProgress: pinErrorResult.isLoading || unpinErrorResult.isLoading
  };
};
