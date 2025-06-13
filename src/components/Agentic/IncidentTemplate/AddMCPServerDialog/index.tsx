import { useState } from "react";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Dialog } from "../../common/Dialog";
import { trackingEvents } from "../../tracking";
import { ServerStep } from "./ServerStep";
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

  const handleDialogClose = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_ADD_MCP_DIALOG_CLOSED
    );
    onClose();
  };

  return (
    <Dialog title={"Wizard"} onClose={handleDialogClose}>
      {steps[currentStep]}
    </Dialog>
  );
};
