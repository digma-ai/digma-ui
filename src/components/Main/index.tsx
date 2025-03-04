import { useEffect, useLayoutEffect, useMemo } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { actions as globalActions } from "../../actions";
import { history } from "../../containers/Main/history";
import { dispatcher } from "../../dispatcher";
import type { HistoryEntryLocation } from "../../history/History";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { logger } from "../../logging";
import { PLUGIN_EVENTS } from "../../pluginEvents";
import type { IssueCriticality } from "../../redux/services/types";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useStore } from "../../store/useStore";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isUndefined } from "../../typeGuards/isUndefined";
import type { SendPluginEventPayload } from "../../types";
import { SCOPE_CHANGE_EVENTS } from "../../types";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { Navigation } from "../Navigation";
import { TAB_IDS } from "../Navigation/Tabs/types";
import type { Scope } from "../common/App/types";
import { Authentication } from "./Authentication";
import { actions } from "./actions";
import * as s from "./styles";
import {
  isScopeWithCodeLensContext,
  isScopeWithErrorDetailsIdContext,
  isScopeWithRestApiCallContext
} from "./typeGuards";
import type { HistoryState } from "./types";
import { useBrowserLocationUpdater } from "./updateBrowserLocationUpdater";
import { useHistory } from "./useHistory";

export const SERVICES_PERSISTENCE_KEY = "services";
export const MAIN_CONTAINER_ID = "mainContainer";

const getURLToNavigateOnCodeLensClick = (scope: Scope): string | undefined => {
  if (!isScopeWithCodeLensContext(scope)) {
    return;
  }

  const codeLens = scope.context.payload.codeLens;
  if (!codeLens.scopeCodeObjectId.startsWith("span:")) {
    return;
  }

  if (codeLens.importance <= 4) {
    return `/${TAB_IDS.ISSUES}`;
  }

  if (codeLens.lensTitle.toLocaleLowerCase().includes("runtime data")) {
    return `/${TAB_IDS.HIGHLIGHTS}`;
  }
};

const getUrlToNavigateFromRestApiCall = (scope: Scope): string | undefined => {
  if (!isScopeWithRestApiCallContext(scope)) {
    return;
  }

  if (!scope.context.payload.targetTab) {
    return;
  }

  if (!Object.values(TAB_IDS).includes(scope.context.payload.targetTab)) {
    return `/${scope.context.payload.targetTab}`;
  }

  return `/${scope.context.payload.targetTab}`;
};

