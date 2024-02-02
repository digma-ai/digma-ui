import { ReactElement } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { InsightJiraTicket } from "../../JiraTicket";
import {
  EndpointSlowestSpansInsight,
  SpanEndpointBottleneckInsight
} from "../../types";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useEndpointDataSource } from "../common/useEndpointDataSource";
import { InsightTicketProps } from "../types";

export const SpanBottleneckInsightTicket = (
  props: InsightTicketProps<EndpointSlowestSpansInsight>
) => {
  const span = props.data.insight.spans.find(
    (x) => x.spanInfo.spanCodeObjectId === props.data.spanCodeObjectId
  );

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
      (spanInsight?.slowEndpoints || []).map((x) => x.endpointInfo.serviceName)
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
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onReloadSpanInsight={onReloadSpanInsight}
      onClose={props.onClose}
    />
  );
};
