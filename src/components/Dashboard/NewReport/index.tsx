import { useLayoutEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isNull } from "../../../typeGuards/isNull";
import { FeatureFlag, SCOPE_CHANGE_EVENTS } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
import { actions } from "../actions";
import { Chart } from "./Chart";
import { EmptyState } from "./EmptyState";
import { MetricsTable } from "./MetricsTable";
import { ReportHeader } from "./ReportHeader";
import { ReportTimeMode, ReportViewMode } from "./ReportHeader/types";
import * as s from "./styles";
import {
  EndpointData,
  ReportFilterQuery,
  ReportViewLevel,
  ScoreCriterion,
  ServiceData
} from "./types";
import { useEndpointsIssuesData } from "./useEndpointsIssuesData";
import { useReportsData } from "./useReportsData";
import { transformEndpointsData, transformServicesData } from "./utils";

const DefaultQuery: ReportFilterQuery = {
  environmentId: "",
  services: [],
  lastDays: null,
  criticalities: []
};

export const NewReport = () => {
  const { environments } = useConfigSelector();
  const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  const [selectedService, setSelectedService] = useState<string>();
  const { data: servicesData } = useReportsData(query, !selectedService);
  const endpointsIssuesQuery = useMemo(
    () => ({
      ...query,
      services: selectedService ? [selectedService] : []
    }),
    [query, selectedService]
  );
  const { data: endpointsData } = useEndpointsIssuesData(
    endpointsIssuesQuery,
    Boolean(query.environmentId && selectedService)
  );
  const [viewMode, setViewMode] = useState<ReportViewMode>("treemap");
  const { backendInfo } = useConfigSelector();
  const isCriticalityEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_METRICS_REPORT_CRITICALITY_ENABLED
  );
  const isEndpointViewEnabled = getFeatureFlagValue(
    backendInfo,
    FeatureFlag.IS_METRICS_REPORT_ENDPOINT_VIEW_ENABLED
  );
  const scoreCriterion: ScoreCriterion = isCriticalityEnabled
    ? "criticality"
    : "impact";
  const viewLevel: ReportViewLevel =
    isEndpointViewEnabled && selectedService ? "endpoints" : "services";
  const timeMode: ReportTimeMode = isNull(query.lastDays)
    ? "baseline"
    : "changes";

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  const handleFilterChanged = (query: ReportFilterQuery) => {
    setQuery(query);
  };

  const handleViewModeChange = (value: ReportViewMode) => {
    setViewMode(value);
  };

  const goToEndpointIssues = ({
    spanCodeObjectId,
    service,
    environmentId
  }: {
    spanCodeObjectId: string;
    service: string;
    environmentId: string;
  }) => {
    changeScope({
      span: {
        spanCodeObjectId
      },
      environmentId,
      context: {
        event: SCOPE_CHANGE_EVENTS.METRICS_ENDPOINT_SELECTED,
        payload: {
          service
        }
      }
    });
  };

  const handleTitleClick = (value: string) => {
    if (viewLevel === "services") {
      setSelectedService(value);
    }

    if (viewLevel === "endpoints" && query.environmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: value,
        service: selectedService,
        environmentId: query.environmentId
      });
    }
  };

  const handleIssuesStatsClick = (value: string) => {
    if (viewLevel === "services") {
      changeScope({
        span: null,
        environmentId: query.environmentId ?? undefined,
        context: {
          event: SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
          payload: {
            service: value
          }
        }
      });
    }

    if (viewLevel === "endpoints" && query.environmentId && selectedService) {
      goToEndpointIssues({
        spanCodeObjectId: value,
        service: selectedService,
        environmentId: query.environmentId
      });
    }
  };

  const handleGoBack = () => {
    setSelectedService(undefined);
  };

  const data =
    (viewLevel === "services"
      ? servicesData?.reports
      : endpointsData?.reports) ?? [];
  const transformedData =
    viewLevel === "services"
      ? transformServicesData(data as ServiceData[], scoreCriterion)
      : transformEndpointsData(data as EndpointData[], scoreCriterion);

  const renderContent = () => {
    if (
      (viewLevel === "services" && !servicesData) ||
      (viewLevel === "endpoints" && !endpointsData)
    ) {
      return <EmptyState type={"loading"} />;
    }

    if (data.length === 0) {
      if (viewLevel === "services") {
        return <EmptyState type={"noServices"} />;
      }

      if (viewLevel === "endpoints") {
        return <EmptyState type={"noEndpoints"} />;
      }
    }

    return (
      <>
        {viewMode === "table" && (
          <MetricsTable
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={timeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={viewLevel}
          />
        )}
        {viewMode === "treemap" && (
          <Chart
            scoreCriterion={scoreCriterion}
            data={transformedData}
            timeMode={timeMode}
            onTitleClick={handleTitleClick}
            onIssuesStatsClick={handleIssuesStatsClick}
            viewLevel={viewLevel}
          />
        )}
      </>
    );
  };

  return (
    <s.Section>
      <s.SectionBackground />
      <s.ContainerBackgroundGradient />
      <s.Container>
        {environments ? (
          environments.length > 0 ? (
            <>
              <ReportHeader
                onFilterChanged={handleFilterChanged}
                onViewModeChanged={handleViewModeChange}
                service={selectedService}
                onGoBack={handleGoBack}
                viewMode={viewMode}
              />
              {renderContent()}
            </>
          ) : (
            <EmptyState type={"noData"} />
          )
        ) : (
          <EmptyState type={"loading"} />
        )}

        <s.Footer>
          <DigmaLogoIcon size={14} />
          <span>© 2024 digma.ai</span>
        </s.Footer>
      </s.Container>
    </s.Section>
  );
};
