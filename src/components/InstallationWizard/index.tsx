import type { ChangeEvent } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SLACK_WORKSPACE_URL } from "../../constants";
import type { IDE } from "../../globals";
import { useDebounce } from "../../hooks/useDebounce";
import { ide } from "../../platform";
import { openURLInDefaultBrowser } from "../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { isValidEmailFormat } from "../../utils/isValidEmailFormat";
import { ConfigContext } from "../common/App/ConfigContext";
import { CrossIcon } from "../common/icons/CrossIcon";
import { DesktopIcon } from "../common/icons/DesktopIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { FinishStep } from "./FinishStep";
import { InstallStep } from "./InstallStep";
import { Step } from "./Step";
import type { StepData, StepStatus } from "./Step/types";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type { FieldsErrors } from "./types";

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

const getFieldsErrors = (productKey: string, email: string): FieldsErrors => {
  if (productKey.length > 0 && email.length === 0) {
    return { email: "Please enter your email" };
  }

  return {};
};

export const InstallationWizard = () => {
  const config = useContext(ConfigContext);
  const [currentStep, setCurrentStep] = useState<number>(firstStep);
  // const previousStep = usePrevious(currentStep);
  // const [isAlreadyUsingOtel, setIsAlreadyUsingOtel] = useState<boolean>(false);
  // const [isObservabilityEnabled, setIsObservabilityEnabled] = useState<boolean>(
  //   config.isObservabilityEnabled
  // );
  // const [connectionCheckStatus, setConnectionCheckStatus] =
  //   useState<AsyncActionStatus>();
  const footerContentRef = useRef<HTMLDivElement>(null);
  // const [userEmail, setUserEmail] = useState("");
  // const [isUserEmailCaptured, setIsUserEmailCaptured] = useState(false);

  // TODO:
  // add environment variable for presetting the correct installation type
  // if Digma already installed
  // const preselectedInstallationType =
  //   window.wizardSkipInstallationStep === true || config.isDigmaEngineInstalled
  //     ? "local"
  //     : undefined;
  // const [installationType, setInstallationType] = useState<
  //   InstallationType | undefined
  // >(preselectedInstallationType);

  // const theme = useTheme();
  // const themeKind = getThemeKind(theme);
  const [email, setEmail] = useState(config.userEmail);
  const [productKey, setProductKey] = useState(config.productKey);
  const [isEmailValid, setIsEmailValid] = useState(
    email.length > 0 ? isValidEmailFormat(email) : undefined
  );
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const debouncedEmail = useDebounce(email, 1000);
  const [errors, setErrors] = useState<FieldsErrors>({});
  // const [
  //   isDigmaCloudNotificationCheckboxChecked,
  //   setIsDigmaCloudNotificationCheckboxChecked
  // ] = useState(false);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);

    if (firstStep === 1) {
      sendTrackingEvent(trackingEvents.INSTALL_STEP_AUTOMATICALLY_PASSED);
    }

    // const handleConnectionCheckResultData = (data: unknown) => {
    //   const result = (data as AsyncActionResultData).result;
    //   setConnectionCheckStatus(result);
    // };

    // dispatcher.addActionListener(
    //   actions.SET_CONNECTION_CHECK_RESULT,
    //   handleConnectionCheckResultData
    // );

    // return () => {
    //   dispatcher.removeActionListener(
    //     actions.SET_CONNECTION_CHECK_RESULT,
    //     handleConnectionCheckResultData
    //   );
    // };
  }, []);

  useEffect(() => {
    if (email === debouncedEmail) {
      const res =
        debouncedEmail.length > 0
          ? isValidEmailFormat(debouncedEmail)
          : undefined;
      setIsEmailValid(res);
      setIsEmailValidating(false);
    }
  }, [email, debouncedEmail]);

  // useEffect(() => {
  //   if (
  //     previousStep === 1 &&
  //     currentStep === 2 &&
  //     isFirstLaunch &&
  //     !isObservabilityEnabled
  //   ) {
  //     setIsObservabilityEnabled(true);
  //     window.sendMessageToDigma({
  //       action: actions.SET_OBSERVABILITY,
  //       payload: {
  //         isObservabilityEnabled: true
  //       }
  //     });
  //   }
  // }, [
  //   previousStep,
  //   currentStep
  // ,isObservabilityEnabled
  // ]);

  // const handleConnectionStatusCheck = () => {
  //   setConnectionCheckStatus("pending");
  //   window.sendMessageToDigma({
  //     action: actions.CHECK_CONNECTION
  //   });
  // };

  // const handleResetConnectionCheckStatus = () => {
  //   setConnectionCheckStatus(undefined);
  // };

  const handleGetDigmaDockerDesktopButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GET_DIGMA_DOCKER_EXTENSION_BUTTON_CLICKED
    );
    openURLInDefaultBrowser(DIGMA_DOCKER_EXTENSION_URL);
  };

  const handleInstallTabSelect = (tabName: string) => {
    sendUserActionTrackingEvent(trackingEvents.TAB_CLICKED, {
      tabName
    });
  };

  // const handleIsAlreadyUsingOtelChange = (value: boolean) => {
  //   setIsAlreadyUsingOtel(value);
  // };

  // const handleObservabilityChange = (value: boolean) => {
  //   sendUserActionTrackingEvent(trackingEvents.OBSERVABILITY_BUTTON_CLICKED);
  //   setIsObservabilityEnabled(value);
  //   window.sendMessageToDigma({
  //     action: actions.SET_OBSERVABILITY,
  //     payload: {
  //       isObservabilityEnabled: value
  //     }
  //   });
  // };

  const goToNextStep = (isAutomatic?: boolean) => {
    setCurrentStep(currentStep + 1);

    if (steps[currentStep].key === "install") {
      if (isFirstLaunch && isAutomatic) {
        sendTrackingEvent(trackingEvents.INSTALL_STEP_AUTOMATICALLY_PASSED, {
          isFirstTimeSetup: true
        });
      }

      if (!isAutomatic) {
        sendUserActionTrackingEvent(trackingEvents.INSTALL_STEP_PASSED);
      }
    }
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  // const handleInstallationTypeButtonClick = (
  //   installationType: InstallationType
  // ) => {
  //   sendUserActionTrackingEvent(trackingEvents.INSTALLATION_TYPE_BUTTON_CLICKED, {
  //     installationType
  //   });
  //   setInstallationType(installationType);
  // };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (email !== value) {
      setErrors({});
      setIsEmailValid(undefined);
      setIsEmailValidating(true);
      setEmail(value);
    }
  };

  const handleProductKeyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (productKey !== value) {
      setProductKey(value);
    }
  };

  const handleCloseButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleFinishButtonClick = () => {
    const errors = getFieldsErrors(productKey, email);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      window.sendMessageToDigma({
        action: actions.FINISH,
        payload: {
          ...(debouncedEmail.length > 0 ? { email: debouncedEmail } : {}),
          ...(productKey.length > 0 ? { productKey } : {})
        }
      });
    }
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  // const handleDigmaCloudNotificationCheckboxChange = (value: boolean) => {
  //   setIsDigmaCloudNotificationCheckboxChecked(value);
  // };

  // const handleUserEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserEmail(e.target.value);
  // };

  // const handleEmailAddButton = () => {
  //   if (userEmail.length > 0) {
  //     setIsUserEmailCaptured(true);
  //     sendUserActionTrackingEvent(
  //       trackingEvents.DIGMA_CLOUD_AVAILABILITY_NOTIFICATION_EMAIL_ADDRESS_CAPTURED,
  //       {
  //         email: userEmail
  //       }
  //     );
  //   }
  // };

  const steps: StepData[] = [
    {
      key: "install",
      title: "Get Digma up and running",
      content: (
        <InstallStep
          // connectionCheckStatus={connectionCheckStatus}
          // onConnectionStatusCheck={handleConnectionStatusCheck}
          // onResetConnectionCheckStatus={handleResetConnectionCheckStatus}
          onGetDigmaDockerDesktopButtonClick={
            handleGetDigmaDockerDesktopButtonClick
          }
          onInstallTabSelect={handleInstallTabSelect}
          onGoToNextStep={goToNextStep}
          onSlackLinkClick={handleSlackLinkClick}
        />
      )
    },
    // ...(ide === "IDEA"
    //   ? [
    //       {
    //         key: "observability",
    //         title: isAlreadyUsingOtel
    //           ? "If you're already using OpenTelemetry…"
    //           : "Observe your application",
    //         content: (
    //           <ObservabilityStep
    //             isAlreadyUsingOtel={isAlreadyUsingOtel}
    //             onIsAlreadyUsingOtelChange={handleIsAlreadyUsingOtelChange}
    //             onGoToNextStep={goToNextStep}
    //             isObservabilityEnabled={isObservabilityEnabled}
    //             onObservabilityChange={handleObservabilityChange}
    //           />
    //         )
    //       }
    //     ]
    //   : []),
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
          productKey={productKey}
          errors={errors}
          onProductKeyInputChange={handleProductKeyInputChange}
        />
      )
    }
  ];

  const installStepIndex = steps.findIndex((x) => x.key === "install");

  return (
    <s.Container>
      {/* {installationType ? ( */}
      <s.Header>
        <s.HeaderTitleContainer>
          <s.HeaderTitle>
            <DesktopIcon color={"currentColor"} size={16} />
            Install Digma Locally
          </s.HeaderTitle>
          <s.HeaderSubtitle>
            Follow the steps to configure your projects
          </s.HeaderSubtitle>
        </s.HeaderTitleContainer>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      {/* ) : (
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
            <InstallationTypeCard
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
            <InstallationTypeCard
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
              additionalContent={
                <s.SubscriptionContentContainer>
                  {isUserEmailCaptured ? (
                    <s.SubscriptionSuccessMessage>
                      <Loader
                        size={24}
                        status={"success"}
                        themeKind={themeKind}
                      />
                      Thank you for subscription!
                    </s.SubscriptionSuccessMessage>
                  ) : (
                    <>
                      <Checkbox
                        onChange={handleDigmaCloudNotificationCheckboxChange}
                        label={
                          "Let me know when Digma Cloud will become available"
                        }
                        value={isDigmaCloudNotificationCheckboxChecked}
                      />
                      {isDigmaCloudNotificationCheckboxChecked && (
                        <TextField
                          onChange={handleUserEmailInputChange}
                          value={userEmail}
                          placeholder={"Enter your email address to register"}
                          inputEndContent={
                            <Button
                              disabled={userEmail.length === 0}
                              onClick={handleEmailAddButton}
                            >
                              Add
                            </Button>
                          }
                        />
                      )}
                    </>
                  )}
                </s.SubscriptionContentContainer>
              }
              disabled={true}
            />
          </s.InstallationTypeButtonsContainer>
        </s.WelcomeContainer>
      )} */}
      <s.StepsContainer>
        {
          // installationType &&
          steps.map((step, i) => (
            <Step
              key={step.key}
              onGoToStep={handleGoToStep}
              data={step}
              stepIndex={i}
              status={getStepStatus(i, currentStep)}
              transitionDuration={TRANSITION_DURATION}
            />
          ))
        }
      </s.StepsContainer>
      <s.Footer>
        {/* {installationType && ( */}
        <CSSTransition
          in={currentStep === steps.length - 1 && installStepIndex !== -1}
          timeout={TRANSITION_DURATION}
          classNames={footerTransitionClassName}
          nodeRef={footerContentRef}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <s.FinishStepFooterContent
            ref={footerContentRef}
            $transitionClassName={footerTransitionClassName}
            $transitionDuration={TRANSITION_DURATION}
          >
            <s.BackToInstallMethodButton
              onClick={() => handleGoToStep(installStepIndex)}
              disabled={isEmailValid === false || isEmailValidating}
              buttonType={"secondary"}
            >
              Back to installation method
            </s.BackToInstallMethodButton>
            <s.MainButton
              onClick={handleFinishButtonClick}
              disabled={isEmailValid === false || isEmailValidating}
            >
              Finish
            </s.MainButton>
          </s.FinishStepFooterContent>
        </CSSTransition>
        {/* )} */}
        <s.FooterSlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon size={14} />
          Having trouble? Please reach out in our Slack group
        </s.FooterSlackLink>
      </s.Footer>
    </s.Container>
  );
};
