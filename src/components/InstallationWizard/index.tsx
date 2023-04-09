import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { dispatcher } from "../../dispatcher";
import { usePrevious } from "../../hooks/usePrevious";
import { addPrefix } from "../../utils/addPrefix";
import { actions as globalActions } from "../common/App";
import { FinishStep } from "./FinishStep";
import { InstallStep } from "./InstallStep";
import { ObservabilityStep } from "./ObservabilityStep";
import { Step } from "./Step";
import { StepData, StepStatus } from "./Step/types";
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

const footerTransitionClassName = "footer";
const TRANSITION_DURATION = 300; // in milliseconds

const firstStep = window.wizardSkipInstallationStep === true ? 1 : 0;

const getStepStatus = (index: number, currentStep: number): StepStatus => {
  if (index < currentStep) {
    return "completed";
  }

  if (index === currentStep) {
    return "active";
  }

  return "not-completed";
};

export const InstallationWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(firstStep);
  const previousStep = usePrevious(currentStep);
  const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);
  const [isObservabilityEnabled, setIsObservabilityEnabled] =
    useState<boolean>(false);
  const [connectionCheckStatus, setConnectionCheckStatus] =
    useState<ConnectionCheckStatus>();
  const footerContentRef = useRef<HTMLDivElement>(null);

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

  const handleSkipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      window.sendMessageToDigma({
        action: actions.FINISH
      });
    }
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleFinishButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.FINISH
    });
  };

  const steps: StepData[] = [
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

  return (
    <s.Container>
      <s.Header>
        <s.HeaderTitle>Install Digma</s.HeaderTitle>
        <s.HeaderSubtitle>
          Follow the steps to configure your projects
        </s.HeaderSubtitle>
      </s.Header>
      {steps.map((step, i) => (
        <Step
          key={step.title}
          onSkip={handleSkipStep}
          onGoToStep={handleGoToStep}
          data={step}
          stepIndex={i}
          status={getStepStatus(i, currentStep)}
          transitionDuration={TRANSITION_DURATION}
        />
      ))}
      <s.Footer>
        <CSSTransition
          in={currentStep === steps.length - 1}
          timeout={TRANSITION_DURATION}
          classNames={footerTransitionClassName}
          nodeRef={footerContentRef}
          mountOnEnter={true}
        >
          <s.FooterContent
            ref={footerContentRef}
            transitionClassName={footerTransitionClassName}
            transitionDuration={TRANSITION_DURATION}
          >
            <s.MainButton onClick={handleFinishButtonClick}>
              Finish
            </s.MainButton>
          </s.FooterContent>
        </CSSTransition>
      </s.Footer>
    </s.Container>
  );
};
