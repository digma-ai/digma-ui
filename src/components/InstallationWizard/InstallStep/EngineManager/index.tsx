import { useContext } from "react";
import { useTheme } from "styled-components";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { isDigmaEngineRunning } from "../../../../utils/isDigmaEngineRunning";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { getThemeKind } from "../../../common/App/styles";
import { Loader } from "../../../common/Loader";
import { CrossCircleIcon } from "../../../common/icons/CrossCircleIcon";
import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { PlayCircleIcon } from "../../../common/icons/PlayCircleIcon";
import { StopCircleIcon } from "../../../common/icons/StopCircleIcon";
import { trackingEvents } from "../../tracking";
import type { AsyncActionStatus } from "../../types";
import { Operation } from "../types";
import * as s from "./styles";
import type { EngineManagerProps, OperationInfo } from "./types";

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

const operationsInfo: Record<Operation, OperationInfo> = {
  [Operation.Install]: {
    button: { label: "Start", icon: PlayCircleIcon },
    titleSuffix: "Starting"
  },
  [Operation.Uninstall]: {
    button: { label: "Remove", icon: CrossCircleIcon },
    titleSuffix: "Removing"
  },
  [Operation.Start]: {
    button: { label: "Start", icon: PlayCircleIcon },
    titleSuffix: "Starting"
  },
  [Operation.Stop]: {
    button: { label: "Stop", icon: StopCircleIcon },
    titleSuffix: "Stopping"
  }
};

export const EngineManager = ({
  engine,
  onManualInstallSelect,
  isAutoInstallationFlow,
  overlay
}: EngineManagerProps) => {
  const config = useContext(ConfigContext);
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const isEngineRunning = isDigmaEngineRunning(config.digmaStatus ?? null);

  // const isNotEngineDigmaInstanceRunning = Boolean(
  //   config.digmaStatus &&
  //     config.digmaStatus.runningDigmaInstances.length > 0 &&
  //     !config.digmaStatus.runningDigmaInstances.includes("localEngine")
  // );

  // const areMultipleDigmaInstancesRunning = Boolean(
  //   config.digmaStatus?.connection.status &&
  //     config.digmaStatus.runningDigmaInstances.length > 1
  // );

  const sendActionButtonTrackingEvent = (buttonName: string) => {
    sendUserActionTrackingEvent(trackingEvents.ENGINE_ACTION_BUTTON_CLICKED, {
      buttonName
    });
  };

  const handleRetryButtonClick = () => {
    sendActionButtonTrackingEvent("Retry");
    if (engine.failedOperation) {
      engine.startOperation(engine.failedOperation.operation);
    }
  };

  const handleInstallManuallyButtonClick = () => {
    sendActionButtonTrackingEvent("Install manually");
    if (onManualInstallSelect) {
      onManualInstallSelect();
    }
  };

  const renderOperationButton = (operation: Operation, disabled?: boolean) => {
    const handleOperationButtonClick = () => {
      const operationInfo = operationsInfo[operation];
      sendActionButtonTrackingEvent(operationInfo.button.label);
      engine.startOperation(operation);
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
      ? Operation.Start
      : Operation.Install;
    const operationInfo = operationsInfo[operation];
    sendActionButtonTrackingEvent(operationInfo.button.label);
    engine.startOperation(operation);
  };

  const renderContent = () => {
    const loaderStatus = getLoaderStatus(
      config.isDigmaEngineInstalled,
      isEngineRunning,
      engine.currentOperation?.status,
      engine.failedOperation?.operation
    );

    const icon = loaderStatus ? (
      <Loader status={loaderStatus} themeKind={themeKind} size={100} />
    ) : (
      <DigmaLogoIcon size={100} themeKind={themeKind} />
    );

    let title = "Digma Local Analysis Engine ";

    const lastOperation =
      engine.currentOperation?.operation ?? engine.failedOperation?.operation;

    if (lastOperation) {
      title += operationsInfo[lastOperation].titleSuffix;
    } else {
      title += config.isDigmaEngineInstalled
        ? isEngineRunning
          ? "Running"
          : "Stopped"
        : "Not installed";
    }

    if (engine.failedOperation) {
      title += " Failed";
    }

    const buttons = [];

    if (engine.failedOperation) {
      buttons.push(
        <s.ActionButton onClick={handleRetryButtonClick} key={"retry"}>
          Retry
        </s.ActionButton>
      );

      if (onManualInstallSelect) {
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
      if (config.isDigmaEngineInstalled && !isAutoInstallationFlow) {
        if (isEngineRunning) {
          buttons.push(renderOperationButton(Operation.Stop));
        }

        buttons.push(renderOperationButton(Operation.Uninstall));
      }
    }

    const isStartButtonDisabled =
      engine.currentOperation?.status === "pending" ||
      (config.digmaStatus &&
        config.digmaStatus.runningDigmaInstances.length > 0);

    return (
      <>
        <s.ContentContainer $overlay={overlay}>
          {icon}
          <s.TextContainer>
            <s.Title>{title}</s.Title>
            {!overlay && (
              <>
                {!engine.failedOperation && (
                  <span>
                    {engine.currentOperation?.status === "pending"
                      ? "This may take a few minutes..."
                      : `Click "${
                          isEngineRunning ? "Configure" : "Start"
                        }" to continue setup`}
                  </span>
                )}
                {engine.failedOperation ? (
                  <s.ErrorMessage>
                    {engine.failedOperation.error}
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
              {!engine.currentOperation && buttons}
            </s.ButtonsContainer>
          )}
        </s.ContentContainer>
        {!isAutoInstallationFlow && (
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
