import { useEffect, useLayoutEffect, useMemo } from "react";
import { Outlet, matchPath, useLocation } from "react-router";
import { actions as globalActions } from "../../actions";
import { history } from "../../containers/Main/history";
import { dispatcher } from "../../dispatcher";
import type { HistoryEntryLocation } from "../../history/History";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { logger } from "../../logging";
import { PLUGIN_EVENTS } from "../../pluginEvents";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useStore } from "../../store/useStore";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isString } from "../../typeGuards/isString";
import { isUndefined } from "../../typeGuards/isUndefined";
import type { SendPluginEventPayload } from "../../types";
import { ScopeChangeEvent } from "../../types";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { useIssuesPersistence } from "../Insights/hooks/useIssuesPersistence";
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

  if (codeLens.lensTitle.toLocaleLowerCase().includes("error hotspot")) {
    return `/${TAB_IDS.ERRORS}`;
  }

  if (!codeLens.scopeCodeObjectId?.startsWith("span:")) {
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
    return;
  }

  const tab = scope.context.payload.targetTab;
  const path = scope.context.payload.targetTabPath;

  return `/${[tab, path].filter(isString).join("/")}`;
};

export const Main = () => {
  const location = useLocation();
  const { environments, environment, userInfo, backendInfo, selectedServices } =
    useConfigSelector();
  const { setSelectedServices } = useStore.getState();
  const previousEnvironment = usePrevious(environment);
  const userId = userInfo?.id;
  const previousUserId = usePrevious(userId);
  const previousBackendInfo = usePrevious(backendInfo);
  const { goTo } = useHistory();
  const updateBrowserLocation = useBrowserLocationUpdater();
  const { areFiltersRehydrated: areIssuesFiltersRehydrated } =
    useIssuesPersistence();
  const [persistedServices, setPersistedServices] = usePersistence<string[]>(
    SERVICES_PERSISTENCE_KEY,
    "project"
  );
  const previousPersistedServices = usePrevious(persistedServices);
  const isInitialized = useMemo(
    () => !isUndefined(persistedServices) && areIssuesFiltersRehydrated,
    [persistedServices, areIssuesFiltersRehydrated]
  );
  const isNoEnvironments = useMemo(
    () => Boolean(!environments || environments.length === 0),
    [environments]
  );

  const isSelectedEnvironmentExist = useMemo(
    () =>
      Boolean(
        environment && environments?.find((x) => x.id === environment.id)
      ),
    [environment, environments]
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

  // Clear selected services when backend instance changed
  useEffect(() => {
    if (
      previousBackendInfo &&
      !areBackendInfosEqual(previousBackendInfo, backendInfo)
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
    if (isNoEnvironments || !isSelectedEnvironmentExist) {
      history.clear();
    }
  }, [isNoEnvironments, isSelectedEnvironmentExist]);

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
          case ScopeChangeEvent.HistoryNavigated:
            updateBrowserLocation(
              scope.context.payload?.location as HistoryEntryLocation
            );
            break;
          case ScopeChangeEvent.HistoryCleared:
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
          case ScopeChangeEvent.JaegerSpanLinkClicked:
          case ScopeChangeEvent.AssetsAssetCardTitleLinkClicked:
            goTo(`/${TAB_IDS.HIGHLIGHTS}`, { state });
            break;
          case ScopeChangeEvent.HighlightsTopIssuesCardItemClicked:
          case ScopeChangeEvent.HighlightsScalingCardItemClicked:
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          case ScopeChangeEvent.HighlightsPerformanceCardItemClicked:
          case ScopeChangeEvent.HighlightsImpactCardItemClicked:
            goTo(`/${TAB_IDS.ANALYTICS}`, { state });
            break;
          case ScopeChangeEvent.NavigationHomeButtonClicked:
            if (matchPath(window.location.pathname, TAB_IDS.ASSETS)) {
              goTo(`/${TAB_IDS.ASSETS}`, { state });
              break;
            }
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          case ScopeChangeEvent.AssetsEmptyCategoryParentLinkClicked:
            goTo(`/${TAB_IDS.ASSETS}`, { state });
            break;
          case ScopeChangeEvent.MetricsServiceSelected:
          case ScopeChangeEvent.MetricsEndpointSelected:
            goTo(`/${TAB_IDS.ISSUES}`, { state });
            break;
          case ScopeChangeEvent.IdeCodeLensClicked: {
            const url = getURLToNavigateOnCodeLensClick(scope);
            if (url) {
              goTo(url, { state });
              break;
            }
            defaultGoTo(scope, state);
            break;
          }
          case ScopeChangeEvent.ErrorCardLinkClicked: {
            const errorId = isScopeWithErrorDetailsIdContext(scope)
              ? "/" + scope.context.payload.id
              : "";

            goTo(`/${TAB_IDS.ERRORS}${errorId}`, { state });
            break;
          }
          case ScopeChangeEvent.IdeRestApiCall: {
            const url = getUrlToNavigateFromRestApiCall(scope);
            if (url) {
              goTo(url, { state });
              break;
            }
            defaultGoTo(scope, state);
            break;
          }
          case ScopeChangeEvent.DashboardSlowQueriesWidgetItemLinkClicked:
          case ScopeChangeEvent.DashboardClientSpansPerformanceImpactWidgetItemLinkClicked:
          case ScopeChangeEvent.NavigationCodeButtonClicked:
          case ScopeChangeEvent.HighlightsTopIssuesCardAssetLinkClicked:
          case ScopeChangeEvent.InsightsInsightCardTitleAssetLinkClicked:
          case ScopeChangeEvent.InsightsInsightCardAssetLinkClicked:
          case ScopeChangeEvent.TestsTestCardTitleLinkClicked:
          case ScopeChangeEvent.NotificationsNotificationCardAssetLinkClicked:
          case ScopeChangeEvent.RecentActivitySpanLinkClicked:
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
  }, [goTo, location, environment, updateBrowserLocation]);

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
