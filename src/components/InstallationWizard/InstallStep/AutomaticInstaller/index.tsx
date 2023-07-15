import { useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { actions } from "../..";
import { dispatcher } from "../../../../dispatcher";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { getThemeKind } from "../../../common/App/styles";
import { Button } from "../../../common/Button";
import { Loader } from "../../../common/Loader";
import { CrossCircleIcon } from "../../../common/icons/CrossCircleIcon";
import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { PlayCircleIcon } from "../../../common/icons/PlayCircleIcon";
import { StopCircleIcon } from "../../../common/icons/StopCircleIcon";
import { MainButton } from "../../styles";
import { AsyncActionResultData, AsyncActionStatus } from "../../types";
import * as s from "./styles";
import { AutomaticInstallerProps, Operation } from "./types";

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

export const AutomaticInstaller = (props: AutomaticInstallerProps) => {
  const config = useContext(ConfigContext);
  const [isDigmaInstalled, setIsDigmaInstalled] = useState(
    config.isDigmaInstalled
  );
  const [isDigmaRunning, setIsDigmaRunning] = useState(config.isDigmaRunning);
  const [currentOperation, setCurrentOperation] = useState<{
    operation: Operation;
    status: AsyncActionStatus;
  }>();
  const [failedOperation, setFailedOperation] = useState<Operation>();
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const operationsInfo: Record<
    Operation,
    {
      action: string;
    }
  > = {
    [Operation.INSTALL]: {
      action: actions.INSTALL_DIGMA
    },
    [Operation.UNINSTALL]: {
      action: actions.UNINSTALL_DIGMA
    },
    [Operation.START]: {
      action: actions.START_DIGMA
    },
    [Operation.STOP]: { action: actions.STOP_DIGMA }
  };

  useEffect(() => {
    const handleInstallDigmaResultData = (data: unknown) => {
      const result = (data as AsyncActionResultData).result;
      setCurrentOperation({ operation: Operation.INSTALL, status: result });
    };

    const handleUninstallDigmaResultData = (data: unknown) => {
      const result = (data as AsyncActionResultData).result;
      setCurrentOperation({ operation: Operation.UNINSTALL, status: result });
    };

    const handleStartDigmaResultData = (data: unknown) => {
      const result = (data as AsyncActionResultData).result;
      setCurrentOperation({ operation: Operation.START, status: result });
    };

    const handleStopDigmaResultData = (data: unknown) => {
      const result = (data as AsyncActionResultData).result;
      setCurrentOperation({ operation: Operation.STOP, status: result });
    };

    dispatcher.addActionListener(
      actions.SET_INSTALL_DIGMA_RESULT,
      handleInstallDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_UNINSTALL_DIGMA_RESULT,
      handleUninstallDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_START_DIGMA_RESULT,
      handleStartDigmaResultData
    );

    dispatcher.addActionListener(
      actions.SET_STOP_DIGMA_RESULT,
      handleStopDigmaResultData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_INSTALL_DIGMA_RESULT,
        handleInstallDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_UNINSTALL_DIGMA_RESULT,
        handleUninstallDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_START_DIGMA_RESULT,
        handleStartDigmaResultData
      );

      dispatcher.removeActionListener(
        actions.SET_STOP_DIGMA_RESULT,
        handleStopDigmaResultData
      );
    };
  }, []);

  useEffect(() => {
    if (!isDigmaInstalled) {
      window.sendMessageToDigma({
        action: actions.INSTALL_DIGMA
      });
      setCurrentOperation({ operation: Operation.INSTALL, status: "pending" });
    }
  }, [isDigmaInstalled]);

  // Handle operation result
  useEffect(() => {
    if (currentOperation) {
      if (currentOperation.status === "success") {
        switch (currentOperation.operation) {
          case Operation.INSTALL:
            setIsDigmaInstalled(true);
            setIsDigmaRunning(true);
            break;
          case Operation.UNINSTALL:
            setIsDigmaInstalled(false);
            props.onManualInstallSelect();
            break;
          case Operation.START:
            setIsDigmaRunning(true);
            break;
          case Operation.STOP:
            setIsDigmaRunning(false);
            break;
        }
      }

      switch (currentOperation.status) {
        case "success":
          setCurrentOperation(undefined);
          break;
        case "failure":
          setFailedOperation(currentOperation.operation);
          setCurrentOperation(undefined);
          break;
        case "pending":
          setFailedOperation(undefined);
          break;
      }
    }
  }, [currentOperation, props.onManualInstallSelect]);

  const handleStartButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.START_DIGMA
    });
    setCurrentOperation({ operation: Operation.START, status: "pending" });
  };

  const handleStopButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.STOP_DIGMA
    });
    setCurrentOperation({ operation: Operation.STOP, status: "pending" });
  };

  const handleRemoveButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.UNINSTALL_DIGMA
    });
    setCurrentOperation({ operation: Operation.UNINSTALL, status: "pending" });
  };

  const handleRetryButtonClick = () => {
    if (failedOperation) {
      window.sendMessageToDigma({
        action: operationsInfo[failedOperation].action
      });
      setCurrentOperation({ operation: failedOperation, status: "pending" });
    }
  };

  const handleInstallManuallyButtonClick = () => {
    props.onManualInstallSelect();
  };

  const handleNextButtonClick = () => {
    props.onGoToNextStep();
  };

  const renderContent = () => {
    const loaderStatus = getLoaderStatus(
      isDigmaRunning,
      currentOperation?.status,
      failedOperation
    );

    const icon = loaderStatus ? (
      <Loader status={loaderStatus} themeKind={themeKind} size={100} />
    ) : (
      <DigmaLogoIcon size={100} themeKind={themeKind} />
    );

    let title = "Digma Local Analysis Engine ";

    switch (currentOperation?.operation || failedOperation) {
      case Operation.START:
      case Operation.INSTALL:
        title += "Starting";
        break;
      case Operation.UNINSTALL:
        title += "Removing";
        break;
      case Operation.STOP:
        title += "Stopping";
        break;
      case undefined:
        title += isDigmaRunning ? "Running" : "Stopped";
    }

    if (failedOperation) {
      title += " Failed";
    }

    const buttons = [];

    if (failedOperation) {
      buttons.push(
        ...[
          <Button
            onClick={handleRetryButtonClick}
            buttonType={"tertiary"}
            key={"retry"}
          >
            Retry
          </Button>,
          <Button
            onClick={handleInstallManuallyButtonClick}
            buttonType={"tertiary"}
            key={"install-manually"}
          >
            Install manually
          </Button>
        ]
      );
    }

    if (isDigmaInstalled) {
      if (isDigmaRunning) {
        buttons.push(
          <Button
            onClick={handleStopButtonClick}
            buttonType={"tertiary"}
            key={"stop"}
            icon={{ component: StopCircleIcon }}
          >
            Stop
          </Button>
        );
      } else {
        buttons.push(
          <Button
            onClick={handleStartButtonClick}
            buttonType={"tertiary"}
            key={"start"}
            icon={{ component: PlayCircleIcon }}
          >
            Start
          </Button>
        );
      }

      buttons.push(
        <Button
          onClick={handleRemoveButtonClick}
          buttonType={"tertiary"}
          key={"remove"}
          icon={{ component: CrossCircleIcon }}
        >
          Remove
        </Button>
      );
    }

    const buttonsWithDividers = buttons.flatMap((button, i, arr) =>
      i !== arr.length - 1
        ? [button, <s.ButtonDivider key={`divider-{i}`} />]
        : button
    );

    return (
      <>
        {icon}
        <s.Title>{title}</s.Title>
        {!failedOperation && (
          <s.ContentContainer>
            <span>
              {currentOperation?.status === "pending"
                ? "This may take a few minutes..."
                : 'Click "Next" to continue setup'}
            </span>
            <span>
              You can always start / stop / remove the Digma Engine from the
              Digma panel
            </span>
          </s.ContentContainer>
        )}
        <s.ButtonsContainer>
          {!currentOperation && buttonsWithDividers}
        </s.ButtonsContainer>
        <MainButton
          disabled={!isDigmaInstalled}
          onClick={handleNextButtonClick}
        >
          Next
        </MainButton>
      </>
    );
  };

  return <s.Container>{renderContent()}</s.Container>;
};
