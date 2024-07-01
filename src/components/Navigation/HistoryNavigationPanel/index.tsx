import { useContext, useEffect } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { history } from "../../../containers/Main/history";
import { HistoryEntry } from "../../../history/History";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  HistoryState,
  ReactRouterLocationState,
  SCOPE_CHANGE_EVENTS
} from "../../Main/types";
import { useHistory } from "../../Main/useHistory";
import { useHistoryTransitioningStore } from "../../common/App";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

export const HistoryNavigationPanel = () => {
  const { goBack, goForward, goTo, canGoBack, canGoForward } = useHistory();
  const navigate = useNavigate();
  const config = useContext(ConfigContext);
  const location = useLocation() as Location<ReactRouterLocationState | null>;
  const { setIsHistoryTransitioning } = useHistoryTransitioningStore();

  useEffect(() => {
    // Initialize history with the current state
    if (!location.state?.navigatedWithCustomHistory) {
      goTo(
        {
          pathname: location.pathname,
          search: location.search
        },
        {
          replace: history.historyStack.length > 0,
          state: {
            environmentId: config.environment?.id,
            spanCodeObjectId: config.scope?.span?.spanCodeObjectId
          }
        }
      );
    }
  }, [
    location,
    goTo,
    config.environment?.id,
    config.scope?.span?.spanCodeObjectId
  ]);

  useEffect(() => {
    const handleHistoryChange = (
      e: CustomEvent<HistoryEntry<HistoryState>>
    ) => {
      navigate(e.detail.location, {
        replace: true,
        state: {
          navigatedWithCustomHistory: true
        }
      });
    };

    window.addEventListener(
      "history:change",
      handleHistoryChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "history:change",
        handleHistoryChange as EventListener
      );
    };
  }, [navigate]);

  useEffect(() => {
    const handleHistoryClear = () => {
      changeScope({
        span: null,
        context: {
          event: SCOPE_CHANGE_EVENTS.HISTORY_CLEARED
        }
      });
    };

    window.addEventListener(
      "history:clear",
      handleHistoryClear as EventListener
    );

    return () => {
      window.removeEventListener(
        "history:clear",
        handleHistoryClear as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handleHistoryNavigate = (
      e: CustomEvent<HistoryEntry<HistoryState>>
    ) => {
      setIsHistoryTransitioning(true);
      const spanCodeObjectId = e.detail.state?.spanCodeObjectId;
      changeScope({
        span: spanCodeObjectId
          ? {
              spanCodeObjectId: spanCodeObjectId
            }
          : null,
        environmentId: e.detail.state?.environmentId,
        context: {
          event: SCOPE_CHANGE_EVENTS.HISTORY_NAVIGATED
        }
      });
      navigate(e.detail.location, {
        replace: true,
        state: {
          navigatedWithCustomHistory: true
        }
      });
    };

    window.addEventListener(
      "history:navigate",
      handleHistoryNavigate as EventListener
    );

    return () => {
      window.removeEventListener(
        "history:navigate",
        handleHistoryNavigate as EventListener
      );
    };
  }, [navigate, setIsHistoryTransitioning]);

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    goBack();
  };

  const handleForwardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
    goForward();
  };

  return (
    <s.Container>
      <s.Button onClick={handleBackButtonClick} disabled={!canGoBack}>
        <ChevronIcon
          direction={Direction.LEFT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
      <s.Button onClick={handleForwardButtonClick} disabled={!canGoForward}>
        <ChevronIcon
          direction={Direction.RIGHT}
          size={16}
          color={"currentColor"}
        />
      </s.Button>
    </s.Container>
  );
};
