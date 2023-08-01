import { isString } from "../../typeGuards/isString";
import { Page } from "./Page";
import { runDigmaWithTerminal } from "./pages/runDigmaWithTerminal";
import { PageContent } from "./pages/types";
import * as s from "./styles";
import { DocumentationProps } from "./types";

const pages: Record<string, PageContent> = {
  "run-digma-with-terminal": { title: "Run Digma via Terminal", sections: [] },
  "run-digma-with-docker": runDigmaWithTerminal,
  "run-digma-with-gradle-tasks": {
    title: "Run Digma using Gradle tasks",
    sections: []
  }
};

const initialPage = isString(window.documentationPage)
  ? window.documentationPage
  : undefined;

export const Documentation = (props: DocumentationProps) => {
  const page = props.page || initialPage;
  const pageContent = page ? pages[page] : undefined;

  return <s.Container>{pageContent && <Page {...pageContent} />}</s.Container>;
};
