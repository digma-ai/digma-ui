import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../containers/Admin/hooks";
import { useMount } from "../../../hooks/useMount";
import {
  setSelectedEnvironmentId,
  setSelectedServices
} from "../../../redux/slices/issuesReportSlice";
import { SORTING_CRITERION } from "../../Insights/InsightsCatalog/types";
import { IssuesSidebarOverlay } from "../common/IssuesSidebarOverlay";
import type { IssuesSidebarQuery } from "../common/IssuesSidebarOverlay/types";
import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

const ISSUES_LIMIT = 10;

export const Home = () => {
  const environmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const dispatch = useAdminDispatch();
  const [issuesQuery, setIssuesQuery] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const environmentParam = searchParams.get("environment");
  const issuesParam = searchParams.get("issues");
  const servicesParam = useMemo(
    () => searchParams.getAll("services"),
    [searchParams]
  );

  const queries: Record<string, IssuesSidebarQuery> = useMemo(
    () => ({
      "top-criticality": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: SORTING_CRITERION.CRITICALITY,
          services: selectedServices
        },
        limit: ISSUES_LIMIT,
        title: "Top issues by criticality"
      },
      "top-severity": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: SORTING_CRITERION.SEVERITY,
          services: selectedServices
        },
        limit: ISSUES_LIMIT,
        title: "Top issues by severity"
      }
    }),
    [environmentId, selectedServices]
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
      dispatch(setSelectedEnvironmentId(environmentParam));
    }

    if (servicesParam.length > 0) {
      dispatch(setSelectedServices(servicesParam));
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
      params.delete("services");
      selectedServices.forEach((service) => params.append("services", service));
      return params;
    });
  }, [setSearchParams, selectedServices]);

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
