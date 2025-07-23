import { useEffect, useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../containers/Admin/hooks";
import { useMount } from "../../../hooks/useMount";
import { useStableSearchParams } from "../../../hooks/useStableSearchParams";
import { useGetSpanByIdQuery } from "../../../redux/services/digma";
import { InsightsSortingCriterion } from "../../../redux/services/types";
import {
  setSelectedEnvironmentId,
  setSelectedServices
} from "../../../redux/slices/issuesReportSlice";
import { RepositorySidebarOverlay } from "../common/RepositorySidebarOverlay";
import type {
  RepositorySidebarQuery,
  TabLocation
} from "../common/RepositorySidebarOverlay/types";
import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

const getRepositorySidebarLocation = (
  locationParam: string | null
): TabLocation | undefined => {
  if (!locationParam) {
    return undefined;
  }

  try {
    const parsedLocation = JSON.parse(locationParam) as TabLocation;
    return parsedLocation;
  } catch {
    return undefined;
  }
};

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
  const [sidebarScope, setSidebarScope] = useState(
    searchParams.get("sidebar-scope") ?? undefined
  );
  const [sidebarLocation, setSidebarLocation] = useState(
    getRepositorySidebarLocation(searchParams.get("sidebar-view"))
  );
  const servicesParam = useMemo(
    () => searchParams.getAll("services"),
    [searchParams]
  );

  const { data: spanInfo } = useGetSpanByIdQuery(
    {
      id: sidebarScope ?? ""
    },
    {
      skip: !sidebarScope
    }
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
    setSidebarScope(undefined);
    setSidebarLocation(undefined);
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

  useEffect(() => {
    setSearchParams((params) => {
      if (sidebarScope) {
        params.set("sidebar-scope", sidebarScope);
      } else {
        params.delete("sidebar-scope");
      }
      return params;
    });
  }, [setSearchParams, sidebarScope]);

  useEffect(() => {
    setSearchParams((params) => {
      if (sidebarLocation) {
        params.set("sidebar-view", JSON.stringify(sidebarLocation));
      } else {
        params.delete("sidebar-view");
      }
      return params;
    });
  }, [setSearchParams, sidebarLocation]);

  const repositorySidebarQuery: RepositorySidebarQuery | undefined =
    sidebarScope && spanInfo
      ? {
          query: {
            environment: environmentId ?? undefined,
            scopedSpanCodeObjectId: spanInfo?.spanCodeObjectId
          }
        }
      : sidebarLocation
        ? {
            query: {
              environment: environmentId ?? undefined
            }
          }
        : issuesQuery
          ? queries[issuesQuery]
          : undefined;
  const isRepositorySidebarOpen = Boolean(
    repositorySidebarQuery ?? sidebarLocation
  );

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
        sidebarLocation={sidebarLocation}
        isSidebarOpen={isRepositorySidebarOpen}
        onSidebarClose={handleRepositorySidebarClose}
      />
    </s.Container>
  );
};
