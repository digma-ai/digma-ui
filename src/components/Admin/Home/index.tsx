import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../containers/Admin/hooks";
import { useMount } from "../../../hooks/useMount";
import { setEnvironmentId } from "../../../redux/slices/scopeSlice";
import { IssuesSidebarOverlay } from "../common/IssuesSidebarOverlay";
import type { IssuesSidebarQuery } from "../common/IssuesSidebarOverlay/types";
import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

const ISSUES_LIMIT = 10;

export const Home = () => {
  const environmentId = useAdminSelector((state) => state.scope.environmentId);
  const dispatch = useAdminDispatch();
  const [issuesQuery, setIssuesQuery] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const environmentParam = searchParams.get("environment");
  const issuesParam = searchParams.get("issues");

  const queries: Record<string, IssuesSidebarQuery> = useMemo(
    () => ({
      "top-criticality": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: "criticality"
        },
        limit: ISSUES_LIMIT,
        title: "Top issues by criticality"
      },
      "top-severity": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: "severity"
        },
        limit: ISSUES_LIMIT,
        title: "Top issues by severity"
      }
    }),
    [environmentId]
  );

  const handleGetTopIssuesByCriticality = () => {
    setIssuesQuery("top-criticality");
  };

  const handleGetTopIssuesBySeverity = () => {
    setIssuesQuery("top-severity");
  };

  const handleIssuesSidebarClose = () => {
    setIssuesQuery(undefined);
  };

  useMount(() => {
    if (environmentParam) {
      dispatch(setEnvironmentId(environmentParam));
    }

    setIssuesQuery(issuesParam ?? undefined);
  });

  useEffect(() => {
    if (environmentId) {
      setSearchParams((params) => {
        params.set("environment", environmentId);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete("environment");
        return params;
      });
    }
  }, [setSearchParams, environmentId]);

  useEffect(() => {
    setSearchParams((params) => {
      if (issuesQuery) {
        params.set("issues", issuesQuery);
      } else {
        params.delete("issues");
      }
      return params;
    });
  }, [setSearchParams, issuesQuery]);

  const issuesSidebarQuery = issuesQuery ? queries[issuesQuery] : undefined;

  return (
    <s.Container>
      <Overview
        onGetTopIssuesByCriticality={handleGetTopIssuesByCriticality}
        onGetTopIssuesBySeverity={handleGetTopIssuesBySeverity}
      />
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
