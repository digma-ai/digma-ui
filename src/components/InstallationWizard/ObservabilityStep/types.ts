export interface ObservabilityStepProps {
  isAlreadyUsingOtel: boolean;
  isObservabilityEnabled: boolean;
  onGoToNextStep: () => void;
  onIsAlreadyUsingOtelChange: (value: boolean) => void;
  onObservabilityChange: (value: boolean) => void;
}
