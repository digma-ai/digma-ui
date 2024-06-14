import { useEffect, useRef } from "react";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { Button } from "../../common/Button";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { ConfirmationDialogProps } from "./types";

export const ConfirmationDialog = ({
  title,
  message,
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
      {isString(message) && <span>{message}</span>}
      <s.ButtonsContainer>
        <Button buttonType={"secondary"} onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        <Button onClick={handleConfirmButtonClick}>{confirmButtonText}</Button>
      </s.ButtonsContainer>
    </s.Container>
  );
};
