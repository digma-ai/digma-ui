import { useContext, useEffect, useState } from "react";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { HistoryManager, HistoryStep } from "../../../utils/historyManager";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { ChangeEnvironmentPayload, ChangeViewPayload } from "../types";
import { actions as globalActions } from "./../actions";
import * as s from "./styles";
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
  const previousSate = usePrevious(historyManager.getCurrent());

  useEffect(() => {
    const currentStep = historyManager.getCurrent();
    if (
      previousSate?.scope.span?.spanCodeObjectId ===
      currentStep?.scope.span?.spanCodeObjectId
    ) {
      if (previousTabId !== props.currentTabId) {
        historyManager.updateCurrent({ tabId: props.currentTabId });
      }
    }
  }, [previousTabId, props.currentTabId, previousSate]);

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
    <>
      <s.NavigationButton
        disabled={!historyManager.canMoveBack()}
        onClick={handleBackClick}
      >
        {"<"}
      </s.NavigationButton>
      <s.NavigationButton
        disabled={!historyManager.canMoveForward()}
        onClick={handleNexClick}
      >
        {">"}
      </s.NavigationButton>
    </>
  );
};
