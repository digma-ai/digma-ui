import { useContext, useLayoutEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { Assets } from "../Assets";
import { Highlights } from "../Highlights";
import { Insights } from "../Insights";
import { SetViewsPayload } from "../Navigation/types";
import { Tests } from "../Tests";
import { ConfigContext } from "../common/App/ConfigContext";
import { Authentication } from "./Authentication";
import { actions } from "./actions";
import { isView } from "./typeGuards";
import { View } from "./types";

export const Main = () => {
  const [view, setView] = useState<View>("insights");
  const config = useContext(ConfigContext);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    const handleSetViewsData = (data: unknown) => {
      const payload = data as SetViewsPayload;
      const view = payload.views.find((x) => x.isSelected);
      if (view && isView(view?.id)) {
        setView(view.id);
      }
    };

    dispatcher.addActionListener(actions.SET_VIEWS, handleSetViewsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_VIEWS, handleSetViewsData);
    };
  }, [config.userInfo?.id]);

  if (!config.userInfo?.id && config.backendInfo?.centralize) {
    return <Authentication />;
  }

  switch (view) {
    case "highlights":
      return <Highlights />;
    case "insights":
      return <Insights insightViewType={"Issues"} key={"insights"} />;
    case "assets":
      return <Assets />;
    case "analytics":
      return <Insights insightViewType={"Analytics"} key={"analytics"} />;
    case "tests":
      return <Tests />;
    default:
      return null;
  }
};
