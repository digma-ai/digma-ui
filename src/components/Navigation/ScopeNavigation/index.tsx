import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import {
  ChangeEnvironmentPayload,
  ChangeScopePayload,
  ChangeViewPayload
} from "../../../types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { HistoryManager } from "./HistoryManager";
import { HistoryNavigationPanel } from "./HistoryNavigationPanel";
import { ScopeNavigationProps } from "./types";

const changeScope = (scope: Scope | null) => {
  window.sendMessageToDigma<ChangeScopePayload>({
    action: globalActions.CHANGE_SCOPE,
    payload: {
      span: scope?.span || null
    }
  });
};

export const ScopeNavigation = (props: ScopeNavigationProps) => {
  const [historyManager, setHistoryManager] = useState<HistoryManager>(
    new HistoryManager()
  );
  const { environment, environments } = useContext(ConfigContext);
  const previousTabId = usePrevious(props.currentTabId);
  const previousEnvironment = usePrevious(environment);
  const previousSate = usePrevious(historyManager.getCurrent());

  useEffect(() => {
    if (
      !environment ||
      !environments?.find((x) => x.originalName == environment?.originalName)
    ) {
      changeScope(null);
      setHistoryManager(new HistoryManager());
    }
  }, [environment, environments]);

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

    dispatcher.addActionListener(globalActions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
    };
  }, [environment, props.currentTabId, historyManager]);

  const handleBackClick = () => {
    const currentStep = historyManager.back();
    if (currentStep && currentStep.scope) {
      changeScope(currentStep.scope);
    }
  };

  const handleNexClick = () => {
    const currentStep = historyManager.forward();
    if (currentStep && currentStep.scope) {
      changeScope(currentStep.scope);
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
