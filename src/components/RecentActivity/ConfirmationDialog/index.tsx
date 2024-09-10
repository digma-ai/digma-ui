import { useEffect, useRef } from "react";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { NewButton } from "../../common/v3/NewButton";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { ConfirmationDialogProps } from "./types";

export const ConfirmationDialog = ({
  title,
  content,
  confirmButtonText = "Confirm",
  onConfirm,
  onCancel,
  trackingData
}: ConfirmationDialogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleConfirmButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CONFIRMATION_DIALOG_CONFIRM_BUTTON_CLICKED,
      trackingData
    );
    onConfirm();
  };

  const handleCancelButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CONFIRMATION_DIALOG_CANCEL_BUTTON_CLICKED,
      trackingData
    );
    onCancel();
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CONFIRMATION_DIALOG_CLOSE_BUTTON_CLICKED,
      trackingData
    );
    onCancel();
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <s.Container ref={containerRef} tabIndex={0}>
      <s.Header>
        <s.Title>{title}</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={12} />
        </s.CloseButton>
      </s.Header>
      {isString(content) ? (
        <s.MessageContainer>{content}</s.MessageContainer>
      ) : (
        content
      )}
      <s.ButtonsContainer>
        <NewButton
          buttonType={"secondary"}
          onClick={handleCancelButtonClick}
          label="Cancel"
        />
        <NewButton
          onClick={handleConfirmButtonClick}
          label={confirmButtonText}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
