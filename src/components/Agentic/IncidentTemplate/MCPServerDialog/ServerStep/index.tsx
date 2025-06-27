import { type ChangeEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../../../../common/v3/NewButton";
import { trackingEvents } from "../../../tracking";
import { Footer } from "../Footer";
import * as s from "./styles";
import type { ServerStepProps } from "./types";

const placeholderText = JSON.stringify(
  {
    weather: {
      transport: "stdio",
      command: "npx",
      args: ["-y", "@h1deya/mcp-server-weather"]
    }
  },
  null,
  2
);

export const ServerStep = ({
  onConnect,
  connectionSettings,
  onConnectionSettingsChange,
  isLoading,
  error
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

  const isConnectButtonEnabled =
    connectionSettings.trim().length > 0 && !isLoading;

  return (
    <s.Container>
      <s.TextArea
        value={connectionSettings}
        placeholder={placeholderText}
        onChange={handleTextAreaChange}
      />
      <Footer
        isLoading={isLoading}
        errorMessage={error}
        loadingMessage={"Connecting..."}
        buttons={
          <NewButton
            label={"Connect"}
            onClick={handleConnectButtonClick}
            isDisabled={!isConnectButtonEnabled}
          />
        }
      />
    </s.Container>
  );
};
