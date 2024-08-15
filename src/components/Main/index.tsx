import { useEffect, useLayoutEffect } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { actions as globalActions } from "../../actions";
import { history } from "../../containers/Main/history";
import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { dispatcher } from "../../dispatcher";
import { HistoryEntryLocation } from "../../history/History";
import { usePrevious } from "../../hooks/usePrevious";
import { logger } from "../../logging";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { Navigation } from "../Navigation";
import { TAB_IDS } from "../Navigation/Tabs/types";
import { Scope } from "../common/App/types";
import { Authentication } from "./Authentication";
import { actions } from "./actions";
import * as s from "./styles";
import { isScopeWithCodeLensContext } from "./typeGuards";
import { HistoryState, SCOPE_CHANGE_EVENTS } from "./types";
import { useBrowserLocationUpdater } from "./updateBrowserLocationUpdater";
import { useHistory } from "./useHistory";

export const MAIN_CONTAINER_ID = "mainContainer";
// const ASSETS_FILTERS_PERSISTENCE_KEY = "assetsFilters";

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

export const Main = () => {
  const location = useLocation();
  const environments = useGlobalStore.use.environments();
  const environment = useGlobalStore.use.environment();
  const scope = useGlobalStore.use.scope();
  // const previousEnvironment = usePrevious(environment);
  // const previousScope = usePrevious(scope);
  const userInfo = useGlobalStore.use.userInfo();
  const userId = userInfo?.id;
  const previousUserId = usePrevious(userId);
  const backendInfo = useGlobalStore.use.backendInfo();
  const { goTo } = useHistory();
  const updateBrowserLocation = useBrowserLocationUpdater();
  // const assetsStore = useAssetsStore();

  // const assetsFilters = useAssetsStore.use.filters();
  // const previousAssetsFilters = usePrevious(assetsFilters);
  // const setAssetsFilters = useAssetsStore.use.setFilters();
  // const [areAssetsFiltersRehydrated, setAreAssetsFiltersRehydrated] =
  // useState(true);
  // const [persistedAssetsFilters, setPersistedAssetsFilters] =
  // usePersistence<AssetFilterQuery>(ASSETS_FILTERS_PERSISTENCE_KEY, "project");
  // const previousAssetsPersistedFilters = usePrevious(persistedAssetsFilters);
  // const isInitialized = areAssetsFiltersRehydrated;

  // Rehydrate assets filters from persistence
  // useEffect(() => {
  //   if (
  //     isUndefined(previousAssetsPersistedFilters) &&
  //     !isUndefined(persistedAssetsFilters)
  //   ) {
  //     // Temporary disabled rehydration of filters
  //     // const filters = persistedAssetsFilters ?? assetsFilters;
  //     // setAssetsFilters(filters);
  //     setAreAssetsFiltersRehydrated(true);

  //     // const currentHistoryEntry = history.getCurrentLocation();

  //     // if (currentHistoryEntry) {
  //     //   history.replaceEntry(currentHistoryEntry.location, {
  //     //     ...currentHistoryEntry?.state,
  //     //     assets: currentHistoryEntry?.state?.assets
  //     //       ? {
  //     //           ...currentHistoryEntry?.state?.assets,
  //     //           filters
  //     //         }
  //     //       : {
  //     //           page: initialState.page,
  //     //           search: initialState.search,
  //     //           sorting: initialState.sorting,
  //     //           viewMode: initialState.viewMode,
  //     //           filters
  //     //         }
  //     //   });
  //     // }
  //   }
  // }, [
  //   previousAssetsPersistedFilters,
  //   persistedAssetsFilters,
  //   setAssetsFilters,
  //   assetsFilters
  // ]);

  // Persist assets filters on its change
  // useEffect(() => {
  //   if (previousAssetsFilters !== assetsFilters && areAssetsFiltersRehydrated) {
  //     setPersistedAssetsFilters(assetsFilters);
  //   }
  // }, [
  //   previousAssetsFilters,
  //   assetsFilters,
  //   setPersistedAssetsFilters,
  //   areAssetsFiltersRehydrated,
  //   persistedAssetsFilters
  // ]);

  // Clear filters when the environment or scope changes
  // useEffect(() => {
  //   if (
  //     Boolean(
  //       previousEnvironment?.id && previousEnvironment?.id !== environment?.id
  //     ) ||
  //     (previousScope && previousScope !== scope)
  //   ) {
  //     assetsStore.setFilters(initialState.filters);
  //     assetsStore.setPage(initialState.page);
  //     assetsStore.setSorting(initialState.sorting);
  //     assetsStore.setViewMode(initialState.viewMode);
  //     assetsStore.setSearch(initialState.search);
  //   }
  // }, [previousEnvironment, environment, previousScope, scope, assetsStore]);

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
          case SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED as string: {
            const url = getURLToNavigateOnCodeLensClick(scope);
            if (url) {
              goTo(url, { state });
              break;
            }
          }
          // falls through
          case SCOPE_CHANGE_EVENTS.DASHBOARD_SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NAVIGATION_CODE_BUTTON_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.TESTS_TEST_CARD_TITLE_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NOTIFICATIONS_NOTIFICATION_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_SPAN_LINK_CLICKED as string:
          default:
            scope.issuesInsightsCount > 0
              ? goTo(`/${TAB_IDS.ISSUES}`, { state })
              : goTo(`/${TAB_IDS.ANALYTICS}`, { state });
        }
      } else {
        goTo(location, { state });
      }
    };

    dispatcher.addActionListener(globalActions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
    };
  }, [goTo, location, environments, environment, updateBrowserLocation]);

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

  // if (!isInitialized) {
  //   return null;
  // }

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
