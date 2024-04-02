import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Environment } from "../../common/App/types";
import { actions } from "../actions";
import { sendUserActionEvent, trackingEvents } from "../tracking";
import {
  CreateEnvironmentPayload,
  EnvironmentCreatedData,
  ErrorResponseData
} from "../types";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import { EnvironmentCreated } from "./EnvironmentCreated";
import { EnvironmentNameStep } from "./EnvironmentNameStep";
import { EnvironmentTypeStep } from "./EnvironmentTypeStep";
import { ErrorsPanel } from "./ErrorsPanel";
import { ErrorData } from "./ErrorsPanel/types";
import { RegisterStep } from "./RegisterStep";
import * as s from "./styles";
import {
  CreateEnvironmentWizardProps,
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
  const [newEnvironment, setNewEnvironment] = useState<Environment>({
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
      isHidden: !!config.userRegistrationEmail
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
        result.errors?.find((e) => x.errors && x.errors[e.errorCode])
      );
    };

    const markFailedSteps = (steps: StepDefinitions[]) => {
      steps.forEach((step) => (step.status = "error"));
      setStepsStatus(stepsStatus);
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
          title: errorsDetails[x.errorCode] || x.errorCode,
          description: x.errorDescription
        }))
      );
    };

    const handleEnvironmentCreated = (data: unknown) => {
      const result = data as EnvironmentCreatedData;
      if (!result.errors) {
        setCompleted(true);
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
      actions.ENVIRONMENT_CREATED,
      handleEnvironmentCreated
    );

    return () => {
      dispatcher.removeActionListener(
        actions.ENVIRONMENT_CREATED,
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

      sendTrackingEvent(trackingEvents.CREATE_NEW_ENVIRONMENT_FORM_SUBMITTED);
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
    const stepIndex = getSteps().findIndex((x) => x.key == key);

    if (stepIndex === currentStep) {
      return true;
    }

    return false;
  };

  return (
    <s.Container>
      <CreateEnvironmentPanel
        backDisabled={currentStep === 0 || getBackStep() === -1 || completed}
        onBack={() => {
          const nextStep = getBackStep();
          if (nextStep === -1) {
            return;
          }
          handleGoToStep(nextStep);
        }}
        onCancel={() => {
          sendUserActionEvent(
            trackingEvents.CANCEL_BUTTON_CLICKED_ON_ENVIRONMENT_CREATION_WIZARD
          );
          onClose(null);
        }}
        cancelDisabled={completed}
        tabs={getSteps().map((step, index) => ({
          name: step.name,
          index: index + 1,
          state: index === currentStep ? "active" : step.status
        }))}
      />
      <s.StepContainer>
        <s.StepBackground />
        <s.RecentActivityContainerBackgroundGradient />
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
          <s.Step key="finish" $isVisible={completed}>
            <EnvironmentCreated
              goToEnvironment={() => {
                onClose(newEnvironment.id);
              }}
            />
          </s.Step>
        )}
        {!!errors.length && <ErrorsPanel errors={errors} />}
      </s.StepContainer>
    </s.Container>
  );
};
