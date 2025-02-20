import { useLayoutEffect, useState } from "react";
import { actions } from "../actions";
import { DiscoveredAssets } from "./Cards/DiscoveredAssets";
import { DiscoveredIssues } from "./Cards/DiscoveredIssues";
import { ReportFooter } from "./ReportFooter";
import { ReportHeader } from "./ReportHeader";
import * as s from "./styles";
import type { ReportFilterQuery } from "./types";
import { useReportsData } from "./useReportsData";

const DefaultQuery: ReportFilterQuery = {
  environmentId: "",
  services: []
};

export const Report = () => {
  const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  const { discoveredAssets, discoveredIssues, refresh } = useReportsData(query);

  const handleFilterChange = (query: ReportFilterQuery) => {
    setQuery(query);
  };

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  return (
    <s.Container>
      <ReportHeader onRefresh={refresh} onFilterChange={handleFilterChange} />
      <s.Content>
        <s.Column key={"issues"}>
          <DiscoveredIssues statistics={discoveredIssues} />
        </s.Column>
        <s.Column key={"assets"}>
          <DiscoveredAssets statistics={discoveredAssets} />
        </s.Column>
      </s.Content>
      <ReportFooter />
    </s.Container>
  );
};
