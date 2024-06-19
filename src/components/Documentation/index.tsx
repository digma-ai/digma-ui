import { useEffect } from "react";
import { isString } from "../../typeGuards/isString";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { actions } from "./actions";
import { EnvironmentTypes } from "./pages/EnvironmentTypes";
import { Page } from "./pages/RunDigma/Page";
import { runDigmaWithCommandLine } from "./pages/RunDigma/runDigmaWithCommandLine";
import { runDigmaWithDocker } from "./pages/RunDigma/runDigmaWithDocker";
import { runDigmaWithGradleTasks } from "./pages/RunDigma/runDigmaWithGradleTasks";
import { trackingEvents } from "./tracking";
import { DocumentationProps } from "./types";

const pages: Record<string, JSX.Element> = {
  "run-digma-with-terminal": <Page {...runDigmaWithCommandLine} />,
  "run-digma-with-docker": <Page {...runDigmaWithDocker} />,
  "run-digma-with-gradle-tasks": <Page {...runDigmaWithGradleTasks} />,
  "environment-types": <EnvironmentTypes />
};

const initialPage = isString(window.documentationPage)
  ? window.documentationPage
  : undefined;

export const Documentation = ({ page = initialPage }: DocumentationProps) => {
  const pageContent = page ? pages[page] : undefined;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED, { page });
  }, []);

  return <>{pageContent}</>;
};
