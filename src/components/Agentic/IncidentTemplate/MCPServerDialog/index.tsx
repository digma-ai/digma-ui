import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useMemo, useState } from "react";
import {
  useAddIncidentAgentMCPServerMutation,
  useTestIncidentAgentMCPServerMutation,
  useUpdateIncidentAgentMCPServerMutation
} from "../../../../redux/services/digma";
import { isObject } from "../../../../typeGuards/isObject";
import { isString } from "../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Dialog } from "../../common/Dialog";
import { trackingEvents } from "../../tracking";
import { ServerStep } from "./ServerStep";
import { ToolsStep } from "./ToolsStep";
import type { MCPServerDialogProps } from "./types";

const formatErrorMessage = (error: FetchBaseQueryError, prefix: string) => {
  let errorDetails = "";

  if (isString(error.data)) {
    errorDetails = error.data;
  }

  if (isObject(error.data) && isString(error.data.detail)) {
    errorDetails = error.data.detail;
  }

  return [prefix, errorDetails].filter(Boolean).join(": ");
};

export const MCPServerDialog = ({
  agentId,
  serverData,
  onClose,
  onComplete
}: MCPServerDialogProps) => {
  const isEditMode = Boolean(serverData);
  const [currentStep, setCurrentStep] = useState(isEditMode ? 1 : 0);
  const [connectionSettings, setConnectionSettings] = useState("");
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

    try {
      JSON.parse(settings);
    } catch {
      setTestServerError("Invalid JSON");
      return;
    }

    void testMCPServer({
      config_json: settings
    })
      .unwrap()
      .then(() => {
        setCurrentStep((prev) => prev + 1);
      })
      .catch((error: FetchBaseQueryError) => {
        setTestServerError(
          formatErrorMessage(error, "Failed to test MCP server")
        );
      });
  };

  const handleToolsStepSave = (tools: string[], instructions: string) => {
    setAddServerError(undefined);

    if (!serverData?.uid) {
      // Add new MCP server
      void addMCPServer({
        agent: agentId,
        config_json: connectionSettings,
        selected_tools: tools,
        instructions_prompt: instructions
      })
        .unwrap()
        .then(() => {
          onComplete();
        })
        .catch((error: FetchBaseQueryError) => {
          setAddServerError(
            formatErrorMessage(error, "Failed to add MCP server")
          );
        });
    } else {
      // Update existing MCP server
      void updateMCPServer({
        id: serverData.uid,
        data: {
          selected_tools: tools,
          instructions_prompt: instructions
        }
      })
        .unwrap()
        .then(() => {
          onComplete();
        })
        .catch((error: FetchBaseQueryError) => {
          setAddServerError(
            formatErrorMessage(error, "Failed to update MCP server")
          );
        });
    }
  };

  const handleToolsStepCancel = () => {
    onClose();
  };

  const tools = useMemo(
    () =>
      isEditMode
        ? serverData?.all_tools ?? []
        : testMCPServerResult.data?.tools ?? [],
    [isEditMode, serverData?.all_tools, testMCPServerResult.data?.tools]
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
      instructions={serverData?.instructions_prompt}
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

  const title = serverData?.uid ? "Set MCP Server" : "Add MCP Server";

  return (
    <Dialog title={title} onClose={handleDialogClose}>
      {steps[currentStep]}
    </Dialog>
  );
};
