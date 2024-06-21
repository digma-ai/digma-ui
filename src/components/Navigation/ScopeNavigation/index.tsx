import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { changeScope } from "../../../utils/actions/changeScope";
import { actions as mainActions } from "../../Main/actions";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { SetViewsPayload } from "../types";
import { HistoryManager } from "./HistoryManager";
import { ScopeNavigationProps } from "./types";

/**
 * @deprecated
 */
export const ScopeNavigation = ({ currentTabId }: ScopeNavigationProps) => {
  const [historyManager, setHistoryManager] = useState<HistoryManager>(
    new HistoryManager()
  );
  const { environment, environments } = useContext(ConfigContext);
  const previousEnvironment = usePrevious(environment);
  const previousState = usePrevious(historyManager.getCurrent());

  useEffect(() => {
    if (!environment || !environments?.find((x) => x.id == environment?.id)) {
      changeScope({
        span: null,
        forceNavigation: true,
        context: {
          event:
            SCOPE_CHANGE_EVENTS.NAVIGATION_HISTORY_NAVIGATION_BUTTON_CLICKED
        }
      });
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
          environment: environment ?? null,
          scope: newScope,
          tabId: currentTabId
        });
      } else {
        const historyStep = historyManager.getCurrent();

        if (historyStep?.tabId) {
          // window.sendMessageToDigma<ChangeViewPayload>({
          //   action: globalActions.CHANGE_VIEW,
          //   payload: {
          //     view: historyStep.tabId,
          //     isUserAction: false
          //   }
          // });
        }

        // if (historyStep?.environment) {
        //   window.sendMessageToDigma<ChangeEnvironmentPayload>({
        //     action: globalActions.CHANGE_ENVIRONMENT,
        //     payload: {
        //       environment: historyStep.environment.id
        //     }
        //   });
        // }
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
    dispatcher.addActionListener(mainActions.SET_VIEWS, handleSetViews);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
      dispatcher.removeActionListener(mainActions.SET_VIEWS, handleSetViews);
    };
  }, [environment, currentTabId, historyManager]);

  // const handleBackClick = () => {
  //   const currentStep = historyManager.back();
  //   if (currentStep?.scope) {
  //     changeScope(currentStep.scope);
  //   }
  // };

  // const handleForwardClick = () => {
  //   const currentStep = historyManager.forward();
  //   if (currentStep?.scope) {
  //     changeScope(currentStep.scope);
  //   }
  // };

  return (
    <></>
    // <HistoryNavigationPanel
    //   isBackDisabled={!historyManager.canMoveBack()}
    //   isForwardDisabled={!historyManager.canMoveForward()}
    //   onGoBack={handleBackClick}
    //   onGoForward={handleForwardClick}
    // />
  );
};
