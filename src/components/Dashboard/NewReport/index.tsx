import { useLayoutEffect, useMemo, useState } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isNull } from "../../../typeGuards/isNull";
import { FeatureFlag } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { actions } from "../actions";
import { Chart } from "./Chart";
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
  const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  const { data: servicesData } = useReportsData(query);
  const [selectedService, setSelectedService] = useState<string>();
  const endpointsIssuesQuery = useMemo(
    () => ({
      ...query,
      services: selectedService ? [selectedService] : []
    }),
    [query, selectedService]
  );
  const { data: endpointsData } = useEndpointsIssuesData(endpointsIssuesQuery);
  const [viewMode, setViewMode] = useState<ReportViewMode>("table");
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

  const handleTitleClick = (name: string) => {
    if (viewLevel === "services") {
      setSelectedService(name);
    }
  };

  const handleIssuesStatsClick = (name: string) => {
    changeScope({
      span: null,
      environmentId: query.environmentId ?? undefined,
      context: {
        event: SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
        payload: {
          service: name
        }
      }
    });
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

  return (
    <s.Section>
      <s.SectionBackground />
      <s.ContainerBackgroundGradient />
      <s.Container>
        <ReportHeader
          onFilterChanged={handleFilterChanged}
          onViewModeChanged={handleViewModeChange}
          service={selectedService}
          onGoBack={handleGoBack}
        />
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
        <s.Footer>
          <DigmaLogoIcon size={14} />
          <span>© 2024 digma.ai</span>
        </s.Footer>
      </s.Container>
    </s.Section>
  );
};
