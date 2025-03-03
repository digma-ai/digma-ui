import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { InsightType } from "../../../../../types";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../../utils/getDurationString";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type {
  EndpointQueryOptimizationV2Insight,
  SpanQueryOptimizationInsight
} from "../../../types";
import { useEndpointDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { QueryOptimizationEndpoints } from "../common/QueryOptimizationEndpoints";
import type { InsightTicketProps } from "../types";

export const EndpointQueryOptimizationV2InsightTicket = ({
  data,
  onClose
}: InsightTicketProps<EndpointQueryOptimizationV2Insight>) => {
  const { jaegerApiPath } = useConfigSelector();
  const span = data.insight.span;
  const spanInfo = span?.spanInfo || null;

  const { commitInfos, spanInsight, isLoading, codeLocations } =
    useEndpointDataSource<SpanQueryOptimizationInsight>(
      spanInfo,
      InsightType.SpanQueryOptimization,
      data.insight.environment
    );

  const services = [
    ...new Set(
      (spanInsight?.endpoints ?? []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";
  const dbName = spanInsight?.dbName ? `[${spanInsight?.dbName}]` : "";

  const criticalityString = spanInsight?.criticality
    ? `Criticality: ${getCriticalityLabel(spanInsight?.criticality)}`
    : "";

  const dbStatement = spanInsight?.dbStatement.toUpperCase() ?? "";

  const summary = [
    `Slow ${dbStatement} query found on db: ${dbName}`,
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInsight?.spanInfo?.displayName ?? "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>
            The following {dbStatement} query is abnormally slow. Please
            consider optimizing or adding indexes.
          </div>,
          <div key={"query"}>{queryString}</div>,
          <div key={"typicalDuration"}>
            {spanInsight && (
              <>
                Typical duration for {dbStatement} queries in this DB:{" "}
                {getDurationString(spanInsight?.typicalDuration)}
                {"\n"}
                This query: {getDurationString(spanInsight?.duration)}
              </>
            )}
          </div>,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <QueryOptimizationEndpoints
            key={"affectedEndpoints"}
            insight={spanInsight}
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

  const traceId = span?.traceId;
  const traceAttachment = getTraceAttachment(
    `${window.location.origin}${jaegerApiPath ?? ""}`,
    traceId
  );
  const attachments: Attachment[] = [
    ...(traceAttachment ? [traceAttachment] : [])
  ];

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachments={attachments}
      insight={data.insight}
      relatedInsight={spanInsight}
      onClose={onClose}
    />
  );
};
