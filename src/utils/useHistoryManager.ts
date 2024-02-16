import { useEffect, useState } from "react";
import { actions } from "../actions";
import { ConfigContextData, Scope } from "../components/common/App/types";
import { dispatcher } from "../dispatcher";
import { HistoryData, HistoryManager } from "./historyManager";

export const useHistoryManager = (
  config: ConfigContextData,
  setConfig: (action: (val: ConfigContextData) => void) => void
) => {
  const [historyManager, setHistoryManager] = useState<HistoryManager>(
    new HistoryManager()
  );

  const { environment } = config;

  useEffect(() => {
    const handleSetScope = (data: unknown) => {
      historyManager.push({
        environment: environment || null,
        scope: data as Scope,
        tab: null
      });
    };

    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
    };
  }, []);

  useEffect(() => {
    const handleSetState = (data: unknown) => {
      const manager = new HistoryManager(data as HistoryData);
      const currentStep = manager.getCurrent();
      setHistoryManager(manager);
      setConfig((config) => ({
        ...config,
        scope: currentStep?.scope,
        environment: currentStep?.environment
      }));
    };

    dispatcher.addActionListener(actions.SET_STATE, handleSetState);

    return () => {
      dispatcher.removeActionListener(actions.SET_STATE, handleSetState);
    };
  }, []);

  useEffect(() => {
    historyManager.updateCurrent({ environment });
  }, [environment]);
};
