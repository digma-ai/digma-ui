import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { addPrefix } from "../../utils/addPrefix";
import { actions as globalActions } from "../common/App";
import { CheckmarkCircleInvertedIcon } from "../common/icons/CheckmarkCircleInvertedIcon";
import { Button } from "./Button";
import { FinishStep } from "./FinishStep";
import { InstallStep } from "./InstallStep";
import { ObservabilityStep } from "./ObservabilityStep";
import * as s from "./styles";
import { ConnectionCheckResultData, ConnectionCheckStatus } from "./types";

const ACTION_PREFIX = "INSTALLATION_WIZARD";

const actions = addPrefix(ACTION_PREFIX, {
  FINISH: "FINISH",
  CHECK_CONNECTION: "CHECK_CONNECTION",
  SET_CONNECTION_CHECK_RESULT: "SET_CONNECTION_CHECK_RESULT",
  SET_OBSERVABILITY: "SET_OBSERVABILITY"
});

const DIGMA_DOCKER_EXTENSION_URL =
  "https://open.docker.com/extensions/marketplace?extensionId=digmaai/digma-docker-extension";

const TRACKING_PREFIX = "installation wizard";

const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    INSTALL_STEP_PASSED: "install step passed",
    INSTALL_STEP_AUTOMATICALLY_PASSED: "install step automatically passed",
    GET_DIGMA_DOCKER_EXTENSION_BUTTON_CLICKED:
      "get digma docker extension button clicked",
    OBSERVABILITY_BUTTON_CLICKED: "set observability button clicked"
  },
  " "
);

const firstStep = window.wizardSkipInstallationStep === true ? 1 : 0;

export const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(firstStep);
  const previousStep = usePrevious(currentStep);
  const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);
  const [isObservabilityEnabled, setIsObservabilityEnabled] =
    useState<boolean>(false);

  const [connectionCheckStatus, setConnectionCheckStatus] =
    useState<ConnectionCheckStatus>();

  useEffect(() => {
    if (previousStep === 0 && currentStep === 1) {
      window.sendMessageToDigma({
        action: globalActions.SEND_TRACKING_EVENT,
        payload: {
          eventName: trackingEvents.INSTALL_STEP_PASSED
        }
      });
    }
  }, [previousStep, currentStep]);

  useEffect(() => {
    if (firstStep === 1) {
      window.sendMessageToDigma({
        action: globalActions.SEND_TRACKING_EVENT,
        payload: {
          eventName: trackingEvents.INSTALL_STEP_AUTOMATICALLY_PASSED
        }
      });
    }

    const handleConnectionCheckResultData = (data: unknown) => {
      const result = (data as ConnectionCheckResultData).result;
      setConnectionCheckStatus(result);
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

  const handleConnectionStatusCheck = () => {
    setConnectionCheckStatus("pending");
    window.sendMessageToDigma({
      action: actions.CHECK_CONNECTION
    });
  };

  const handleResetConnectionCheckStatus = () => {
    setConnectionCheckStatus(undefined);
  };

  const handleGetDigmaDockerDesktopButtonClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: DIGMA_DOCKER_EXTENSION_URL
      }
    });
    window.sendMessageToDigma({
      action: globalActions.SET_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.GET_DIGMA_DOCKER_EXTENSION_BUTTON_CLICKED
      }
    });
  };

  const handleIsAlreadyUsingOtelChange = (value: boolean) => {
    setIsAlreadyUsingOtel(value);
  };

  const handleObservabilityChange = (value: boolean) => {
    setIsObservabilityEnabled(value);
    window.sendMessageToDigma({
      action: actions.SET_OBSERVABILITY,
      payload: {
        isObservabilityEnabled: value
      }
    });
    window.sendMessageToDigma({
      action: globalActions.SEND_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.OBSERVABILITY_BUTTON_CLICKED
      }
    });
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkipLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      window.sendMessageToDigma({
        action: actions.FINISH
      });
    }
  };

  const handleFinishButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.FINISH
    });
  };

  const steps = [
    {
      title: "Get Digma up and running",
      content: (
        <InstallStep
          connectionCheckStatus={connectionCheckStatus}
          onConnectionStatusCheck={handleConnectionStatusCheck}
          onResetConnectionCheckStatus={handleResetConnectionCheckStatus}
          onGetDigmaDockerDesktopButtonClick={
            handleGetDigmaDockerDesktopButtonClick
          }
          onGoToNextStep={goToNextStep}
        />
      )
    },
    {
      title: isAlreadyUsingOtel
        ? "If you're already using OpenTelemetry…"
        : "Observe your application",
      content: (
        <ObservabilityStep
          isAlreadyUsingOtel={isAlreadyUsingOtel}
          onIsAlreadyUsingOtelChange={handleIsAlreadyUsingOtelChange}
          onGoToNextStep={goToNextStep}
          isObservabilityEnabled={isObservabilityEnabled}
          onObservabilityChange={handleObservabilityChange}
        />
      )
    },
    {
      title: "You're done!",
      content: <FinishStep />
    }
  ];

  const step = steps[currentStep];
  const previousSteps = steps.slice(0, currentStep);
  const nextSteps = steps.slice(currentStep + 1);

  return (
    <s.Container>
      <s.Header>
        <s.HeaderTitle>Install Digma</s.HeaderTitle>
        <s.HeaderSubtitle>
          Follow the steps to configure your projects
        </s.HeaderSubtitle>
      </s.Header>
      {previousSteps.length > 0 &&
        previousSteps.map((step) => (
          <s.InactiveStepHeader key={step.title}>
            <CheckmarkCircleInvertedIcon size={16} color={"#6a6dfa"} />
            {step.title}
          </s.InactiveStepHeader>
        ))}
      <s.Content>
        <s.StepHeader>
          <s.StepNumber>{currentStep + 1}</s.StepNumber>
          {step.title}
          <s.SkipLink onClick={handleSkipLinkClick}>Skip for now</s.SkipLink>
        </s.StepHeader>
        <s.StepContent>{step.content}</s.StepContent>
      </s.Content>
      {nextSteps.length > 0 &&
        nextSteps.map((step, i) => (
          <s.InactiveStepHeader key={step.title}>
            <s.NextStepNumber>{currentStep + 2 + i}</s.NextStepNumber>
            {step.title}
          </s.InactiveStepHeader>
        ))}
      <s.Footer>
        {currentStep === steps.length - 1 && (
          <Button onClick={handleFinishButtonClick}>Finish</Button>
        )}
      </s.Footer>
    </s.Container>
  );
};
