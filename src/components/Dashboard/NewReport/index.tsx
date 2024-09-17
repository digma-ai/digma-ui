import { useLayoutEffect, useState } from "react";
import { actions } from "../actions";

import { DigmaLogoIcon } from "../../common/icons/16px/DigmaLogoIcon";
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
            data={data?.reports ?? []}
            showSign={query.lastDays !== null}
          />
        )}
        {viewMode === "treemap" && (
          <Chart type={"strip"} data={[]} labelFormat="" />
        )}
      </s.Container>
      <s.Footer>
        <DigmaLogoIcon size={14} />
        <span>© 2024 digma.ai</span>
      </s.Footer>
    </s.Section>
  );
};
