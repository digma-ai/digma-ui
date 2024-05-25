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
import { actions } from "../actions";
import { SetViewsPayload } from "../types";
import { HistoryManager } from "./HistoryManager";
import { HistoryNavigationPanel } from "./HistoryNavigationPanel";
import { ScopeNavigationProps } from "./types";

const changeScope = (scope: Scope | null) => {
  window.sendMessageToDigma<ChangeScopePayload>({
    action: globalActions.CHANGE_SCOPE,
    payload: {
      span: scope?.span || null,
      forceNavigation: true
    }
  });
};

export const ScopeNavigation = (props: ScopeNavigationProps) => {
  const [historyManager, setHistoryManager] = useState<HistoryManager>(
    new HistoryManager()
  );
  const { environment, environments } = useContext(ConfigContext);
  const previousEnvironment = usePrevious(environment);
  const previousState = usePrevious(historyManager.getCurrent());

  useEffect(() => {
    if (!environment || !environments?.find((x) => x.id == environment?.id)) {
      changeScope(null);
      setHistoryManager(new HistoryManager());
    }
  }, [environment, environments]);

  useEffect(() => {
    const currentStep = historyManager.getCurrent();
    if (
      previousState?.scope.span?.spanCodeObjectId ===
      currentStep?.scope.span?.spanCodeObjectId
    ) {
      if (previousEnvironment !== environment) {
        historyManager.updateCurrent({
          environment
        });
      }
    }
  }, [previousState, previousEnvironment, environment, historyManager]);

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
          tabId: props.currentTabId
        });
      } else {
        const historyStep = historyManager.getCurrent();

        if (historyStep && historyStep.tabId) {
          window.sendMessageToDigma<ChangeViewPayload>({
            action: globalActions.CHANGE_VIEW,
            payload: {
              view: historyStep.tabId,
              isUserAction: false
            }
          });
        }

        if (historyStep && historyStep.environment) {
          window.sendMessageToDigma<ChangeEnvironmentPayload>({
            action: globalActions.CHANGE_ENVIRONMENT,
            payload: {
              environment: historyStep.environment.id
            }
          });
        }
      }
    };

    const handleSetViews = (data: unknown) => {
      const payload = data as SetViewsPayload;
      const view = payload.views.find((x) => x.isSelected);
      const viewId = [view?.id, view?.path].filter((x) => Boolean(x)).join("/");

      const currentStep = historyManager.getCurrent();
      if (!payload.createHistoryStep) {
        historyManager.updateCurrent({ tabId: viewId });
        return;
      }

      if (view && currentStep && currentStep?.tabId !== viewId) {
        historyManager.push({
          environment: environment,
          scope: currentStep.scope,
          tabId: viewId
        });
      }
    };

    dispatcher.addActionListener(globalActions.SET_SCOPE, handleSetScope);
    dispatcher.addActionListener(actions.SET_VIEWS, handleSetViews);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
      dispatcher.removeActionListener(actions.SET_VIEWS, handleSetViews);
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
