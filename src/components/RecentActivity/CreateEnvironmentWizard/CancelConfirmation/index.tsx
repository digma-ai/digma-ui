import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { Button } from "../../../common/v3/Button";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { DeleteEnvironmentConfirmationProps } from "./types";

export const CancelConfirmation = ({
  onCancel,
  onClose
}: DeleteEnvironmentConfirmationProps) => {
  const handleConfirmButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CONFIRM_CLICKED
    );
    onCancel();
  };

  const handleCancelButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CANCEL_CLICKED
    );
    onClose();
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.CREATE_ENVIRONMENT_CANCEL_CONFIRMATION_CLOSE_CLICKED
    );
    onClose();
  };

  return (
    <s.Container>
      <s.Header>
        <s.Title>Discard adding a new Environment?</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={12} />
        </s.CloseButton>
      </s.Header>
      <s.Description>
        Are you sure that you want to stop adding new environment?
      </s.Description>
      <s.ButtonsContainer>
        <Button
          buttonType={"primary"}
          label={"No, continue"}
          onClick={handleCancelButtonClick}
        />
        <s.CancelButton
          buttonType={"secondary"}
          label={"Yes, cancel"}
          onClick={handleConfirmButtonClick}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
