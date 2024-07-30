import { useLayoutEffect, useState } from "react";
import { actions } from "../actions";
import { DiscoveredAssets } from "./Cards/DiscoveredAssets";
import { DiscoveredIssues } from "./Cards/DiscoveredIssues";
import { ReportsFooter } from "./ReportsFooter";
import { ReportsHeader } from "./ReportsHeader";
import * as s from "./styles";
import { ReportFilterQuery } from "./types";
import { useReportsData } from "./useReportsData";

const DefaultQuery: ReportFilterQuery = {
  environmentId: "",
  services: []
};

export const Reports = () => {
  const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  const { discoveredAssets, discoveredIssues, refresh } = useReportsData(query);

  const handleFilterChanged = (query: ReportFilterQuery) => {
    setQuery(query);
  };

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  return (
    <s.Container>
      <ReportsHeader
        onRefresh={refresh}
        onFilterChanged={handleFilterChanged}
      />
      <s.Content>
        <s.Column key={"issues"}>
          <DiscoveredIssues statistics={discoveredIssues} />
        </s.Column>
        <s.Column key={"assets"}>
          <DiscoveredAssets statistics={discoveredAssets} />
        </s.Column>
      </s.Content>
      <ReportsFooter />
    </s.Container>
  );
};
