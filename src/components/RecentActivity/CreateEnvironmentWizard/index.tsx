import { useState } from "react";
import { Step } from "../../InstallationWizard/Step";
import { StepData, StepStatus } from "../../InstallationWizard/Step/types";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { Button } from "../../common/v3/Button";
import { CreateEnvironmentPanel } from "./CreateEnvironmentPanel";
import * as s from "./styles";

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

export const CreateEnvironmentWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(firstStep);

  // const goToNextStep = () => {
  //   setCurrentStep(currentStep + 1);
  // };

  const handleGoToStep = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const steps: StepData[] = [
    {
      key: "environment name",
      title: "Environment Name",
      content: <s.EnvironmentStep></s.EnvironmentStep>
    }
  ];

  return (
    <s.Container>
      <CreateEnvironmentPanel
        onCancel={() => {
          // console.log("test");
        }}
        tabs={steps.map((step, index) => ({
          index,
          name: step.title,
          state: getStepStatus(index, currentStep)
        }))}
      />
      <Button
        buttonType={"tertiary"}
        label={"Back"}
        icon={(props) => <ChevronIcon {...props} direction={Direction.LEFT} />}
      />
      <>
        {steps.map((step, i) => (
          <Step
            key={step.key}
            onGoToStep={handleGoToStep}
            data={step}
            stepIndex={i}
            status={getStepStatus(i, currentStep)}
          />
        ))}
      </>
    </s.Container>
  );
};
