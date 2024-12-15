import { useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { CrossIcon } from "../icons/CrossIcon";
import { NewButton } from "../v3/NewButton";
import { Spinner } from "../v3/Spinner";
import * as s from "./styles";
import type { DismissPanelProps } from "./types";

export const DismissPanel = ({
  state,
  onShow,
  onDismiss,
  confirmationMessage,
  className
}: DismissPanelProps) => {
  const [isDismissConfirmationOpened, setDismissConfirmationOpened] =
    useState(false);
  const previousState = usePrevious(state);

  const handleDismissClick = () => {
    setDismissConfirmationOpened(true);
  };

  const handleConfirmationAgreed = () => {
    setDismissConfirmationOpened(false);
    onDismiss();
  };

  const handleConfirmationDiscard = () => {
    setDismissConfirmationOpened(false);
  };

  return (
    <>
      {!isDismissConfirmationOpened ? (
        <s.ButtonContainer className={className}>
          {state === "dismissed" && (
            <NewButton
              label={"Show"}
              buttonType={"secondaryBorderless"}
              onClick={onShow}
            />
          )}
          {state === "visible" && (
            <NewButton
              icon={CrossIcon}
              label={"Dismiss"}
              buttonType={"secondaryBorderless"}
              onClick={handleDismissClick}
            />
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
