import { useEffect, useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { useMount } from "../../../../hooks/useMount";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetAboutQuery,
  useGetEnvironmentsQuery,
  useGetServiceEndpointsQuery
} from "../../../../redux/services/digma";
import type {
  EndpointData,
  IssueCriticality
} from "../../../../redux/services/types";
import {
  DEFAULT_TIME_PERIOD_IN_DAYS,
  isIssueCriticality,
  isIssuesReportTimeMode,
  isIssuesReportViewMode,
  setCriticalityLevels,
  setPeriodInDays,
  setSelectedEndpoints,
  setSelectedEnvironmentId,
  setSelectedService,
  setSelectedServices,
  setTimeMode,
  setViewMode,
  type IssuesReportTimeMode,
  type IssuesReportViewLevel,
  type IssuesReportViewMode
} from "../../../../redux/slices/issuesReportSlice";
import { isNull } from "../../../../typeGuards/isNull";
import { FeatureFlag } from "../../../../types";
import { IssuesReport } from "../../../common/IssuesReport";
import type { TargetScope } from "../../../common/IssuesReport/types";
import { RepositorySidebarOverlay } from "../../common/RepositorySidebarOverlay";
import type { RepositorySidebarQuery } from "../../common/RepositorySidebarOverlay/types";
import * as s from "./styles";

export const MIN_SIDEBAR_WIDTH = 382; // in pixels
export const MAX_SIDEBAR_WIDTH = 640; // in pixels
export const DEFAULT_SIDEBAR_WIDTH_RATIO = 0.33;

export const getIssuesPage = (value: string | null): number => {
  if (isNull(value)) {
    return 0;
  }

  const parsedValue = Number.parseInt(value);
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue - 1 : 0;
};

export const getScope = (value: string | null): TargetScope | undefined =>
  value ? { value } : undefined;

export const isValidPeriodInDays = (value: string | null): boolean => {
  if (!value) {
    return false;
  }

  return [1, DEFAULT_TIME_PERIOD_IN_DAYS].includes(Number.parseInt(value));
};

export const getDefaultSidebarWidth = (windowWidth: number) => {
  const defaultWidth = windowWidth * DEFAULT_SIDEBAR_WIDTH_RATIO;
  if (defaultWidth > MAX_SIDEBAR_WIDTH) {
    return MAX_SIDEBAR_WIDTH;
  }

  if (defaultWidth < MIN_SIDEBAR_WIDTH) {
    return MIN_SIDEBAR_WIDTH;
  }

  return defaultWidth;
};

