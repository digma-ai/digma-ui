import { useEffect } from "react";
import { isString } from "../../typeGuards/isString";
import { addPrefix } from "../../utils/addPrefix";
import { Page } from "./Page";
import { runDigmaWithCommandLine } from "./pages/runDigmaWithCommandLine";
import { runDigmaWithDocker } from "./pages/runDigmaWithDocker";
import { runDigmaWithGradleTasks } from "./pages/runDigmaWithGradleTasks";
import { PageContent } from "./pages/types";
import * as s from "./styles";
import { DocumentationProps } from "./types";

const ACTION_PREFIX = "DOCUMENTATION";

const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE"
});

const pages: Record<string, PageContent> = {
  "run-digma-with-terminal": runDigmaWithCommandLine,
  "run-digma-with-docker": runDigmaWithDocker,
  "run-digma-with-gradle-tasks": runDigmaWithGradleTasks
};

const initialPage = isString(window.documentationPage)
  ? window.documentationPage
  : undefined;

export const Documentation = (props: DocumentationProps) => {
  const page = props.page || initialPage;
  const pageContent = page ? pages[page] : undefined;

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  return <s.Container>{pageContent && <Page {...pageContent} />}</s.Container>;
};
