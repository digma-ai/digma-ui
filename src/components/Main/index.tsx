import { useContext, useEffect, useLayoutEffect } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { logger } from "../../logging";
import { Navigation } from "../Navigation";
import { TAB_IDS } from "../Navigation/Tabs/types";
import { ConfigContext } from "../common/App/ConfigContext";
import { Scope } from "../common/App/types";
import { Authentication } from "./Authentication";
import { actions } from "./actions";
import * as s from "./styles";
import { isScopeWithCodeLensContext } from "./typeGuards";
import { SCOPE_CHANGE_EVENTS } from "./types";
import { useHistoryNavigation } from "./useHistoryNavigation";

export const MAIN_CONTAINER_ID = "mainContainer";

const getURLToNavigateOnCodeLensClick = (scope: Scope): string | undefined => {
  if (!isScopeWithCodeLensContext(scope)) {
    return;
  }

  const codeLens = scope.context.payload.codeLens;
  if (codeLens.scopeCodeObjectId.startsWith("span:")) {
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
  const config = useContext(ConfigContext);
  const { goTo } = useHistoryNavigation();

  useEffect(() => {
    const handleSetScope = (data: unknown) => {
      const scope = data as Scope;
      logger.debug("[SCOPE CHANGE]: ", scope);

      const state = {
        environmentId: scope.environmentId ?? config.environment?.id,
        spanCodeObjectId: scope.span?.spanCodeObjectId
      };

      if (scope?.context) {
        switch (scope.context.event) {
          case SCOPE_CHANGE_EVENTS.HISTORY as string:
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
          case SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED as string: {
            const url = getURLToNavigateOnCodeLensClick(scope);
            if (url) {
              goTo(url, { state });
            }
            break;
          }
          case SCOPE_CHANGE_EVENTS.NAVIGATION_HOME_BUTTON_CLICKED as string:
            if (matchPath(window.location.pathname, TAB_IDS.ASSETS)) {
              goTo(`/${TAB_IDS.ASSETS}`);
              break;
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
  }, [goTo, config.environment?.id, location]);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [config.userInfo?.id]);

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <Authentication />;
  }

  return (
    <s.Container id={MAIN_CONTAINER_ID}>
      <Navigation />
      <s.ContentContainer>{<Outlet />}</s.ContentContainer>
    </s.Container>
  );
};