export const CodeIssues = () => {
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const criticalityLevels = useAdminSelector(
    (state) => state.codeIssuesReport.criticalityLevels
  );
  const periodInDays = useAdminSelector(
    (state) => state.codeIssuesReport.periodInDays
  );
  const selectedService = useAdminSelector(
    (state) => state.codeIssuesReport.selectedService
  );
  const selectedServices = useAdminSelector(
    (state) => state.codeIssuesReport.selectedServices
  );
  const viewMode = useAdminSelector((state) => state.codeIssuesReport.viewMode);
  const timeMode = useAdminSelector((state) => state.codeIssuesReport.timeMode);
  const selectedEndpoints = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEndpoints
  );

  const dispatch = useAdminDispatch();

  const [searchParams, setSearchParams] = useStableSearchParams();
  const [scope, setScope] = useState<TargetScope | undefined>(
    getScope(searchParams.get("sidebar-scope"))
  );

  const environmentParam = searchParams.get("environment");
  const viewModeParam = searchParams.get("view-mode");
  const timeModeParam = searchParams.get("time-mode");
  const criticalityParam = useMemo(
    () => searchParams.getAll("criticality"),
    [searchParams]
  );
  const periodInDaysParam = searchParams.get("period-in-days");
  const servicesParam = useMemo(
    () => searchParams.getAll("services"),
    [searchParams]
  );
  const serviceParam = searchParams.get("service");
  const endpointsParam = useMemo(
    () => searchParams.getAll("endpoints"),
    [searchParams]
  );

  const { data: about } = useGetAboutQuery();
  const { data: environments } = useGetEnvironmentsQuery();

  const { data: serviceEndpoints } = useGetServiceEndpointsQuery(
    {
      service: selectedService ?? "",
      environment: selectedEnvironmentId ?? ""
    },
    {
      skip: !selectedEnvironmentId || !selectedService
    }
  );

  const handleTileTitleClick = (
    viewLevel: IssuesReportViewLevel,
    target: TargetScope
  ) => {
    if (viewMode === "table" && viewLevel === "endpoints") {
      const spanId = serviceEndpoints?.endpoints.find(
        (x) => x.spanCodeObjectId === target.value
      )?.uid;

      setScope({
        ...target,
        value: spanId ?? target.value
      });
    }
  };

  const handleTileIssuesStatsClick = (
    viewLevel: IssuesReportViewLevel,
    timeMode: IssuesReportTimeMode,
    target: TargetScope
  ) => {
    const spanId =
      viewLevel === "endpoints"
        ? serviceEndpoints?.endpoints.find(
            (x) => x.spanCodeObjectId === target.value
          )?.uid
        : undefined;

    setScope({
      ...target,
      value: spanId ?? target.value
    });
  };

  const handleRepositorySidebarClose = () => {
    setScope(undefined);
  };

  const handleSelectedEnvironmentIdChange = (environmentId: string) => {
    dispatch(setSelectedEnvironmentId(environmentId));
  };

  const handleSelectedServicesChange = (services: string[]) => {
    dispatch(setSelectedServices(services));
  };

  const handleSelectedEndpointsChange = (endpoints: EndpointData[]) => {
    dispatch(setSelectedEndpoints(endpoints));
  };

  const handleCriticalityLevelsChange = (criticalities: IssueCriticality[]) => {
    dispatch(setCriticalityLevels(criticalities));
  };

  const handlePeriodInDaysChange = (periodInDays: number) => {
    dispatch(setPeriodInDays(periodInDays));
  };

  const handleTimeModeChange = (timeMode: IssuesReportTimeMode) => {
    dispatch(setTimeMode(timeMode));
  };

  const handleViewModeChange = (viewMode: IssuesReportViewMode) => {
    dispatch(setViewMode(viewMode));
  };

  const handleSelectedServiceChange = (service: string | null) => {
    dispatch(setSelectedService(service));
    dispatch(setSelectedEndpoints([]));
  };

  // TODO: replace with useEffect
  useMount(() => {
    if (environmentParam) {
      dispatch(setSelectedEnvironmentId(environmentParam));
    }

    if (isIssuesReportViewMode(viewModeParam)) {
      dispatch(setViewMode(viewModeParam));
    }

    if (isIssuesReportTimeMode(timeModeParam)) {
      dispatch(setTimeMode(timeModeParam));
    }

    if (
      criticalityParam.length > 0 &&
      criticalityParam.every(isIssueCriticality)
    ) {
      dispatch(setCriticalityLevels(criticalityParam));
    }

    if (isValidPeriodInDays(periodInDaysParam)) {
      dispatch(setPeriodInDays(Number(periodInDaysParam)));
    }

    if (servicesParam.length > 0) {
      dispatch(setSelectedServices(servicesParam));
    }

    dispatch(setSelectedService(serviceParam));
  });

  useEffect(() => {
    if (serviceEndpoints?.endpoints) {
      const selectedEndpoints = serviceEndpoints.endpoints.filter((endpoint) =>
        endpointsParam.includes(endpoint.uid ?? endpoint.spanCodeObjectId)
      );
      dispatch(setSelectedEndpoints(selectedEndpoints));
    }
  }, [dispatch, serviceEndpoints?.endpoints, endpointsParam]);

  useEffect(() => {
    if (selectedEnvironmentId) {
      setSearchParams((params) => {
        params.set("environment", selectedEnvironmentId);
        return params;
      });
    }
  }, [setSearchParams, selectedEnvironmentId]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("view-mode", viewMode);
      return params;
    });
  }, [setSearchParams, viewMode]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("time-mode", timeMode);
      return params;
    });
  }, [setSearchParams, timeMode]);

  useEffect(() => {
    setSearchParams((params) => {
      params.delete("criticality");
      criticalityLevels.forEach((criticality) =>
        params.append("criticality", criticality)
      );
      return params;
    });
  }, [setSearchParams, criticalityLevels]);

  useEffect(() => {
    setSearchParams((params) => {
      if (timeMode === "baseline") {
        params.delete("period-in-days");
      }
      if (timeMode === "changes") {
        params.set("period-in-days", String(periodInDays));
      }
      return params;
    });
  }, [setSearchParams, timeMode, periodInDays]);

  useEffect(() => {
    setSearchParams((params) => {
      if (selectedService) {
        params.set("service", selectedService);
        params.delete("endpoints");
        selectedEndpoints.forEach((endpoint) =>
          params.append("endpoints", endpoint.uid ?? endpoint.spanCodeObjectId)
        );
      } else {
        params.delete("service");
        params.delete("endpoints");
        params.delete("services");
        selectedServices.forEach((service) =>
          params.append("services", service)
        );
      }
      return params;
    });
  }, [setSearchParams, selectedService, selectedServices, selectedEndpoints]);

  useEffect(() => {
    setSearchParams((params) => {
      if (scope?.value) {
        params.set("sidebar-scope", scope.value);
      } else {
        params.delete("sidebar-scope");
      }
      return params;
    });
  }, [setSearchParams, scope?.value]);

  const viewLevel: IssuesReportViewLevel = selectedService
    ? "endpoints"
    : "services";

  const spanCodeObjectId = useMemo(
    () =>
      selectedService && scope?.value
        ? serviceEndpoints?.endpoints.find((x) =>
            x.uid ? x.uid === scope.value : x.spanCodeObjectId === scope.value
          )?.spanCodeObjectId
        : undefined,
    [scope?.value, selectedService, serviceEndpoints?.endpoints]
  );

  const activeTileIds = useMemo(() => {
    if (!scope?.value) {
      return undefined;
    }

    const id = spanCodeObjectId ?? scope.value;

    return id ? [id] : undefined;
  }, [spanCodeObjectId, scope?.value]);

  const isRepositorySidebarOpen = Boolean(scope);

  const isCriticalityLevelsFilterEnabled = getFeatureFlagValue(
    about,
    FeatureFlag.IsIssuesCriticalityLevelsFilterEnabled
  );

  const isIssuesLastDaysFilterEnabled = getFeatureFlagValue(
    about,
    FeatureFlag.IsIssuesLastDaysFilterEnabled
  );

  const repositorySidebarQuery: RepositorySidebarQuery = useMemo(
    () => ({
      query: {
        environment: selectedEnvironmentId ?? undefined,
        scopedSpanCodeObjectId: spanCodeObjectId,
        services: selectedService
          ? [selectedService]
          : scope?.value
          ? [scope.value]
          : [],
        ...(isCriticalityLevelsFilterEnabled
          ? { criticalityFilter: criticalityLevels }
          : {}),
        lastDays:
          isIssuesLastDaysFilterEnabled && timeMode === "changes"
            ? periodInDays
            : undefined
      }
    }),
    [
      scope?.value,
      selectedEnvironmentId,
      selectedService,
      spanCodeObjectId,
      isCriticalityLevelsFilterEnabled,
      criticalityLevels,
      periodInDays,
      timeMode,
      isIssuesLastDaysFilterEnabled
    ]
  );

  return (
    <s.Container>
      <IssuesReport
        backendInfo={about}
        environments={environments}
        selectedEnvironmentId={selectedEnvironmentId}
        criticalityLevels={criticalityLevels}
        periodInDays={periodInDays}
        selectedService={selectedService}
        selectedServices={selectedServices}
        selectedEndpoints={selectedEndpoints}
        viewLevel={viewLevel}
        viewMode={viewMode}
        timeMode={timeMode}
        defaultHeaderTitle={"Code Issues"}
        onTileTitleClick={handleTileTitleClick}
        onTileIssuesStatsClick={handleTileIssuesStatsClick}
        onSelectedEnvironmentIdChange={handleSelectedEnvironmentIdChange}
        onSelectedServicesChange={handleSelectedServicesChange}
        onSelectedEndpointsChange={handleSelectedEndpointsChange}
        onCriticalityLevelsChange={handleCriticalityLevelsChange}
        onPeriodInDaysChange={handlePeriodInDaysChange}
        onTimeModeChange={handleTimeModeChange}
        onViewModeChange={handleViewModeChange}
        onSelectedServiceChange={handleSelectedServiceChange}
        activeTileIds={activeTileIds}
        showEnvironmentSelect={false}
        showServicesSelect={false}
      />
      <RepositorySidebarOverlay
        isSidebarOpen={isRepositorySidebarOpen}
        onSidebarClose={handleRepositorySidebarClose}
        sidebarQuery={repositorySidebarQuery}
      />
    </s.Container>
  );
};
