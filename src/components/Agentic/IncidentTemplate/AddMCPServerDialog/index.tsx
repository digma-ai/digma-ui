import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { trackingEvents } from "../../tracking";
import { ServerStep } from "./ServerStep";
import * as s from "./styles";
import { ToolsStep } from "./ToolsStep";
import type { AddMCPServerDialogProps } from "./types";

export const AddMCPServerDialog = ({
  onClose,
  onComplete
}: AddMCPServerDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [connectionSettings, setConnectionSettings] = useState("");

  const handleServerStepConnectionSettingsChange = (settings: string) => {
    setConnectionSettings(settings);
  };

  const handleServerStepConnect = (settings: string) => {
    setConnectionSettings(settings);
    setCurrentStep((prev) => prev + 1);
  };

  const handleToolsStepSave = (tools: string[], instructions: string) => {
    onComplete(connectionSettings, tools, instructions);
  };

  const handleToolsStepCancel = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <ServerStep
      key={"server"}
      onConnect={handleServerStepConnect}
      connectionSettings={connectionSettings}
      onConnectionSettingsChange={handleServerStepConnectionSettingsChange}
    />,
    <ToolsStep
      key={"tools"}
      onCancel={handleToolsStepCancel}
      onSave={handleToolsStepSave}
    />
  ];

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
      {steps[currentStep]}
    </s.Container>
  );
};
