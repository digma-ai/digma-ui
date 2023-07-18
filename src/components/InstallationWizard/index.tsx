import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { dispatcher } from "../../dispatcher";
import { IDE } from "../../globals";
import { useDebounce } from "../../hooks/useDebounce";
import { usePrevious } from "../../hooks/usePrevious";
import { ide } from "../../platform";
import { addPrefix } from "../../utils/addPrefix";
import { actions as globalActions } from "../common/App";
import { ConfigContext } from "../common/App/ConfigContext";
import { getThemeKind } from "../common/App/styles";
import { CloudDownloadIcon } from "../common/icons/CloudDownloadIcon";
import { DigmaGreetingIcon } from "../common/icons/DigmaGreetingIcon";
import { OpenTelemetryDisplayIcon } from "../common/icons/OpenTelemetryDisplayIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { FinishStep } from "./FinishStep";
import { InstallStep } from "./InstallStep";
import { InstallationTypeButton } from "./InstallationTypeButton";
import { ObservabilityStep } from "./ObservabilityStep";
import { Step } from "./Step";
import { StepData, StepStatus } from "./Step/types";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import {
  AsyncActionResultData,
  AsyncActionStatus,
  InstallationType,
  SetCurrentStepData
} from "./types";

const EMAIL_ADDRESS_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // source: https://piotr.gg/regexp/email-address-regular-expression-that-99-99-works.html

const ACTION_PREFIX = "INSTALLATION_WIZARD";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  FINISH: "FINISH",
  CHECK_CONNECTION: "CHECK_CONNECTION",
  SET_CONNECTION_CHECK_RESULT: "SET_CONNECTION_CHECK_RESULT",
  SET_OBSERVABILITY: "SET_OBSERVABILITY",
  INSTALL_DIGMA_ENGINE: "INSTALL_DIGMA_ENGINE",
  UNINSTALL_DIGMA_ENGINE: "UNINSTALL_DIGMA_ENGINE",
  START_DIGMA_ENGINE: "START_DIGMA_ENGINE",
  STOP_DIGMA_ENGINE: "STOP_DIGMA_ENGINE",
  SET_INSTALL_DIGMA_ENGINE_RESULT: "SET_INSTALL_DIGMA_ENGINE_RESULT",
  SET_UNINSTALL_DIGMA_ENGINE_RESULT: "SET_UNINSTALL_DIGMA_ENGINE_RESULT",
  SET_START_DIGMA_ENGINE_RESULT: "SET_START_DIGMA_ENGINE_RESULT",
  SET_STOP_DIGMA_ENGINE_RESULT: "SET_STOP_DIGMA_ENGINE_RESULT",
  SET_CURRENT_STEP: "SET_CURRENT_STEP"
});

const DIGMA_DOCKER_EXTENSION_URL =
  "https://open.docker.com/extensions/marketplace?extensionId=digmaai/digma-docker-extension";

const getQuickstartURL = (ide: IDE | undefined): string | undefined => {
  switch (ide) {
    case "PyCharm":
      return "https://digma.ai/python-quick-start-guide/";
    case "Rider":
      return "https://digma.ai/net-quick-start-guide/";
  }
};

const quickstartURL = getQuickstartURL(ide);

const footerTransitionClassName = "footer";
const TRANSITION_DURATION = 300; // in milliseconds

const isFirstLaunch = window.wizardFirstLaunch === true;

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

const validateEmailFormat = (email: string): boolean => {
  return new RegExp(EMAIL_ADDRESS_REGEX).test(email);
};

