import { ReactElement } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { JiraTicket } from "../../JiraTicket";
import { SpanEndpointBottleneckInsight } from "../../types";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useTicketDataSource } from "../common/useTicketDataSource";
import { InsightTicketProps } from "../types";

export const BottleneckInsightTicket = (
  props: InsightTicketProps<SpanEndpointBottleneckInsight>
) => {
  const { commitInfos, codeLocations, isInitialLoading, spanInsight } =
    useTicketDataSource<SpanEndpointBottleneckInsight>(
      props.data.insight.spanInfo,
      InsightType.SpanEndpointBottleneck
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

  const renderDescription = () => {
    if (!spanInsight) {
      return <></>;
    }
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <BottleneckEndpoints
              key={"bottleneckEndpoints"}
              insight={spanInsight}
            />,
            <CodeLocations
              key={"codeLocations"}
              codeLocations={codeLocations}
            />,
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
  };
  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isInitialLoading
      }}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
