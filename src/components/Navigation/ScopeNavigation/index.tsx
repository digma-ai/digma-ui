import { useContext, useEffect, useState } from "react";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isObject } from "../../../typeGuards/isObject";
import { HistoryManager, HistoryStep } from "../../../utils/historyManager";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import {
  ChangeEnvironmentPayload,
  ChangeViewPayload,
  SetViewsPayload
} from "../types";
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

  useEffect(() => {
    const handleSetScope = (data: unknown) => {
      console.log("new scope recieved " + JSON.stringify(data));

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
        if (historyStep && historyStep.tabId === props.currentTabId) {
          window.sendMessageToDigma<ChangeViewPayload>({
            action: globalActions.CHANGE_VIEW,
            payload: {
              view: historyStep.tabId
            }
          });
        }

        if (
          historyStep &&
          historyStep.environment &&
          historyStep.environment !== environment
        ) {
          window.sendMessageToDigma<ChangeEnvironmentPayload>({
            action: globalActions.CHANGE_ENVIRONMENT,
            payload: {
              environment: historyStep.environment
            }
          });
        }
      }
    };

    console.log("state " + JSON.stringify(historyManager.getHistoryData()));
    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
    };
  }, [environment, props.currentTabId, historyManager]);

  useEffect(() => {
    const handleViewChange = (data: unknown) => {
      const viewsData = data as SetViewsPayload;
      const selectedView = viewsData.views.find((x) => x.isSelected);

      historyManager.updateCurrent({ tabId: selectedView?.id });
    };

    dispatcher.addActionListener(globalActions.SET_VIEWS, handleViewChange);

    return () => {
      dispatcher.removeActionListener(
        globalActions.SET_VIEWS,
        handleViewChange
      );
    };
  });

  useEffect(() => {
    const handleSetEnvironment = (data: unknown) => {
      if (isObject(data) && isEnvironment(data?.environment)) {
        historyManager.updateCurrent({
          environment: data.environment
        });
      }
    };

    dispatcher.addActionListener(actions.SET_ENVIRONMENT, handleSetEnvironment);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_ENVIRONMENT,
        handleSetEnvironment
      );
    };
  });

  const handleBackClick = () => {
    console.log("back " + JSON.stringify(historyManager.getHistoryData()));

    historyManager.back();
    const currentStep = historyManager.getCurrent();
    if (currentStep) {
      sendMessage(currentStep);
    }

    console.log(
      "after back " + JSON.stringify(historyManager.getHistoryData())
    );
  };

  const handleFowradClick = () => {
    console.log("next " + JSON.stringify(historyManager.getHistoryData()));
    historyManager.forward();
    const currentStep = historyManager.getCurrent();
    if (currentStep) {
      sendMessage(currentStep);
    }

    console.log(
      "next after " + JSON.stringify(historyManager.getHistoryData())
    );
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
        onClick={handleFowradClick}
      >
        {">"}
      </s.NavigationButton>
    </>
  );
};
