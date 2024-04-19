import { useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { actions } from "../actions";
import { AddToConfigResult, AddToRunConfigState } from "./types";

export const useAddToRunConfig = (environment: string) => {
  const [addToConfigState, setAddToConfigState] =
    useState<AddToRunConfigState | null>(null);
  useEffect(() => {
    const handleRecentActivityData = (data: unknown) => {
      const response = data as AddToConfigResult;
      setAddToConfigState(response.result);
    };

    dispatcher.addActionListener(
      actions.ADD_ENVIRONMENT_TO_RUN_CONFIG_RESULT,
      handleRecentActivityData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.ADD_ENVIRONMENT_TO_RUN_CONFIG_RESULT,
        handleRecentActivityData
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
