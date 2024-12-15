import { useCallback, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import type { AsyncActionResultData } from "../types";
import type { CurrentOperation, EngineState, FailedOperation } from "./types";
import { Operation } from "./types";

const operationActions = {
  [Operation.INSTALL]: actions.INSTALL_DIGMA_ENGINE,
  [Operation.UNINSTALL]: actions.UNINSTALL_DIGMA_ENGINE,
  [Operation.START]: actions.START_DIGMA_ENGINE,
  [Operation.STOP]: actions.STOP_DIGMA_ENGINE
};

export const useEngine = (
  onOperationStart: (operation: Operation) => void,
  onOperationFinish: (
    operation: Operation,
    result: AsyncActionResultData
  ) => void
): EngineState => {
  const [currentOperation, setCurrentOperation] = useState<CurrentOperation>();
  const [failedOperation, setFailedOperation] = useState<FailedOperation>();

  const startOperation = useCallback((operation: Operation) => {
    window.sendMessageToDigma({
      action: operationActions[operation]
    });

    sendTrackingEvent(trackingEvents.ENGINE_ACTION_MESSAGE_SENT, {
      action: operationActions[operation]
    });

    setCurrentOperation({ operation, status: "pending" });
  }, []);

  useEffect(() => {
    const handleOperationResultData = (
      data: AsyncActionResultData,
      operation: Operation
    ) => {
      const operationData = {
        operation: operation,
        status: data.result,
        error: data.error
      };

      sendTrackingEvent(
        trackingEvents.ENGINE_ACTION_RESULT_MESSAGE_RECEIVED,
        operationData
      );

      setCurrentOperation(operationData);
    };
    const handleInstallDigmaResultData = (data: unknown) => {
      handleOperationResultData(
        data as AsyncActionResultData,
        Operation.INSTALL
      );
    };

    const handleUninstallDigmaResultData = (data: unknown) => {
      handleOperationResultData(
        data as AsyncActionResultData,
        Operation.UNINSTALL
      );
    };

    const handleStartDigmaResultData = (data: unknown) => {
      handleOperationResultData(data as AsyncActionResultData, Operation.START);
    };

    const handleStopDigmaResultData = (data: unknown) => {
      handleOperationResultData(data as AsyncActionResultData, Operation.STOP);
    };

    dispatcher.addActionListener(
      actions.SET_INSTALL_DIGMA_ENGINE_RESULT,
      handleInstallDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_UNINSTALL_DIGMA_ENGINE_RESULT,
      handleUninstallDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_START_DIGMA_ENGINE_RESULT,
      handleStartDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_STOP_DIGMA_ENGINE_RESULT,
      handleStopDigmaResultData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_INSTALL_DIGMA_ENGINE_RESULT,
        handleInstallDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_UNINSTALL_DIGMA_ENGINE_RESULT,
        handleUninstallDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_START_DIGMA_ENGINE_RESULT,
        handleStartDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_STOP_DIGMA_ENGINE_RESULT,
        handleStopDigmaResultData
      );
    };
  }, []);

  useEffect(() => {
    if (currentOperation) {
      switch (currentOperation.status) {
        case "success":
          setCurrentOperation(undefined);
          onOperationFinish(currentOperation.operation, {
            result: "success"
          });
          break;
        case "failure":
          setFailedOperation({
            operation: currentOperation.operation,
            error: currentOperation.error
          });
          setCurrentOperation(undefined);
          onOperationFinish(currentOperation.operation, {
            result: "failure",
            error: currentOperation.error
          });
          break;
        case "pending":
          setFailedOperation(undefined);
          onOperationStart(currentOperation.operation);
          break;
      }
    }
  }, [currentOperation, onOperationStart, onOperationFinish]);

  return {
    currentOperation,
    failedOperation,
    startOperation
  };
};
