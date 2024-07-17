import { useEffect } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { history } from "../../../containers/Main/history";
import { useGlobalStore } from "../../../containers/Main/stores/globalStore";
import { HistoryEntry } from "../../../history/History";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  HistoryState,
  ReactRouterLocationState,
  SCOPE_CHANGE_EVENTS
} from "../../Main/types";
import { useBrowserLocationUpdater } from "../../Main/updateBrowserLocationUpdater";
import { useHistory } from "../../Main/useHistory";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

export const HistoryNavigationPanel = () => {
  const { goBack, goForward, goTo, canGoBack, canGoForward } = useHistory();
  const navigate = useNavigate();
  const environments = useGlobalStore.use.environments();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
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
            spanCodeObjectId: scope?.span?.spanCodeObjectId
          }
        }
      );
    }
  }, [location, goTo, environment?.id, scope?.span?.spanCodeObjectId]);

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
