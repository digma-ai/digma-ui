import { useState, type ChangeEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { NewButton } from "../../../common/v3/NewButton";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { AddMCPServerDialogProps } from "./types";

export const AddMCPServerDialog = ({
  onClose,
  onSave
}: AddMCPServerDialogProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleSaveButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_SAVE_BUTTON_CLICKED
    );
    onSave(textAreaValue);
    onClose();
  };

  const handleCancelButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CANCEL_BUTTON_CLICKED
    );
    onClose();
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CLOSE_BUTTON_CLICKED
    );
    onClose();
  };

  return (
    <s.Container>
      <s.Header>
        <s.Header>
          Edit JSON
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} />
          </s.CloseButton>
        </s.Header>
      </s.Header>
      <s.TextArea value={textAreaValue} onChange={handleTextAreaChange} />
      <s.Footer>
        <NewButton
          buttonType={"secondary"}
          label={"Cancel"}
          onClick={handleCancelButtonClick}
        />
        <NewButton label={"Save"} onClick={handleSaveButtonClick} />
      </s.Footer>
    </s.Container>
  );
};
