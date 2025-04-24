import { NewButton } from "../../../../common/v3/NewButton";
import * as s from "../../../../RecentActivity/CreateEnvironmentWizard/FinishStep/styles";
import type { FinishScreenContentProps } from "./types";

export const FinishScreenContent = ({
  onGoToDashboard,
  environment
}: FinishScreenContentProps) => {
  const handleBackToDashboardButtonClick = () => {
    onGoToDashboard(environment?.id ?? null);
  };

  return (
    <>
      <s.Info>
        <s.Title>Environment Created</s.Title>
        <s.Description>
          Your {(environment?.type ?? "").toLocaleLowerCase()} environment is
          successfully created.
        </s.Description>
      </s.Info>
      <NewButton
        buttonType={"primary"}
        label={"Back to dashboard"}
        onClick={handleBackToDashboardButtonClick}
      />
    </>
  );
};
