import { useState, type ChangeEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { NewButton } from "../../../common/v3/NewButton";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { AddMCPServerDialogProps } from "./types";

export const AddMCPServerDialog = ({
  onClose,
  onConnect
}: AddMCPServerDialogProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleConnectButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CONNECT_BUTTON_CLICKED
    );
    onConnect(textAreaValue);
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
          Wizard
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} />
          </s.CloseButton>
        </s.Header>
      </s.Header>
      <s.TextArea value={textAreaValue} onChange={handleTextAreaChange} />
      <s.Footer>
        <NewButton label={"Connect"} onClick={handleConnectButtonClick} />
      </s.Footer>
    </s.Container>
  );
};
