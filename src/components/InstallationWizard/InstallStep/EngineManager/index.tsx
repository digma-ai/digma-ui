import { useContext } from "react";
import { useTheme } from "styled-components";
import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { getThemeKind } from "../../../common/App/styles";
import { Loader } from "../../../common/Loader";
import { CrossCircleIcon } from "../../../common/icons/CrossCircleIcon";
import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { PlayCircleIcon } from "../../../common/icons/PlayCircleIcon";
import { StopCircleIcon } from "../../../common/icons/StopCircleIcon";
import { trackingEvents } from "../../tracking";
import { AsyncActionStatus } from "../../types";
import { Operation } from "../types";
import * as s from "./styles";
import { EngineManagerProps, OperationInfo } from "./types";

const getLoaderStatus = (
  isEngineInstalled: boolean,
  isEngineRunning: boolean,
  currentOperationStatus: AsyncActionStatus,
  failedOperation: Operation | undefined
) => {
  if (currentOperationStatus) {
    return currentOperationStatus;
  }

  if (failedOperation) {
    return "failure";
  }

  if (isEngineInstalled && isEngineRunning) {
    return "success";
  }
};

export const EngineManager = (props: EngineManagerProps) => {
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const isDigmaEngineRunning = Boolean(
    config.digmaStatus?.connection.status &&
      // config.digmaStatus.connection.type === "local" &&
      config.digmaStatus.runningDigmaInstances.length === 1 &&
      config.digmaStatus.runningDigmaInstances.includes("localEngine")
  );

  // const isNotEngineDigmaInstanceRunning = Boolean(
  //   config.digmaStatus &&
  //     config.digmaStatus.runningDigmaInstances.length > 0 &&
  //     !config.digmaStatus.runningDigmaInstances.includes("localEngine")
  // );

  // const areMultipleDigmaInstancesRunning = Boolean(
  //   config.digmaStatus?.connection.status &&
  //     config.digmaStatus.runningDigmaInstances.length > 1
  // );

  const operationsInfo: Record<Operation, OperationInfo> = {
    [Operation.INSTALL]: {
      button: { label: "Start", icon: PlayCircleIcon },
      titleSuffix: "Starting"
    },
    [Operation.UNINSTALL]: {
      button: { label: "Remove", icon: CrossCircleIcon },
      titleSuffix: "Removing"
    },
    [Operation.START]: {
      button: { label: "Start", icon: PlayCircleIcon },
      titleSuffix: "Starting"
    },
    [Operation.STOP]: {
      button: { label: "Stop", icon: StopCircleIcon },
      titleSuffix: "Stopping"
    }
  };

  const sendActionButtonTrackingEvent = (buttonName: string) => {
    sendTrackingEvent(trackingEvents.ENGINE_ACTION_BUTTON_CLICKED, {
      buttonName
    });
  };

  const handleRetryButtonClick = () => {
    sendActionButtonTrackingEvent("Retry");
    if (props.engine.failedOperation) {
      props.engine.startOperation(props.engine.failedOperation.operation);
    }
  };

  const handleInstallManuallyButtonClick = () => {
    sendActionButtonTrackingEvent("Install manually");
    props.onManualInstallSelect && props.onManualInstallSelect();
  };

  const renderOperationButton = (operation: Operation, disabled?: boolean) => {
    const handleOperationButtonClick = () => {
      const operationInfo = operationsInfo[operation];
      sendActionButtonTrackingEvent(operationInfo.button.label);
      props.engine.startOperation(operation);
    };

    const operationInfo = operationsInfo[operation];
    return (
      <s.ActionButton
        onClick={handleOperationButtonClick}
        key={operation}
        disabled={disabled}
      >
        <operationInfo.button.icon size={14} color={"currentColor"} />
        {operationInfo.button.label}
      </s.ActionButton>
    );
  };

  const handleStartButtonClick = () => {
    const operation = config.isDigmaEngineInstalled
      ? Operation.START
      : Operation.INSTALL;
    const operationInfo = operationsInfo[operation];
    sendActionButtonTrackingEvent(operationInfo.button.label);
    props.engine.startOperation(operation);
  };

  const renderContent = () => {
    const loaderStatus = getLoaderStatus(
      config.isDigmaEngineInstalled,
      isDigmaEngineRunning,
      props.engine.currentOperation?.status,
      props.engine.failedOperation?.operation
    );

    const icon = loaderStatus ? (
      <Loader status={loaderStatus} themeKind={themeKind} size={100} />
    ) : (
      <DigmaLogoIcon size={100} themeKind={themeKind} />
    );

    let title = "Digma Local Analysis Engine ";

    const lastOperation =
      props.engine.currentOperation?.operation ||
      props.engine.failedOperation?.operation;

    if (lastOperation) {
      title += operationsInfo[lastOperation].titleSuffix;
    } else {
      title += config.isDigmaEngineInstalled
        ? isDigmaEngineRunning
          ? "Running"
          : "Stopped"
        : "Not installed";
    }

    if (props.engine.failedOperation) {
      title += " Failed";
    }

    const buttons = [];

    if (props.engine.failedOperation) {
      buttons.push(
        <s.ActionButton onClick={handleRetryButtonClick} key={"retry"}>
          Retry
        </s.ActionButton>
      );

      if (props.onManualInstallSelect) {
        buttons.push(
          <s.ActionButton
            onClick={handleInstallManuallyButtonClick}
            key={"install-manually"}
          >
            Install manually
          </s.ActionButton>
        );
      }
    } else {
      if (config.isDigmaEngineInstalled && !props.isAutoInstallationFlow) {
        if (isDigmaEngineRunning) {
          buttons.push(renderOperationButton(Operation.STOP));
        }

        buttons.push(renderOperationButton(Operation.UNINSTALL));
      }
    }

    const isStartButtonDisabled =
      props.engine.currentOperation?.status === "pending" ||
      (config.digmaStatus &&
        config.digmaStatus.runningDigmaInstances.length > 0);

    return (
      <>
        <s.ContentContainer overlay={props.overlay}>
          {icon}
          <s.TextContainer>
            <s.Title>{title}</s.Title>
            {!props.overlay && (
              <>
                {!props.engine.failedOperation && (
                  <span>
                    {props.engine.currentOperation?.status === "pending"
                      ? "This may take a few minutes..."
                      : `Click "${
                          isDigmaEngineRunning ? "Configure" : "Start"
                        }" to continue setup`}
                  </span>
                )}
                {props.engine.failedOperation ? (
                  <s.ErrorMessage>
                    {props.engine.failedOperation.error}
                  </s.ErrorMessage>
                ) : (
                  <span>
                    You can always start / stop / remove the Digma Engine from
                    the Digma panel
                  </span>
                )}
              </>
            )}
          </s.TextContainer>
          {buttons.length > 0 && (
            <s.ButtonsContainer>
              {!props.engine.currentOperation && buttons}
            </s.ButtonsContainer>
          )}
        </s.ContentContainer>
        {!props.isAutoInstallationFlow && (
          <s.MainButton
            disabled={isStartButtonDisabled}
            onClick={handleStartButtonClick}
            icon={{ component: PlayCircleIcon, size: 16 }}
          >
            Start
          </s.MainButton>
        )}
      </>
    );
  };

  return <s.Container>{renderContent()}</s.Container>;
};
