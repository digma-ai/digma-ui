import { useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { actions } from "../..";
import { dispatcher } from "../../../../dispatcher";
import { actions as globalActions } from "../../../common/App";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { getThemeKind } from "../../../common/App/styles";
import { Button } from "../../../common/Button";
import { Loader } from "../../../common/Loader";
import { CrossCircleIcon } from "../../../common/icons/CrossCircleIcon";
import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { PlayCircleIcon } from "../../../common/icons/PlayCircleIcon";
import { StopCircleIcon } from "../../../common/icons/StopCircleIcon";
import { trackingEvents } from "../../tracking";
import { AsyncActionResultData, AsyncActionStatus } from "../../types";
import * as s from "./styles";
import {
  CurrentOperation,
  EngineManagerProps,
  FailedOperation,
  Operation,
  OperationInfo
} from "./types";

const getLoaderStatus = (
  isDigmaRunning: boolean,
  currentOperationStatus: AsyncActionStatus,
  failedOperation: Operation | undefined
) => {
  if (currentOperationStatus) {
    return currentOperationStatus;
  }

  if (failedOperation) {
    return "failure";
  }

  if (isDigmaRunning) {
    return "success";
  }
};

export const EngineManager = (props: EngineManagerProps) => {
  const config = useContext(ConfigContext);
  const [isDigmaEngineInstalled, setIsDigmaEngineInstalled] = useState(
    config.isDigmaEngineInstalled
  );
  const [isDigmaEngineRunning, setIsDigmaEngineRunning] = useState(
    config.isDigmaEngineRunning
  );
  const [currentOperation, setCurrentOperation] = useState<CurrentOperation>();
  const [failedOperation, setFailedOperation] = useState<FailedOperation>();
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const operationsInfo: Record<Operation, OperationInfo> = {
    [Operation.INSTALL]: {
      action: actions.INSTALL_DIGMA_ENGINE,
      button: { label: "Start", icon: PlayCircleIcon },
      titleSuffix: "Starting"
    },
    [Operation.UNINSTALL]: {
      action: actions.UNINSTALL_DIGMA_ENGINE,
      button: { label: "Remove", icon: CrossCircleIcon },
      titleSuffix: "Removing"
    },
    [Operation.START]: {
      action: actions.START_DIGMA_ENGINE,
      button: { label: "Start", icon: PlayCircleIcon },
      titleSuffix: "Starting"
    },
    [Operation.STOP]: {
      action: actions.STOP_DIGMA_ENGINE,
      button: { label: "Stop", icon: StopCircleIcon },
      titleSuffix: "Stopping"
    }
  };

  useEffect(() => {
    const handleInstallDigmaResultData = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      setCurrentOperation({
        operation: Operation.INSTALL,
        status: payload.result,
        error: payload.error
      });
    };

    const handleUninstallDigmaResultData = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      setCurrentOperation({
        operation: Operation.UNINSTALL,
        status: payload.result,
        error: payload.error
      });
    };

    const handleStartDigmaResultData = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      setCurrentOperation({
        operation: Operation.START,
        status: payload.result,
        error: payload.error
      });
    };

    const handleStopDigmaResultData = (data: unknown) => {
      const payload = data as AsyncActionResultData;
      setCurrentOperation({
        operation: Operation.STOP,
        status: payload.result,
        error: payload.error
      });
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
    if (props.autoInstall) {
      window.sendMessageToDigma({
        action: actions.INSTALL_DIGMA_ENGINE
      });
      setCurrentOperation({ operation: Operation.INSTALL, status: "pending" });
    }
  }, [props.autoInstall]);

  useEffect(() => {
    if (currentOperation) {
      if (currentOperation.status === "success") {
        switch (currentOperation.operation) {
          case Operation.INSTALL:
            setIsDigmaEngineInstalled(true);
            setIsDigmaEngineRunning(true);
            break;
          case Operation.UNINSTALL:
            setIsDigmaEngineInstalled(false);
            props.onManualInstallSelect();
            break;
          case Operation.START:
            setIsDigmaEngineRunning(true);
            break;
          case Operation.STOP:
            setIsDigmaEngineRunning(false);
            break;
        }
      }

      if (currentOperation.status === "failure") {
        switch (currentOperation.operation) {
          case Operation.INSTALL:
            if (props.autoInstall) {
              props.onAutoInstallFinish();
            }
            break;
          case Operation.UNINSTALL:
            if (props.autoInstall) {
              props.onManualInstallSelect();
            }
            break;
          case Operation.START:
          case Operation.STOP:
            break;
        }
      }

      switch (currentOperation.status) {
        case "success":
          setCurrentOperation(undefined);
          break;
        case "failure":
          setFailedOperation({
            operation: currentOperation.operation,
            error: currentOperation.error
          });
          setCurrentOperation(undefined);
          break;
        case "pending":
          setFailedOperation(undefined);
          break;
      }
    }
  }, [currentOperation, props.onManualInstallSelect]);

  const sendActionButtonTrackingEvent = (buttonName: string) => {
    window.sendMessageToDigma({
      action: globalActions.SEND_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.ENGINE_ACTION_BUTTON_CLICKED,
        buttonName
      }
    });
  };

  const handleRetryButtonClick = () => {
    if (failedOperation) {
      window.sendMessageToDigma({
        action: operationsInfo[failedOperation.operation].action
      });
      setCurrentOperation({
        operation: failedOperation.operation,
        status: "pending"
      });
    }
  };

  const handleInstallManuallyButtonClick = () => {
    props.onManualInstallSelect();
  };

  const renderOperationButton = (operation: Operation) => {
    const handleOperationButtonClick = () => {
      const operationInfo = operationsInfo[operation];
      window.sendMessageToDigma({
        action: operationInfo.action
      });
      sendActionButtonTrackingEvent(operationInfo.button.label);
      setCurrentOperation({ operation, status: "pending" });
    };

    const operationInfo = operationsInfo[operation];
    return (
      <Button
        onClick={handleOperationButtonClick}
        buttonType={"tertiary"}
        key={operationInfo.action}
        icon={{ component: operationInfo.button.icon }}
      >
        {operationInfo.button.label}
      </Button>
    );
  };

  const renderContent = () => {
    const loaderStatus = getLoaderStatus(
      isDigmaEngineRunning,
      currentOperation?.status,
      failedOperation?.operation
    );

    const icon = loaderStatus ? (
      <Loader status={loaderStatus} themeKind={themeKind} size={100} />
    ) : (
      <DigmaLogoIcon size={100} themeKind={themeKind} />
    );

    let title = "Digma Local Analysis Engine ";

    const lastOperation =
      currentOperation?.operation || failedOperation?.operation;

    if (lastOperation) {
      title += operationsInfo[lastOperation].titleSuffix;
    } else {
      title += isDigmaEngineInstalled
        ? isDigmaEngineRunning
          ? "Running"
          : "Stopped"
        : "Not installed";
    }

    if (failedOperation) {
      title += " Failed";
    }

    const buttons = [];

    if (failedOperation) {
      buttons.push(
        <Button
          onClick={handleRetryButtonClick}
          buttonType={"tertiary"}
          key={"retry"}
        >
          Retry
        </Button>
      );

      if (props.autoInstall) {
        buttons.push(
          <Button
            onClick={handleInstallManuallyButtonClick}
            buttonType={"tertiary"}
            key={"install-manually"}
          >
            Install manually
          </Button>
        );
      }
    } else {
      if (isDigmaEngineInstalled) {
        if (isDigmaEngineRunning) {
          if (!props.autoInstall) {
            buttons.push(renderOperationButton(Operation.STOP));
          }
        } else {
          buttons.push(renderOperationButton(Operation.START));
        }

        if (!props.autoInstall) {
          buttons.push(renderOperationButton(Operation.UNINSTALL));
        }
      } else {
        buttons.push(renderOperationButton(Operation.INSTALL));
      }
    }

    const buttonsWithDividers = buttons.flatMap((button, i, arr) =>
      i !== arr.length - 1
        ? [button, <s.ButtonDivider key={`divider-${i}`} />]
        : button
    );

    return (
      <>
        {icon}
        <s.Title>{title}</s.Title>
        <s.ContentContainer>
          {!failedOperation && (
            <span>
              {currentOperation?.status === "pending"
                ? "This may take a few minutes..."
                : 'Click "Next" to continue setup'}
            </span>
          )}
          {failedOperation ? (
            <s.ErrorMessage>{failedOperation.error}</s.ErrorMessage>
          ) : (
            <span>
              You can always start / stop / remove the Digma Engine from the
              Digma panel
            </span>
          )}
        </s.ContentContainer>
        <s.ButtonsContainer>
          {!currentOperation && buttonsWithDividers}
        </s.ButtonsContainer>
      </>
    );
  };

  return <s.Container>{renderContent()}</s.Container>;
};
