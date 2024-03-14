import { useLayoutEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { Assets } from "../Assets";
import { Insights } from "../Insights";
import { SetViewsPayload } from "../Navigation/types";
import { Tests } from "../Tests";
import { actions } from "./actions";
import { isView } from "./typeGuards";
import { View } from "./types";

export const Main = () => {
  const [view, setView] = useState<View>("insights");

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
  }, []);

  switch (view) {
    case "insights":
      return <Insights insightViewType={"Issues"} />;
    case "assets":
      return <Assets />;
    case "analytics":
      return <Insights insightViewType={"Analytics"} />;
    case "tests":
      return <Tests />;
  }
};
