import { useEffect } from "react";
import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { history } from "../../../containers/Main/history";
import type { HistoryEntry } from "../../../history/History";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { HistoryNavigationPanel } from "../../common/HistoryNavigationPanel";
import type { HistoryState, ReactRouterLocationState } from "../../Main/types";
import { useBrowserLocationUpdater } from "../../Main/updateBrowserLocationUpdater";
import { useHistory } from "../../Main/useHistory";
import { trackingEvents } from "../tracking";

export const HistoryNavigation = () => {
  const { goBack, goForward, goTo, canGoBack, canGoForward } = useHistory();
  const navigate = useNavigate();
  const { environments, environment, scope } = useConfigSelector();
  const location = useLocation() as Location<ReactRouterLocationState | null>;
  const updateBrowserLocation = useBrowserLocationUpdater();

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
            environmentId: environment?.id,
            spanCodeObjectId: scope?.span?.spanCodeObjectId,
            spanDisplayName: scope?.span?.displayName
          }
        }
      );
    }
  }, [location, goTo, environment?.id, scope?.span]);

  useEffect(() => {
    const handleHistoryChange = (
      e: CustomEvent<HistoryEntry<HistoryState>>
    ) => {
      updateBrowserLocation(e.detail.location);
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
  }, [updateBrowserLocation]);

  useEffect(() => {
    const handleHistoryClear = () => {
      const environmentNavigateTo = environment?.id
        ? environments?.find((x) => x.id === environment?.id)
        : environments?.[0];
      changeScope({
        span: null,
        context: {
          event: SCOPE_CHANGE_EVENTS.HISTORY_CLEARED,
          payload: {
            environmentId: environmentNavigateTo?.id
          }
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
      const spanCodeObjectId = e.detail.state?.spanCodeObjectId;
      changeScope({
        span: spanCodeObjectId
          ? {
              spanCodeObjectId
            }
          : null,
        environmentId: e.detail.state?.environmentId,
        context: {
          event: SCOPE_CHANGE_EVENTS.HISTORY_NAVIGATED,
          payload: {
            location: e.detail.location
          }
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
  }, [navigate]);

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    goBack();
  };

  const handleForwardButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FORWARD_BUTTON_CLICKED);
    goForward();
  };

  const handleHomeButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.HOME_BUTTON_CLICKED);
    changeScope({
      span: null,
      context: {
        event: SCOPE_CHANGE_EVENTS.NAVIGATION_HOME_BUTTON_CLICKED
      }
    });
  };

  const isAtHome = !scope?.span;

  return (
    <HistoryNavigationPanel
      isAtHome={isAtHome}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
      onGoBack={handleBackButtonClick}
      onGoForward={handleForwardButtonClick}
      onGoHome={handleHomeButtonClick}
    />
  );
};
