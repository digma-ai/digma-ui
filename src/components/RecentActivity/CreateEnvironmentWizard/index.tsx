import { useContext, useState } from "react";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EnvironmentV2 } from "../types";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import { EnvironmentCreated } from "./EnvironmentCreated";
import { EnvironmentNameStep } from "./EnvironmentNameStep";
import { EnvironmentTypeStep } from "./EnvironmentTypeStep";
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
  const [environment, setEnvironment] = useState<EnvironmentV2>({
    name: "",
    type: null
  });
  const [completed, setCompleted] = useState(false);
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

  const getSteps = () => stepsStatus.filter((x) => !x.isHidden);

  const goToNextStep = (isFinished?: boolean) => {
    if (currentStep === getSteps().length - 1) {
      setCompleted(true);
    }

    const step = getSteps()[currentStep];
    step.status = "completed";
    step.isFinished = isFinished;
    setStepsStatus(stepsStatus);

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
                  setEnvironment({ ...environment, name: value })
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
                environment={environment}
                handleEnvironmentTypeSelect={(type) =>
                  setEnvironment({ ...environment, type: type })
                }
                onNext={goToNextStep}
              />
            </s.Step>
          </>
        ) : (
          <s.Step key="finish" $isVisible={completed}>
            <EnvironmentCreated
              goToEnvironment={() => {
                onClose(environment.name);
              }}
            />
          </s.Step>
        )}
      </s.StepContainer>
    </s.Container>
  );
};
