import type { ReactElement } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { DigmaSignature } from "../../../common/DigmaSignature";
import type {
  EndpointBottleneckInsight,
  SpanEndpointBottleneckInsight
} from "../../types";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { useEndpointDataSource } from "../common/useEndpointDataSource";
import type { InsightTicketProps } from "../types";

export const EndpointBottleneckInsightTicket = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketProps<EndpointBottleneckInsight>) => {
  const span = data.insight.span;

  const {
    commitInfos,
    isLoading,
    spanInsight,
    onReloadSpanInsight,
    codeLocations
  } = useEndpointDataSource<SpanEndpointBottleneckInsight>(
    span?.spanInfo || null,
    InsightType.SpanEndpointBottleneck
  );

  const services = [
    ...new Set(
      (spanInsight?.slowEndpoints ?? []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    span && span.criticality > 0
      ? `Criticality: ${getCriticalityLabel(span.criticality)}`
      : "";

  const summary = ["Bottleneck found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <BottleneckEndpoints
            key={"bottleneckEndpoints"}
            insight={spanInsight}
          />,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={spanInsight}
          />,
          <DigmaSignature key={"digmaSignature"} />
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      insight={data.insight}
      relatedInsight={spanInsight}
      onReloadSpanInsight={onReloadSpanInsight}
      onClose={onClose}
      refreshInsights={refreshInsights}
    />
  );
};