export const Main = () => {
  const location = useLocation();
  const {
    environments,
    environment,
    scope,
    userInfo,
    backendInfo,
    selectedServices
  } = useConfigSelector();
  const {
    setSelectedServices,
    setInsightsFilteredCriticalityLevels:
      setInsightsFilteredCriticalityLevelsInSpanScope,
    setInsightsFilteredCriticalityLevelsInGlobalScope
  } = useStore.getState();
  const previousEnvironment = usePrevious(environment);
  const userId = userInfo?.id;
  const previousUserId = usePrevious(userId);
  const previousBackendInfo = usePrevious(backendInfo);
  const { goTo } = useHistory();
  const updateBrowserLocation = useBrowserLocationUpdater();
  const [persistedServices, setPersistedServices] = usePersistence<string[]>(
    SERVICES_PERSISTENCE_KEY,
    "project"
  );
  const previousPersistedServices = usePrevious(persistedServices);
  const isInitialized = useMemo(
    () => !isUndefined(persistedServices),
    [persistedServices]
  );

  useEffect(() => {
    const handlePluginEvent = (data: unknown) => {
      const { name } = data as SendPluginEventPayload;

      switch (name) {
        case PLUGIN_EVENTS.FIRST_IMPORTANT_ISSUE_NOTIFICATION_LINK_CLICK:
        case PLUGIN_EVENTS.FIRST_ISSUE_NOTIFICATION_LINK_CLICK:
          goTo(`/${TAB_IDS.ISSUES}`);
          break;
        case PLUGIN_EVENTS.FIRST_INSIGHT_NOTIFICATION_LINK_CLICK:
        case PLUGIN_EVENTS.FIRST_ASSET_NOTIFICATION_LINK_CLICK:
          goTo(`/${TAB_IDS.ASSETS}`);
          break;
      }
    };

    dispatcher.addActionListener(
      globalActions.SEND_PLUGIN_EVENT,
      handlePluginEvent
    );

    return () => {
      dispatcher.removeActionListener(
        globalActions.SEND_PLUGIN_EVENT,
        handlePluginEvent
      );
    };
  }, [goTo]);

  // Rehydrate selected services from persistence
  useEffect(() => {
    if (isUndefined(previousPersistedServices) && persistedServices) {
      setSelectedServices(persistedServices);
    }
  }, [previousPersistedServices, persistedServices, setSelectedServices]);

  // Persist selected services on its change
  useEffect(() => {
    if (isInitialized) {
      setPersistedServices(selectedServices ?? []);
    }
  }, [selectedServices, isInitialized, setPersistedServices]);

  // Clear selected services when backend instance or environment is changed
  useEffect(() => {
    if (
      Boolean(
        previousBackendInfo &&
          !areBackendInfosEqual(previousBackendInfo, backendInfo)
      ) ||
      (previousEnvironment && previousEnvironment.id !== environment?.id)
    ) {
      setSelectedServices([]);
    }
  }, [
    setSelectedServices,
    previousEnvironment,
    environment?.id,
    previousBackendInfo,
    backendInfo
  ]);

  useEffect(() => {
    // clear the history in following cases:
    // 1) there are no environments
    // 2) selected environment is not exist in the list of environments
    if (
      !environments ||
      environments.length === 0 ||
      Boolean(
        environment && !environments?.find((x) => x.id == environment?.id)
      )
    ) {
      history.clear();
    }
  }, [environments, environment, scope?.span]);

  useEffect(() => {
    const defaultGoTo = (scope: Scope, state: HistoryState) => {
      if (scope.issuesInsightsCount > 0) {
        goTo(`/${TAB_IDS.ISSUES}`, { state });
      } else {
        goTo(`/${TAB_IDS.ANALYTICS}`, { state });
      }
    };

    const handleSetScope = (data: unknown) => {
      const scope = data as Scope;
      logger.debug("[SCOPE CHANGE]: ", scope);

      // Get scope display name from history state if it's not provided
      const spanDisplayName = scope.span
        ? scope.span.displayName
          ? scope.span.displayName
          : history.getCurrentLocation()?.state?.spanDisplayName
        : undefined;

      const state: HistoryState = {
        environmentId: scope.environmentId ?? environment?.id,
        spanCodeObjectId: scope.span?.spanCodeObjectId,
        spanDisplayName
      };

      if (scope?.context) {
        switch (scope.context.event) {
          case SCOPE_CHANGE_EVENTS.HISTORY_NAVIGATED as string: {
            updateBrowserLocation(
              scope.context.payload?.location as HistoryEntryLocation
            );
            break;
          }
          case SCOPE_CHANGE_EVENTS.HISTORY_CLEARED as string:
            goTo(`/${TAB_IDS.ISSUES}`, {
              state: {
                environmentId: (
                  scope.context.payload as {
                    environmentId: string | undefined;
                  }
                ).environmentId,
                spanCodeObjectId: scope.span?.spanCodeObjectId,
                spanDisplayName
              }
            });
            break;
          case SCOPE_CHANGE_EVENTS.JAEGER_SPAN_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.ASSETS_ASSET_CARD_TITLE_LINK_CLICKED as string:
            goTo(`/${TAB_IDS.HIGHLIGHTS}`, { state });
            break;
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_SCALING_CARD_ITEM_CLICKED as string:
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_PERFORMANCE_CARD_ITEM_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_IMPACT_CARD_ITEM_CLICKED as string:
            goTo(`/${TAB_IDS.ANALYTICS}`, { state });
            break;
          case SCOPE_CHANGE_EVENTS.NAVIGATION_HOME_BUTTON_CLICKED as string:
            if (matchPath(window.location.pathname, TAB_IDS.ASSETS)) {
              goTo(`/${TAB_IDS.ASSETS}`, { state });
              break;
            }
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          case SCOPE_CHANGE_EVENTS.ASSETS_EMPTY_CATEGORY_PARENT_LINK_CLICKED as string:
            goTo(`/${TAB_IDS.ASSETS}`, { state });
            break;
          case SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED as string:
          case SCOPE_CHANGE_EVENTS.METRICS_ENDPOINT_SELECTED as string: {
            const serviceToSelect = scope.context.payload?.service as string;
            setSelectedServices(serviceToSelect ? [serviceToSelect] : []);
            const criticalityLevels = scope.context.payload
              ?.criticalityLevels as IssueCriticality[];
            if (scope.span?.spanCodeObjectId) {
              setInsightsFilteredCriticalityLevelsInSpanScope(
                criticalityLevels
              );
            } else {
              setInsightsFilteredCriticalityLevelsInGlobalScope(
                criticalityLevels
              );
            }
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          }
          case SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED as string: {
            const url = getURLToNavigateOnCodeLensClick(scope);
            if (url) {
              goTo(url, { state });
              break;
            }
            defaultGoTo(scope, state);
            break;
          }
          case SCOPE_CHANGE_EVENTS.ERROR_CARD_LINK_CLICKED as string: {
            const errorId = isScopeWithErrorDetailsIdContext(scope)
              ? "/" + scope.context.payload.id
              : "";

            goTo(`/${TAB_IDS.ERRORS}${errorId}`, { state });
            break;
          }
          case SCOPE_CHANGE_EVENTS.IDE_REST_API_CALL as string: {
            const url = getUrlToNavigateFromRestApiCall(scope);
            if (url) {
              goTo(url, { state });
              break;
            }
            defaultGoTo(scope, state);
            break;
          }
          case SCOPE_CHANGE_EVENTS.DASHBOARD_SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NAVIGATION_CODE_BUTTON_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.TESTS_TEST_CARD_TITLE_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NOTIFICATIONS_NOTIFICATION_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_SPAN_LINK_CLICKED as string:
          default: {
            defaultGoTo(scope, state);
          }
        }
      } else {
        goTo(location, { state });
      }
    };

    dispatcher.addActionListener(globalActions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
    };
  }, [
    goTo,
    location,
    environments,
    environment,
    updateBrowserLocation,
    setSelectedServices,
    setInsightsFilteredCriticalityLevelsInSpanScope,
    setInsightsFilteredCriticalityLevelsInGlobalScope
  ]);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [userId]);

  useEffect(() => {
    if (previousUserId !== userId) {
      sendTrackingEvent(globalTrackingEvents.USER_ID_CHANGED, {
        userId
      });
    }
  }, [previousUserId, userId]);

  if (!isInitialized) {
    return null;
  }

  if (!userId && backendInfo?.centralize) {
    return <Authentication />;
  }

  return (
    <s.Container id={MAIN_CONTAINER_ID}>
      <Navigation />
      <s.ContentContainer>
        <Outlet />
      </s.ContentContainer>
    </s.Container>
  );
};
