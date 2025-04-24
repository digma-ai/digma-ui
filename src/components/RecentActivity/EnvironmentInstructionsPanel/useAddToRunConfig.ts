import { useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { actions } from "../actions";
import type { AddToConfigResult, AddToRunConfigState } from "./types";

export const useAddToRunConfig = (environment: string) => {
  const [addToConfigState, setAddToConfigState] =
    useState<AddToRunConfigState | null>(null);
  useEffect(() => {
    const handleAddEnvironmentToRunConfigResult = (data: unknown) => {
      const response = data as AddToConfigResult;
      setAddToConfigState(response.result);
    };

    dispatcher.addActionListener(
      actions.ADD_ENVIRONMENT_TO_RUN_CONFIG_RESULT,
      handleAddEnvironmentToRunConfigResult
    );

    return () => {
      dispatcher.removeActionListener(
        actions.ADD_ENVIRONMENT_TO_RUN_CONFIG_RESULT,
        handleAddEnvironmentToRunConfigResult
      );
    };
  }, []);

  return {
    addToRunConfig: () => {
      window.sendMessageToDigma({
        action: actions.ADD_ENVIRONMENT_TO_RUN_CONFIG,
        payload: {
          environment
        }
      });
    },
    state: addToConfigState
  };
};
