import { useContext, useEffect, useState } from "react";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { HistoryManager, HistoryStep } from "../../../utils/HistoryManager";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { HistoryNavigationPanel } from "../HistoryNavigationPanel";
import { ChangeEnvironmentPayload, ChangeViewPayload } from "../types";
import { actions as globalActions } from "./../actions";
import { ScopeNavigationProps } from "./types";

const sendMessage = (historyStep: HistoryStep) => {
  if (historyStep.scope) {
    window.sendMessageToDigma({
      action: globalActions.CHANGE_SCOPE,
      payload: {
        ...historyStep.scope
      }
    });
  }
};

export const ScopeNavigation = (props: ScopeNavigationProps) => {
  const [historyManager, setHistoryManager] = useState<HistoryManager>(
    new HistoryManager()
  );
  const { environment } = useContext(ConfigContext);
  const previousTabId = usePrevious(props.currentTabId);
  const previousEnvironment = usePrevious(environment);
  const previousSate = usePrevious(historyManager.getCurrent());

  useEffect(() => {
    const currentStep = historyManager.getCurrent();
    if (
      previousSate?.scope.span?.spanCodeObjectId ===
      currentStep?.scope.span?.spanCodeObjectId
    ) {
      if (
        previousTabId !== props.currentTabId ||
        previousEnvironment !== environment
      ) {
        historyManager.updateCurrent({
          tabId: props.currentTabId,
          environment
        });
      }
    }
  }, [
    previousTabId,
    props.currentTabId,
    previousSate,
    previousEnvironment,
    environment,
    historyManager
  ]);

  useEffect(() => {
    const handleSetScope = (data: unknown) => {
      const newScope = data as Scope;
      const currentScope = historyManager.getCurrent()?.scope;
      if (
        !currentScope ||
        currentScope.span?.spanCodeObjectId !== newScope.span?.spanCodeObjectId
      ) {
        historyManager.push({
          environment: environment || null,
          scope: newScope,
          tabId: null
        });
      } else {
        const historyStep = historyManager.getCurrent();

        if (historyStep && historyStep.tabId) {
          window.sendMessageToDigma<ChangeViewPayload>({
            action: globalActions.CHANGE_VIEW,
            payload: {
              view: historyStep.tabId
            }
          });
        }

        if (historyStep && historyStep.environment) {
          window.sendMessageToDigma<ChangeEnvironmentPayload>({
            action: globalActions.CHANGE_ENVIRONMENT,
            payload: {
              environment: historyStep.environment
            }
          });
        }
      }
    };

    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
    };
  }, [environment, props.currentTabId, historyManager]);

  const handleBackClick = () => {
    const currentStep = historyManager.back();
    if (currentStep) {
      sendMessage(currentStep);
    }
  };

  const handleNexClick = () => {
    const currentStep = historyManager.forward();
    if (currentStep) {
      sendMessage(currentStep);
    }
  };

  return (
    <HistoryNavigationPanel
      isBackDisabled={!historyManager.canMoveBack()}
      isForwardDisabled={!historyManager.canMoveForward()}
      onGoBack={handleBackClick}
      onGoForward={handleNexClick}
    />
  );
};
