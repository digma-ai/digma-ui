import { useCallback, useEffect, useState } from "react";
import { actions } from "../components/InstallationWizard";
import {
  AsyncActionResultData,
  AsyncActionStatus
} from "../components/InstallationWizard/types";
import { dispatcher } from "../dispatcher";

export const useDigmaConnectionCheck = (): [AsyncActionStatus, () => void] => {
  const [status, setStatus] = useState<AsyncActionStatus>();

  const startCheck = useCallback(() => {
    window.sendMessageToDigma({
      action: actions.CHECK_CONNECTION
    });
    setStatus("pending");
  }, []);

  useEffect(() => {
    const handleConnectionCheckResultData = (data: unknown) => {
      const result = (data as AsyncActionResultData).result;
      setStatus(result);
    };

    dispatcher.addActionListener(
      actions.SET_CONNECTION_CHECK_RESULT,
      handleConnectionCheckResultData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CONNECTION_CHECK_RESULT,
        handleConnectionCheckResultData
      );
    };
  }, []);

  return [status, startCheck];
};