export const InstallationWizard = () => {
  const config = useContext(ConfigContext);
  const [currentStep, setCurrentStep] = useState<number>(firstStep);
  const previousStep = usePrevious(currentStep);
  const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);
  const [isObservabilityEnabled, setIsObservabilityEnabled] = useState<boolean>(
    config.isObservabilityEnabled
  );
  const [connectionCheckStatus, setConnectionCheckStatus] =
    useState<AsyncActionStatus>();
  const footerContentRef = useRef<HTMLDivElement>(null);

  // TO DO:
  // add environment variable for presetting the correct installation type
  // if Digma already installed
  const preselectedInstallationType =
    window.wizardSkipInstallationStep === true || config.isDigmaEngineInstalled
      ? "local"
      : undefined;
  const [installationType, setInstallationType] = useState<
    InstallationType | undefined
  >(preselectedInstallationType);

  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [email, setEmail] = useState(config.userEmail);
  const [isEmailValid, setIsEmailValid] = useState(
    email.length > 0 ? validateEmailFormat(email) : undefined
  );
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const debouncedEmail = useDebounce(email, 1000);

  useEffect(() => {
    if (email === debouncedEmail) {
      const res =
        debouncedEmail.length > 0
          ? validateEmailFormat(debouncedEmail)
          : undefined;
      setIsEmailValid(res);
      setIsEmailValidating(false);
    }
  }, [email, debouncedEmail]);

  useEffect(() => {
    if (previousStep === 0 && currentStep === 1) {
      window.sendMessageToDigma({
        action: globalActions.SEND_TRACKING_EVENT,
        payload: {
          eventName: trackingEvents.INSTALL_STEP_PASSED
        }
      });
    }

    if (
      previousStep === 1 &&
      currentStep === 2 &&
      isFirstLaunch &&
      !isObservabilityEnabled
    ) {
      setIsObservabilityEnabled(true);
      window.sendMessageToDigma({
        action: actions.SET_OBSERVABILITY,
        payload: {
          isObservabilityEnabled: true
        }
      });
    }
  }, [previousStep, currentStep, isObservabilityEnabled]);

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
      const result = (data as AsyncActionResultData).result;
      setConnectionCheckStatus(result);
    };

    const handleSetCurrentStepData = (data: unknown) => {
      // TODO: refactor to use SpanData array
      const steps = ["install", "observability", "finish"];

      const newCurrentStep = steps.findIndex(
        (x) => x === (data as SetCurrentStepData).currentStep
      );

      if (newCurrentStep >= 0 && newCurrentStep <= steps.length - 1) {
        setCurrentStep(newCurrentStep);
      }
    };

    dispatcher.addActionListener(
      actions.SET_CONNECTION_CHECK_RESULT,
      handleConnectionCheckResultData
    );

    dispatcher.addActionListener(
      actions.SET_CURRENT_STEP,
      handleSetCurrentStepData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CONNECTION_CHECK_RESULT,
        handleConnectionCheckResultData
      );

      dispatcher.removeActionListener(
        actions.SET_CURRENT_STEP,
        handleSetCurrentStepData
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
      action: globalActions.SEND_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.GET_DIGMA_DOCKER_EXTENSION_BUTTON_CLICKED
      }
    });
  };

  const handleInstallTabSelect = (tabName: string) => {
    window.sendMessageToDigma({
      action: globalActions.SEND_TRACKING_EVENT,
      payload: {
        eventName: trackingEvents.TAB_CLICKED,
        data: {
          tabName
        }
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
    setCurrentStep(currentStep + 1);
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleInstallationTypeButtonClick = (
    installationType: InstallationType
  ) => {
    setInstallationType(installationType);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (email !== value) {
      setIsEmailValid(undefined);
      setIsEmailValidating(true);
      setEmail(value);
    }
  };

  const handleFinishButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.FINISH,
      payload: {
        ...(debouncedEmail.length > 0 ? { email: debouncedEmail } : {})
      }
    });
  };

  const handleSlackLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: SLACK_WORKSPACE_URL
      }
    });
  };

  const steps: StepData[] = [
    {
      key: "install",
      title: "Get Digma up and running",
      content: (
        <InstallStep
          connectionCheckStatus={connectionCheckStatus}
          onConnectionStatusCheck={handleConnectionStatusCheck}
          onResetConnectionCheckStatus={handleResetConnectionCheckStatus}
          onGetDigmaDockerDesktopButtonClick={
            handleGetDigmaDockerDesktopButtonClick
          }
          onInstallTabSelect={handleInstallTabSelect}
          onGoToNextStep={goToNextStep}
          onSlackLinkClick={handleSlackLinkClick}
        />
      )
    },
    ...(ide === "IDEA"
      ? [
          {
            key: "observability",
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
          }
        ]
      : []),
    {
      key: "finish",
      title: "You're done!",
      content: (
        <FinishStep
          quickstartURL={quickstartURL}
          onSlackLinkClick={handleSlackLinkClick}
          email={email}
          onEmailInputChange={handleEmailInputChange}
          isEmailValid={isEmailValid}
          isEmailValidating={isEmailValidating}
        />
      )
    }
  ];

  return (
    <s.Container>
      {installationType ? (
        <s.Header>
          <s.HeaderTitle>Install Digma</s.HeaderTitle>
          <s.HeaderSubtitle>
            Follow the steps to configure your projects
          </s.HeaderSubtitle>
        </s.Header>
      ) : (
        <s.WelcomeContainer>
          <s.WelcomeTitleContainer>
            <s.WelcomeIconContainer>
              <DigmaGreetingIcon themeKind={themeKind} />
            </s.WelcomeIconContainer>
            <s.WelcomeTitle>Welcome to Digma!</s.WelcomeTitle>
          </s.WelcomeTitleContainer>
          <s.WelcomeText>
            Digma is an IDE plugin for analyzing code runtime data. It enables
            rapid development in complex projects by linting and detecting
            issues as they appear, highlighting possible risks in code and
            providing code change analysis and context
          </s.WelcomeText>
          <s.InstallationTypeText>
            Select installation type:
          </s.InstallationTypeText>
          <s.InstallationTypeButtonsContainer>
            <InstallationTypeButton
              key={"local"}
              installationType={"local"}
              onClick={handleInstallationTypeButtonClick}
              icon={
                <OpenTelemetryDisplayIcon themeKind={themeKind} height={43} />
              }
              title={<>Local Install Only</>}
              description={
                <>
                  <span>Digma will be installed locally</span>
                  <span>
                    All observability data will be saved on the local machine
                    only
                  </span>
                </>
              }
            />
            <InstallationTypeButton
              key={"cloud"}
              installationType={"cloud"}
              onClick={handleInstallationTypeButtonClick}
              icon={<CloudDownloadIcon themeKind={themeKind} height={43} />}
              title={
                <>
                  Use Digma Cloud
                  <s.Badge>Coming Soon</s.Badge>
                </>
              }
              description={
                <>Data will be sent anonymously to Digma for processing</>
              }
              disabled={true}
            />
          </s.InstallationTypeButtonsContainer>
        </s.WelcomeContainer>
      )}
      {installationType &&
        steps.map((step, i) => (
          <Step
            key={step.title}
            onGoToStep={handleGoToStep}
            data={step}
            stepIndex={i}
            status={getStepStatus(i, currentStep)}
            transitionDuration={TRANSITION_DURATION}
          />
        ))}

      <s.Footer>
        {installationType && (
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
              <s.MainButton
                onClick={handleFinishButtonClick}
                disabled={isEmailValid === false || isEmailValidating}
              >
                Finish
              </s.MainButton>
            </s.FooterContent>
          </CSSTransition>
        )}
        <s.FooterSlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon />
          Having trouble? Please reach out in our Slack group
        </s.FooterSlackLink>
      </s.Footer>
    </s.Container>
  );
};
