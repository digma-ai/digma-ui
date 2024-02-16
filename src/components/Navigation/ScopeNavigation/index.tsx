import { useContext, useEffect, useState } from "react";
import { actions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { HistoryManager } from "../../../utils/historyManager";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { actions as globalActions } from "./../actions";
import * as s from "./styles";

const sendMessage = (scope: Scope) => {
  window.sendMessageToDigma({
    action: globalActions.CHANGE_SCOPE,
    payload: {
      ...scope
    }
  });
};

export const ScopeNavigation = () => {
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
          tab: null
        });
      }
      console.log("state " + JSON.stringify(historyManager.getHistoryData()));
    };

    dispatcher.addActionListener(actions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(actions.SET_SCOPE, handleSetScope);
    };
  }, []);

  const handleBackClick = () => {
    console.log("back " + JSON.stringify(historyManager.getHistoryData()));

    historyManager.back();
    const nextScope = historyManager.getCurrent()?.scope;
    if (nextScope) {
      sendMessage(nextScope);
    }

    console.log(
      "after back " + JSON.stringify(historyManager.getHistoryData())
    );
  };

  const handleFowradClick = () => {
    console.log("next " + JSON.stringify(historyManager.getHistoryData()));
    historyManager.forward();
    const nextScope = historyManager.getCurrent()?.scope;
    if (nextScope) {
      sendMessage(nextScope);
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
