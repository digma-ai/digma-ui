import { type ChangeEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../../../../common/v3/NewButton";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { ServerStepProps } from "./types";

export const ServerStep = ({
  onConnect,
  connectionSettings,
  onConnectionSettingsChange
}: ServerStepProps) => {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onConnectionSettingsChange(e.target.value);
  };

  const handleConnectButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CONNECT_BUTTON_CLICKED
    );
    onConnect(connectionSettings);
  };

  const isConnectButtonEnabled = connectionSettings.trim().length > 0;

  return (
    <s.Container>
      <s.TextArea value={connectionSettings} onChange={handleTextAreaChange} />
      <s.Footer>
        <NewButton
          label={"Connect"}
          onClick={handleConnectButtonClick}
          isDisabled={!isConnectButtonEnabled}
        />
      </s.Footer>
    </s.Container>
  );
};
