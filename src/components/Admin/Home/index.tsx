import { useEffect, useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../containers/Admin/hooks";
import { useMount } from "../../../hooks/useMount";
import { useStableSearchParams } from "../../../hooks/useStableSearchParams";
import { InsightsSortingCriterion } from "../../../redux/services/types";
import {
  setSelectedEnvironmentId,
  setSelectedServices
} from "../../../redux/slices/issuesReportSlice";
import { RepositorySidebarOverlay } from "../common/RepositorySidebarOverlay";
import type { RepositorySidebarQuery } from "../common/RepositorySidebarOverlay/types";
import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

export const Home = () => {
  const environmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const dispatch = useAdminDispatch();
  const [issuesQuery, setIssuesQuery] = useState<string>();
  const [searchParams, setSearchParams] = useStableSearchParams();
  const environmentParam = searchParams.get("environment");
  const issuesParam = searchParams.get("issues");
  const servicesParam = useMemo(
    () => searchParams.getAll("services"),
    [searchParams]
  );

  const queries: Record<string, RepositorySidebarQuery> = useMemo(
    () => ({
      "top-criticality": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: InsightsSortingCriterion.Criticality,
          services: selectedServices
        }
      },
      "top-severity": {
        query: {
          environment: environmentId ?? undefined,
          sortBy: InsightsSortingCriterion.Severity,
          services: selectedServices
        }
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

  const handleRepositorySidebarClose = () => {
    setIssuesQuery(undefined);
  };

  // TODO: replace with useEffect
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

  const repositorySidebarQuery = issuesQuery ? queries[issuesQuery] : undefined;

  return (
    <s.Container>
      <Overview
        onGetTopIssuesByCriticality={handleGetTopIssuesByCriticality}
        onGetTopIssuesBySeverity={handleGetTopIssuesBySeverity}
      />
      <Reports />
      <Environments />
      <RepositorySidebarOverlay
        sidebarQuery={repositorySidebarQuery}
        isSidebarOpen={Boolean(repositorySidebarQuery)}
        onSidebarClose={handleRepositorySidebarClose}
      />
    </s.Container>
  );
};
