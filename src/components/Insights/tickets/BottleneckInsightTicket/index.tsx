import { ReactElement } from "react";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { SpanEndpointBottleneckInsight } from "../../types";
import { useSpanDataSource } from "../common";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { InsightTicketProps } from "../types";

export const BottleneckInsightTicket = (
  props: InsightTicketProps<SpanEndpointBottleneckInsight>
) => {
  const { commitInfos, codeLocations, isLoading } =
    useSpanDataSource<SpanEndpointBottleneckInsight>(
      props.data.insight.spanInfo,
      props.data.insight
    );

  const services = [
    ...new Set(
      props.data.insight.slowEndpoints.map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
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
            insight={props.data.insight}
          />,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={props.data.insight}
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
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
