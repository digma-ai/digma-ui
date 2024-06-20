import { useContext, useEffect, useLayoutEffect } from "react";
import {
  Outlet,
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom";
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
import { SCOPE_CHANGE_EVENTS } from "./types";
export const Main = () => {
  const config = useContext(ConfigContext);
  const location = useLocation();
  logger.info("location", location);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleSetScope = (data: unknown) => {
      const scope = data as Scope;

      // TODO: Handle all change scope events
      // https://github.com/digma-ai/digma-ui/issues/851
      if (scope?.context) {
        switch (scope.context.event) {
          case SCOPE_CHANGE_EVENTS.IDE_RUNTIME_DATA_CODE_LENS_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.JAEGER_SPAN_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.ASSETS_ASSET_CARD_TITLE_LINK_CLICKED as string:
            navigate(`/${TAB_IDS.HIGHLIGHTS}`);
            break;
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_SCALING_CARD_ITEM_CLICKED as string:
            navigate(`/${TAB_IDS.ISSUES}`);
            break;
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_PERFORMANCE_CARD_ITEM_CLICKED as string: // TODO: verify
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_IMPACT_CARD_ITEM_CLICKED as string:
            navigate(`/${TAB_IDS.ANALYTICS}`);
            break;
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED as string:
            break;
          case SCOPE_CHANGE_EVENTS.NAVIGATION_HOME_BUTTON_CLICKED as string:
            if (matchPath(window.location.pathname, TAB_IDS.ASSETS)) {
              break;
            }
          // eslint-disable-next-line no-fallthrough
          case SCOPE_CHANGE_EVENTS.IDE_ISSUE_CODE_LENS_CLICKED as string: // TODO: verify
          case SCOPE_CHANGE_EVENTS.IDE_NOTIFICATION_LINK_CLICKED as string: // TODO: verify
          case SCOPE_CHANGE_EVENTS.DASHBOARD_SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NAVIGATION_ENVIRONMENT_MENU_ITEM_SELECTED as string:
          case SCOPE_CHANGE_EVENTS.NAVIGATION_CODE_BUTTON_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.HIGHLIGHTS_TOP_ISSUES_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.TESTS_TEST_CARD_TITLE_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.NOTIFICATIONS_NOTIFICATION_CARD_ASSET_LINK_CLICKED as string:
          case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_ENVIRONMENT_TAB_SELECTED as string:
          case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_SPAN_LINK_CLICKED as string:
          default:
            scope.issuesInsightsCount > 0
              ? navigate(`/${TAB_IDS.ISSUES}`)
              : navigate(`/${TAB_IDS.ANALYTICS}`);
        }
      }

      setSearchParams(
        {
          spanCodeObjectId: scope?.span?.spanCodeObjectId ?? "",
          environmentId: scope?.environmentId ?? ""
        },
        {
          replace: true
        }
      );
    };

    dispatcher.addActionListener(globalActions.SET_SCOPE, handleSetScope);

    return () => {
      dispatcher.removeActionListener(globalActions.SET_SCOPE, handleSetScope);
    };
  }, [navigate, setSearchParams]);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [config.userInfo?.id]);

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <Authentication />;
  }

  return (
    <s.Container>
      <Navigation />
      <s.ContentContainer>
        <Outlet />
      </s.ContentContainer>
    </s.Container>
  );
};
