import { useLayoutEffect, useState } from "react";
import { changeScope } from "../../../utils/actions/changeScope";
import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
import { SCOPE_CHANGE_EVENTS } from "../../Main/types";
import { actions } from "../actions";
import { Chart } from "./Chart";
import { MetricsTable } from "./MetricsTable";
import { ReportHeader } from "./ReportHeader";
import { ReportViewMode } from "./ReportHeader/types";
import * as s from "./styles";
import { ReportFilterQuery } from "./types";
import { useReportsData } from "./useReportsData";

const DefaultQuery: ReportFilterQuery = {
  environmentId: "",
  services: [],
  lastDays: null
};

export const NewReport = () => {
  const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  const { data } = useReportsData(query);
  const [viewMode, setViewMode] = useState<ReportViewMode>("table");

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

  const handleServiceSelected = (name: string) => {
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

  const serviceData = (query?.services.length > 0 ? data?.reports : null) ?? [];

  return (
    <s.Section>
      <s.SectionBackground />
      <s.ContainerBackgroundGradient />
      <s.Container>
        <ReportHeader
          onFilterChanged={handleFilterChanged}
          onViewModeChanged={handleViewModeChange}
        />
        {viewMode === "table" && (
          <MetricsTable
            data={serviceData}
            showSign={query.lastDays !== null}
            onServiceSelected={handleServiceSelected}
          />
        )}
        {viewMode === "treemap" && (
          <Chart onServiceSelected={handleServiceSelected} data={serviceData} />
        )}
        <s.Footer>
          <DigmaLogoIcon size={14} />
          <span>© 2024 digma.ai</span>
        </s.Footer>
      </s.Container>
    </s.Section>
  );
};
