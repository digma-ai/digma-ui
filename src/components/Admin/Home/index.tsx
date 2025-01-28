import { useState } from "react";
import { IssuesSidebarOverlay } from "../common/IssuesSidebarOverlay";
import type { IssuesSidebarQuery } from "../common/IssuesSidebarOverlay/types";
import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

export const Home = () => {
  const [issuesSidebarQuery, setIssuesSidebarQuery] =
    useState<IssuesSidebarQuery>();

  const handleIssuesSidebarClose = () => {
    setIssuesSidebarQuery(undefined);
  };

  const handleGetIssues = (query: IssuesSidebarQuery) => {
    setIssuesSidebarQuery(query);
  };

  return (
    <s.Container>
      <Overview onGetIssues={handleGetIssues} />
      <Reports />
      <Environments />
      <IssuesSidebarOverlay
        issuesSidebarQuery={issuesSidebarQuery}
        isSidebarOpen={Boolean(issuesSidebarQuery)}
        onSidebarClose={handleIssuesSidebarClose}
      />
    </s.Container>
  );
};
