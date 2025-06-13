import { useEffect } from "react";
import type { HistoryEntry } from "../../../history/History";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { isObject } from "../../../typeGuards/isObject";
import { isString } from "../../../typeGuards/isString";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { ScopeChangeEvent } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { HistoryNavigationPanel } from "../../common/HistoryNavigationPanel";
import type { HistoryState } from "../../Main/types";
import { useBrowserLocationUpdater } from "../../Main/updateBrowserLocationUpdater";
import { useHistory } from "../../Main/useHistory";
import { trackingEvents } from "../tracking";

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

export const HistoryNavigation = () => {
  const { goBack, goForward, canGoBack, canGoForward } = useHistory();
  const { environments, environment, scope } = useConfigSelector();
  const updateBrowserLocation = useBrowserLocationUpdater();

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
          event: ScopeChangeEvent.HistoryCleared,
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
            event: ScopeChangeEvent.HistoryNavigated,
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
  }, []);

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
        event: ScopeChangeEvent.NavigationHomeButtonClicked
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
