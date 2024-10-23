import { forwardRef, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { CrossIcon } from "../icons/CrossIcon";
import { NewButton } from "../v3/NewButton";
import { Spinner } from "../v3/Spinner";
import * as s from "./styles";
import { DismissPanelProps } from "./types";

const DismissPanelComponent = ({
  state,
  onShow,
  onDismiss,
  message: confirmationMessage
}: DismissPanelProps) => {
  const [isDismissConfirmationOpened, setDismissConfirmationOpened] =
    useState(false);
  const previousState = usePrevious(state);

  return (
    <>
      {!isDismissConfirmationOpened ? (
        <s.ButtonContainer>
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
              onClick={() => setDismissConfirmationOpened(true)}
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
            <NewButton
              label={"No"}
              onClick={() => setDismissConfirmationOpened(false)}
            />
            <NewButton
              label={"Yes, dismiss"}
              buttonType={"secondary"}
              onClick={() => {
                setDismissConfirmationOpened(false);
                onDismiss();
              }}
            />
          </s.DismissDialogActions>
        </s.DismissDialog>
      )}
    </>
  );
};

export const DismissPanel = forwardRef(DismissPanelComponent);
