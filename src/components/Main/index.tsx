import { useContext, useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { logger } from "../../logging";
import { Navigation } from "../Navigation";
import { ConfigContext } from "../common/App/ConfigContext";
import { Authentication } from "./Authentication";
import { actions } from "./actions";
import * as s from "./styles";

export const Main = () => {
  // const [view, setView] = useState<ViewData>({ id: ROUTES.INSIGHTS });
  const config = useContext(ConfigContext);
  logger.info("location", window.location.href);

  useEffect(() => {
    // TODO: Handle all change scope events
    // https://github.com/digma-ai/digma-ui/issues/851
    // if (config.scope?.context) {
    //   switch (config.scope.context.event) {
    //     case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_ENVIRONMENT_SELECT as string:
    //     case SCOPE_CHANGE_EVENTS.RECENT_ACTIVITY_SPAN_SELECT as string:
    //     default:
    //       config.scope.issuesInsightsCount > 0
    //         ? setView({ id: ROUTES.INSIGHTS })
    //         : setView({ id: ROUTES.ANALYTICS });
    //   }
    // }
  }, [config.scope]);

  // const handleViewChange = (viewId: string) => {
  //   setView({ id: viewId });
  // };

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, [config.userInfo?.id]);

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <Authentication />;
  }

  // const renderContent = () => {
  //   switch (view.id) {
  //     case ROUTES.HIGHLIGHTS:
  //       return <Highlights />;
  //     case ROUTES.INSIGHTS:
  //       return <Insights insightViewType={"Issues"} key={"insights"} />;
  //     case ROUTES.ASSETS:
  //       return <Assets selectedTypeId={view.path} />;
  //     case ROUTES.ANALYTICS:
  //       return <Insights insightViewType={"Analytics"} key={"analytics"} />;
  //     case ROUTES.ERRORS:
  //       return <Errors errorId={view.path} />;
  //     case ROUTES.TESTS:
  //       return <Tests />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <s.Container>
      <Navigation />
      <s.ContentContainer>
        <Outlet />
      </s.ContentContainer>
    </s.Container>
  );
};
