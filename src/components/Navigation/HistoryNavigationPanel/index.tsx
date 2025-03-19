import { useEffect } from "react";
import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { history } from "../../../containers/Main/history";
import type { HistoryEntry } from "../../../history/History";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import type { HistoryState, ReactRouterLocationState } from "../../Main/types";
import { useBrowserLocationUpdater } from "../../Main/updateBrowserLocationUpdater";
import { useHistory } from "../../Main/useHistory";
import { HomeIcon } from "../../common/icons/16px/HomeIcon";
import { ChevronIcon } from "../../common/icons/20px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

const isHistoryState = (obj: unknown): obj is HistoryState =>
  isObject(obj) &&
  (isString(obj.environmentId) || isUndefined(obj.environmentId)) &&
  (isString(obj.spanCodeObjectId) || isUndefined(obj.spanCodeObjectId)) &&
  (isString(obj.spanDisplayName) || isUndefined(obj.spanDisplayName)) &&
  (isBoolean(obj.navigatedWithCustomHistory) ||
    isUndefined(obj.navigatedWithCustomHistory));

const isHistoryEntryWithHistoryState = (
  obj: unknown
): obj is HistoryEntry<HistoryState> =>
  isObject(obj) &&
  isObject(obj.location) &&
  isString(obj.location.pathname) &&
  (isString(obj.location.search) || isUndefined(obj.location.search)) &&
  (isHistoryState(obj.state) || isUndefined(obj.state));

export const HistoryNavigationPanel = () => {
  const { goBack, goForward, goTo, canGoBack, canGoForward } = useHistory();
  const navigate = useNavigate();
  const { environments, environment, scope } = useConfigSelector();
  const location = useLocation() as Location<ReactRouterLocationState | null>;
  const theme = useTheme();
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
    const handleHistoryChange = (e: Event) => {
      if (
        e instanceof CustomEvent &&
        isHistoryEntryWithHistoryState(e.detail)
      ) {
        updateBrowserLocation(e.detail.location);
      }
    };

    window.addEventListener("history:change", handleHistoryChange);

    return () => {
      window.removeEventListener("history:change", handleHistoryChange);
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

    window.addEventListener("history:clear", handleHistoryClear);

    return () => {
      window.removeEventListener("history:clear", handleHistoryClear);
    };
  }, [environments, environment?.id]);

  useEffect(() => {
    const handleHistoryNavigate = (e: Event) => {
      if (
        e instanceof CustomEvent &&
        isHistoryEntryWithHistoryState(e.detail)
      ) {
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
      }
    };

    window.addEventListener("history:navigate", handleHistoryNavigate);

    return () => {
      window.removeEventListener("history:navigate", handleHistoryNavigate);
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

  const isAtSpan = Boolean(scope?.span);

  return (
    <s.Container $isActive={isAtSpan}>
      <Tooltip title={"Go back"}>
        <s.Button onClick={handleBackButtonClick} disabled={!canGoBack}>
          <ChevronIcon
            direction={Direction.LEFT}
            size={16}
            color={"currentColor"}
          />
        </s.Button>
      </Tooltip>
      <Tooltip title={"Go forward"}>
        <s.Button onClick={handleForwardButtonClick} disabled={!canGoForward}>
          <ChevronIcon
            direction={Direction.RIGHT}
            size={16}
            color={"currentColor"}
          />
        </s.Button>
      </Tooltip>
      <Tooltip title={"Go home"}>
        <s.Button onClick={handleHomeButtonClick} disabled={!isAtSpan}>
          <HomeIcon
            color={
              isAtSpan ? "currentColor" : theme.colors.v3.icon.brandPrimary
            }
            size={16}
            fillColor={
              isAtSpan ? undefined : theme.colors.v3.surface.brandPrimary
            }
          />
        </s.Button>
      </Tooltip>
    </s.Container>
  );
};
