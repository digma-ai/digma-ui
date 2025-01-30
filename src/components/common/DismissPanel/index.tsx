import { useState } from "react";
import { NOT_SUPPORTED_IN_SANDBOX_MODE_MESSAGE } from "../../../constants";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { CrossIcon } from "../icons/CrossIcon";
import { NewButton } from "../v3/NewButton";
import { Spinner } from "../v3/Spinner";
import { Tooltip } from "../v3/Tooltip";
import * as s from "./styles";
import type { DismissPanelProps } from "./types";

export const DismissPanel = ({
  state,
  onShow,
  onDismiss,
  confirmationMessage,
  className
}: DismissPanelProps) => {
  const { isSandboxModeEnabled } = useConfigSelector();
  const [isDismissSandBoxTooltipVisible, setIsDismissSandBoxTooltipVisible] =
    useState(false);
  const [isShowSandBoxTooltipVisible, setIsShowSandBoxTooltipVisible] =
    useState(false);
  const [isDismissConfirmationOpened, setDismissConfirmationOpened] =
    useState(false);
  const previousState = usePrevious(state);

  const handleDismissClick = () => {
    if (isSandboxModeEnabled) {
      setIsDismissSandBoxTooltipVisible(true);
      return;
    }

    setDismissConfirmationOpened(true);
  };

  const handleShowClick = () => {
    if (isSandboxModeEnabled) {
      setIsDismissSandBoxTooltipVisible(true);
      return;
    }

    onShow();
  };

  const handleConfirmationAgreed = () => {
    setDismissConfirmationOpened(false);
    onDismiss();
  };

  const handleConfirmationDiscard = () => {
    setDismissConfirmationOpened(false);
  };

  const handleDismissButtonTooltipDismiss = () => {
    setIsDismissSandBoxTooltipVisible(false);
  };

  const handleShowButtonTooltipDismiss = () => {
    setIsShowSandBoxTooltipVisible(false);
  };

  return (
    <>
      {!isDismissConfirmationOpened ? (
        <s.ButtonContainer className={className}>
          {state === "dismissed" && (
            <Tooltip
              title={NOT_SUPPORTED_IN_SANDBOX_MODE_MESSAGE}
              isOpen={isShowSandBoxTooltipVisible}
              onDismiss={handleShowButtonTooltipDismiss}
            >
              <NewButton
                label={"Show"}
                buttonType={"secondaryBorderless"}
                onClick={handleShowClick}
              />
            </Tooltip>
          )}
          {state === "visible" && (
            <Tooltip
              title={NOT_SUPPORTED_IN_SANDBOX_MODE_MESSAGE}
              isOpen={isDismissSandBoxTooltipVisible}
              onDismiss={handleDismissButtonTooltipDismiss}
            >
              <NewButton
                icon={CrossIcon}
                label={"Dismiss"}
                buttonType={"secondaryBorderless"}
                onClick={handleDismissClick}
              />
            </Tooltip>
          )}
          {state === "in-progress" && (
            <>
              <NewButton
                label={previousState === "dismissed" ? "Showing" : "Dismissing"}
                buttonType={"secondaryBorderless"}
                isDisabled={true}
              />
              <Spinner />
            </>
          )}
        </s.ButtonContainer>
      ) : (
        <s.DismissDialog>
          {confirmationMessage}
          <s.DismissDialogActions>
            <NewButton label={"No"} onClick={handleConfirmationDiscard} />
            <NewButton
              label={"Yes, dismiss"}
              buttonType={"secondary"}
              onClick={handleConfirmationAgreed}
            />
          </s.DismissDialogActions>
        </s.DismissDialog>
      )}
    </>
  );
};
