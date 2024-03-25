import { useState } from "react";
import { StepData, StepStatus } from "../../InstallationWizard/Step/types";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { Button } from "../../common/v3/Button";
import { EnvironmentV2 } from "../types";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import { EnvironmentNameStep } from "./EnvironmentNameStep";
import { EnvironmentTypeStep } from "./EnvironmentTypeStep";
import * as s from "./styles";

const getStepStatus = (index: number, currentStep: number): StepStatus => {
  if (index < currentStep) {
    return "completed";
  }

  if (index === currentStep) {
    return "active";
  }

  return "not-completed";
};

export const CreateEnvironmentWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [environment, setEnvironment] = useState<EnvironmentV2>({
    name: "",
    type: null
  });

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const steps: StepData[] = [
    {
      key: "environment name",
      title: "Environment Name",
      content: (
        <EnvironmentNameStep
          onNext={goToNextStep}
          onNameChange={(value) =>
            setEnvironment({ ...environment, name: value })
          }
        />
      )
    },
    {
      key: "environment type",
      title: "Environment Type",
      content: (
        <EnvironmentTypeStep
          environment={environment}
          handleEnvironmentTypeSelect={(type) =>
            setEnvironment({ ...environment, type: type })
          }
        />
      )
    }
  ];

  return (
    <s.Container>
      <CreateEnvironmentPanel
        onCancel={() => {
          // console.log("test");
        }}
        tabs={steps.map((step, index) => ({
          index: index + 1,
          name: step.title,
          state: getStepStatus(index, currentStep)
        }))}
      />
      <s.StepContainer>
        <Button
          buttonType={"tertiary"}
          label={"Back"}
          isDisabled={currentStep === 0}
          onClick={() => {
            handleGoToStep(currentStep - 1);
          }}
          icon={(props) => (
            <ChevronIcon {...props} direction={Direction.LEFT} />
          )}
        />
        <s.Step>{steps[currentStep].content}</s.Step>
      </s.StepContainer>
    </s.Container>
  );
};
