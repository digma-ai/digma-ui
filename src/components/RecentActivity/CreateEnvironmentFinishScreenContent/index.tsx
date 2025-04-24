import { NewButton } from "../../common/v3/NewButton";
import * as s from "../CreateEnvironmentWizard/FinishStep/styles";
import type { FinishScreenContentProps } from "./types";

export const CreateEnvironmentFinishScreenContent = ({
  onOpenEnvironment,
  environment
}: FinishScreenContentProps) => {
  const handleOpenEnvironmentButtonClick = () => {
    if (!environment) {
      return;
    }

    onOpenEnvironment(environment.id);
  };

  return (
    <>
      <s.Info>
        <s.Title>Environment Created</s.Title>
        <s.Description>
          Your {(environment?.type ?? "").toLocaleLowerCase()} environment is
          successfully created. Next - setup your environment.
        </s.Description>
      </s.Info>
      {environment && (
        <NewButton
          buttonType={"primary"}
          label={"Open Environment"}
          onClick={handleOpenEnvironmentButtonClick}
        />
      )}
    </>
  );
};
