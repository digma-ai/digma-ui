import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useMemo, useState } from "react";
import {
  useAddIncidentAgentMCPServerMutation,
  useTestIncidentAgentMCPServerMutation,
  useUpdateIncidentAgentMCPServerMutation
} from "../../../../redux/services/digma";
import type { AddMCPServerPayload } from "../../../../redux/services/types";
import { isObject } from "../../../../typeGuards/isObject";
import { isString } from "../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Dialog } from "../../common/Dialog";
import { trackingEvents } from "../../tracking";
import { ServerStep } from "./ServerStep";
import { ToolsStep } from "./ToolsStep";
import type { MCPServerDialogProps } from "./types";

export const MCPServerDialog = ({
  agentId,
  serverData,
  onClose,
  onComplete
}: MCPServerDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [connectionSettings, setConnectionSettings] = useState(
    serverData?.config ?? ""
  );
  const [testServerError, setTestServerError] = useState<string>();
  const [addServerError, setAddServerError] = useState<string>();

  const [testMCPServer, testMCPServerResult] =
    useTestIncidentAgentMCPServerMutation();
  const [addMCPServer, addMCPServerResult] =
    useAddIncidentAgentMCPServerMutation();
  const [updateMCPServer, updateMCPServerResult] =
    useUpdateIncidentAgentMCPServerMutation();

  const handleServerStepConnectionSettingsChange = (settings: string) => {
    setConnectionSettings(settings);
  };

  const handleServerStepConnect = (settings: string) => {
    setTestServerError(undefined);

    void testMCPServer({
      config_json: settings
    })
      .unwrap()
      .then(() => {
        setCurrentStep((prev) => prev + 1);
      })
      .catch((error: FetchBaseQueryError) => {
        setTestServerError(`Failed to test MCP server: ${String(error.data)}`);
      });
  };

  const handleToolsStepSave = (tools: string[], instructions: string) => {
    setAddServerError(undefined);

    const payload: AddMCPServerPayload = {
      agent: agentId,
      config_json: connectionSettings,
      selected_tools: tools,
      instructions_prompt: instructions
    };

    if (!serverData?.uid) {
      // Add new MCP server
      void addMCPServer(payload)
        .unwrap()
        .then(() => {
          onComplete();
        })
        .catch((error: FetchBaseQueryError) => {
          const errorPrefix = "Failed to add MCP server";

          let errorDetails = "";
          if (isString(error.data)) {
            errorDetails = error.data;
          }

          if (isObject(error.data) && isString(error.data.detail)) {
            errorDetails = error.data.detail;
          }

          setAddServerError(
            [errorPrefix, errorDetails].filter(Boolean).join(": ")
          );
        });
    } else {
      // Update existing MCP server
      void updateMCPServer({
        id: serverData.uid,
        data: payload
      })
        .unwrap()
        .then(() => {
          onComplete();
        })
        .catch((error: FetchBaseQueryError) => {
          const errorPrefix = "Failed to add MCP server";

          let errorDetails = "";
          if (isString(error.data)) {
            errorDetails = error.data;
          }

          if (isObject(error.data) && isString(error.data.detail)) {
            errorDetails = error.data.detail;
          }

          setAddServerError(
            [errorPrefix, errorDetails].filter(Boolean).join(": ")
          );
        });
    }
  };

  const handleToolsStepCancel = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const tools = useMemo(
    () => testMCPServerResult.data?.tools ?? [],
    [testMCPServerResult.data]
  );

  const steps = [
    <ServerStep
      key={"server"}
      onConnect={handleServerStepConnect}
      connectionSettings={connectionSettings}
      onConnectionSettingsChange={handleServerStepConnectionSettingsChange}
      isLoading={testMCPServerResult.isLoading}
      error={testServerError}
    />,
    <ToolsStep
      key={"tools"}
      onCancel={handleToolsStepCancel}
      onSave={handleToolsStepSave}
      tools={tools}
      selectedTools={serverData?.selected_tools}
      isLoading={
        addMCPServerResult.isLoading || updateMCPServerResult.isLoading
      }
      error={addServerError}
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
