import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dispatcher } from "../../../dispatcher";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { actions } from "../actions";
import { RecentActivityContainerBackgroundGradient } from "../styles";
import { trackingEvents } from "../tracking";
import type {
  CreateEnvironmentPayload,
  EnvironmentCreatedData,
  ErrorResponseData
} from "../types";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import { EnvironmentCreated } from "./EnvironmentCreated";
import { EnvironmentNameStep } from "./EnvironmentNameStep";
import { EnvironmentTypeStep } from "./EnvironmentTypeStep";
import { ErrorsPanel } from "./ErrorsPanel";
import type { ErrorData } from "./ErrorsPanel/types";
import { RegisterStep } from "./RegisterStep";
import * as s from "./styles";
import type {
  CreateEnvironmentWizardProps,
  EnvironmentDraft,
  ErrorDefinitions,
  StepDefinitions
} from "./types";

const ENVIRONMENT_NAME_STEP = "environment name";
const ENVIRONMENT_TYPE_STEP = "environment type";
const REGISTER_STEP = "register";

export const CreateEnvironmentWizard = ({
  onClose
}: CreateEnvironmentWizardProps) => {
  const config = useContext(ConfigContext);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [newEnvironment, setNewEnvironment] = useState<EnvironmentDraft>({
    name: "",
    type: null,
    id: ""
  });
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [stepsStatus, setStepsStatus] = useState<StepDefinitions[]>([
    {
      key: ENVIRONMENT_NAME_STEP,
      name: "Environment Name",
      status: "not-completed",
      errors: {
        ExistingEnvironmentName: "Incorrect name"
      }
    },
    {
      key: REGISTER_STEP,
      name: "Register",
      status: "not-completed",
      errors: {},
      isHidden:
        Boolean(config.userRegistrationEmail) || config.backendInfo?.centralize
    },
    {
      key: ENVIRONMENT_TYPE_STEP,
      name: "Environment Type",
      status: "not-completed",
      errors: {}
    }
  ]);

  useEffect(() => {
    const getFailedSteps = (result: EnvironmentCreatedData) => {
      return stepsStatus.filter((x) =>
        result.errors?.find((e) => x.errors?.[e.errorCode])
      );
    };

    const markFailedSteps = (steps: StepDefinitions[]) => {
      setStepsStatus(
        stepsStatus.map((step) => {
          if (steps.find((x) => x.key === step.key)) {
            return { ...step, status: "error" };
          }
          return { ...step };
        })
      );
    };

    const showErrors = (
      steps: StepDefinitions[],
      errors: ErrorResponseData[]
    ) => {
      const errorsDetails: ErrorDefinitions = steps.reduce(
        (errorsMap, step) => {
          return { ...errorsMap, ...step.errors };
        },
        {}
      );

      setErrors(
        errors.map((x) => ({
          id: uuidv4(),
          title: errorsDetails[x.errorCode] || x.errorCode,
          description: x.errorDescription
        }))
      );
    };

    const handleEnvironmentCreated = (data: unknown) => {
      const result = data as EnvironmentCreatedData;
      if (!result.errors) {
        setCompleted(true);
        setCurrentStep(-1);
        setNewEnvironment({ ...newEnvironment, id: result.id });
        return;
      }

      sendTrackingEvent(trackingEvents.FAILED_TO_CREATE_ENVIRONMENT, {
        errors: result.errors
      });

      const failedSteps = getFailedSteps(result);
      markFailedSteps(failedSteps);
      showErrors(failedSteps, result.errors);
    };

    dispatcher.addActionListener(
      actions.SET_CREATE_ENVIRONMENT_RESULT,
      handleEnvironmentCreated
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CREATE_ENVIRONMENT_RESULT,
        handleEnvironmentCreated
      );
    };
  }, [stepsStatus, newEnvironment]);

  const getSteps = () => stepsStatus.filter((x) => !x.isHidden);

  const goToNextStep = (isFinished?: boolean) => {
    const step = getSteps()[currentStep];
    step.status = "completed";
    step.isFinished = isFinished;
    setStepsStatus(stepsStatus);

    if (currentStep === getSteps().length - 1) {
      setErrors([]);
      window.sendMessageToDigma<CreateEnvironmentPayload>({
        action: actions.CREATE_ENVIRONMENT,
        payload: {
          environment: newEnvironment.name,
          type: newEnvironment.type
        }
      });

      sendUserActionTrackingEvent(
        trackingEvents.CREATE_NEW_ENVIRONMENT_FORM_SUBMITTED
      );
      return;
    }

    let nextStep = currentStep + 1;
    while (nextStep <= stepsStatus.length) {
      if (!stepsStatus[nextStep]?.isFinished) {
        break;
      }
      nextStep += 1;
    }

    setCurrentStep(nextStep);
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const getBackStep = () => {
    let nextStep = currentStep - 1;
    while (nextStep >= 0) {
      if (!stepsStatus[nextStep]?.isFinished) {
        return nextStep;
      }

      nextStep -= 1;
    }
    return nextStep;
  };

  const getStepVisibility = (key: string) => {
    const stepIndex = getSteps().findIndex((x) => x.key === key);
    return stepIndex === currentStep;
  };

  const handleGoBack = () => {
    const nextStep = getBackStep();
    if (nextStep === -1) {
      return;
    }
    handleGoToStep(nextStep);
  };

  const handleCancel = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CANCEL_BUTTON_CLICKED_ON_ENVIRONMENT_CREATION_WIZARD
    );
    onClose(null);
  };

  const handleGoToEnvironment = () => {
    onClose(newEnvironment.id);
  };

  return (
    <s.Container>
      <CreateEnvironmentPanel
        backDisabled={currentStep === 0 || getBackStep() === -1 || completed}
        onBack={handleGoBack}
        onCancel={handleCancel}
        cancelDisabled={completed}
        tabs={getSteps().map((step, index) => ({
          name: step.name,
          index: index + 1,
          state: index === currentStep ? "active" : step.status
        }))}
      />
      <s.StepContainer>
        <s.StepBackground />
        <RecentActivityContainerBackgroundGradient />
        {!completed ? (
          <>
            <s.Step
              key={ENVIRONMENT_NAME_STEP}
              $isVisible={getStepVisibility(ENVIRONMENT_NAME_STEP)}
            >
              <EnvironmentNameStep
                onNext={goToNextStep}
                isInvalid={
                  stepsStatus.find((x) => x.key === ENVIRONMENT_NAME_STEP)
                    ?.status === "error"
                }
                onNameChange={(value) =>
                  setNewEnvironment({ ...newEnvironment, name: value })
                }
              />
            </s.Step>
            <s.Step
              key={REGISTER_STEP}
              $isVisible={getStepVisibility(REGISTER_STEP)}
            >
              <RegisterStep onNext={goToNextStep} />
            </s.Step>
            <s.Step
              key={ENVIRONMENT_TYPE_STEP}
              $isVisible={getStepVisibility(ENVIRONMENT_TYPE_STEP)}
            >
              <EnvironmentTypeStep
                handleEnvironmentTypeSelect={(type) => {
                  newEnvironment.type = type;
                  setNewEnvironment(newEnvironment);
                }}
                onNext={goToNextStep}
              />
            </s.Step>
          </>
        ) : (
          <s.Step key={"finish"} $isVisible={completed}>
            <EnvironmentCreated goToEnvironment={handleGoToEnvironment} />
          </s.Step>
        )}
        {errors.length > 0 && <ErrorsPanel errors={errors} />}
      </s.StepContainer>
    </s.Container>
  );
};
