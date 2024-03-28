import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { ConfigContext } from "../../common/App/ConfigContext";
import { actions } from "../actions";
import { CreateEnvironmentPayload, EnvironmentCreatedData } from "../types";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import { EnvironmentCreated } from "./EnvironmentCreated";
import { EnvironmentNameStep } from "./EnvironmentNameStep";
import { EnvironmentTypeStep } from "./EnvironmentTypeStep";
import { ErrorsPanel } from "./ErrorsPanel";
import { ErrorData } from "./ErrorsPanel/types";
import { RegisterStep } from "./RegisterStep";
import * as s from "./styles";
import { CreateEnvironmentWizardProps, StepDefinitions } from "./types";

const ENVIRONMENT_NAME_STEP = "environment name";
const ENVIRONMENT_TYPE_STEP = "environment type";
const REGISTER_STEP = "register";

export const CreateEnvironmentWizard = ({
  onClose
}: CreateEnvironmentWizardProps) => {
  const config = useContext(ConfigContext);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [newEnvironment, setNewEnvironment] =
    useState<CreateEnvironmentPayload>({
      environment: "",
      type: null
    });
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<ErrorData[]>([
    { description: "blabla", title: "again" }
  ]);
  const [stepsStatus, setStepsStatus] = useState<StepDefinitions[]>([
    {
      key: ENVIRONMENT_NAME_STEP,
      name: "Environment Name",
      status: "not-completed"
    },
    {
      key: REGISTER_STEP,
      name: "Register",
      status: "not-completed",
      isHidden: !!config.userRegistrationEmail
    },
    {
      key: ENVIRONMENT_TYPE_STEP,
      name: "Environment Type",
      status: "not-completed"
    }
  ]);

  useEffect(() => {
    const handleEnvironmentCreated = (data: unknown) => {
      const result = data as EnvironmentCreatedData;
      if (!result.errorCode) {
        setCompleted(true);
        return;
      }

      errors.push({
        title: result.errorCode,
        description: result.errorDescription
      });
      setErrors(errors);
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
  }, []);

  const getSteps = () => stepsStatus.filter((x) => !x.isHidden);

  const goToNextStep = (isFinished?: boolean) => {
    const step = getSteps()[currentStep];
    step.status = "completed";
    step.isFinished = isFinished;
    setStepsStatus(stepsStatus);

    if (currentStep === getSteps().length - 1) {
      window.sendMessageToDigma<CreateEnvironmentPayload>({
        action: actions.CREATE_ENVIRONMENT,
        payload: newEnvironment
      });

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
          onClose(null);
        }}
        cancelDisabled={completed}
        tabs={getSteps().map((step, index) => ({
          ...step,
          index: index + 1,
          state: index === currentStep ? "active" : step.status
        }))}
      />
      <s.StepContainer>
        {!completed ? (
          <>
            <s.Step
              key={ENVIRONMENT_NAME_STEP}
              $isVisible={getStepVisibility(ENVIRONMENT_NAME_STEP)}
            >
              <EnvironmentNameStep
                onNext={goToNextStep}
                onNameChange={(value) =>
                  setNewEnvironment({ ...newEnvironment, environment: value })
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
                onClose(newEnvironment.environment);
              }}
            />
          </s.Step>
        )}
        {!!errors.length && <ErrorsPanel errors={errors} />}
      </s.StepContainer>
    </s.Container>
  );
};
