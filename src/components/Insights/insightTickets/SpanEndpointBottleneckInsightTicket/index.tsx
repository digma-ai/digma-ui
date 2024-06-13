import { ReactElement } from "react";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { DigmaSignature } from "../../../common/DigmaSignature";
import { SpanEndpointBottleneckInsight } from "../../types";
import { useSpanDataSource } from "../common";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { InsightTicketProps } from "../types";

export const SpanEndpointBottleneckInsightTicket = ({
  data,
  onClose
}: InsightTicketProps<SpanEndpointBottleneckInsight>) => {
  const { commitInfos, codeLocations, isLoading } =
    useSpanDataSource<SpanEndpointBottleneckInsight>(
      data.insight.spanInfo,
      data.insight
    );

  const slowEndpoints = data.insight.slowEndpoints ?? [];
  const services = [
    ...new Set(slowEndpoints.map((x) => x.endpointInfo.serviceName))
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(data.insight.criticality)}`
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
            insight={data.insight}
          />,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={data.insight}
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
        isLoading
      }}
      insight={data.insight}
      onClose={onClose}
    />
  );
};
