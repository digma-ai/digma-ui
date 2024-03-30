import { ReactElement, useContext } from "react";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../utils/getDurationString";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { DigmaSignature } from "../../../common/DigmaSignature";
import { Attachment } from "../../../common/JiraTicket/types";
import { SpanQueryOptimizationInsight } from "../../types";
import { useCommitInfos } from "../common";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { QueryOptimizationEndpoints } from "../common/QueryOptimizationEndpoints";
import { InsightTicketProps } from "../types";

export const SpanQueryOptimizationInsightTicket = ({
  data,
  onClose
}: InsightTicketProps<SpanQueryOptimizationInsight>) => {
  const { isLoading, commitInfos } = useCommitInfos(data.insight);
  const config = useContext(ConfigContext);

  const criticalityString =
    data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(data.insight.criticality)}`
      : "";

  const dbStatement = data.insight.dbStatement.toUpperCase();

  const services = [
    ...new Set(
      (data.insight.endpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";
  const dbName = data.insight.dbName ? `[${data.insight.dbName}]` : "";

  const summary = [
    `Slow ${dbStatement} query found on db: ${dbName}`,
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = data.insight.spanInfo?.displayName || "";

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
            Typical duration for {dbStatement} queries in this DB:{" "}
            {getDurationString(data.insight.typicalDuration)}
            {"\n"}
            This query: {getDurationString(data.insight.duration)}
          </div>,
          <QueryOptimizationEndpoints
            key={"affectedEndpoints"}
            insight={data.insight}
          />,
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

  const traceId = data.insight.traceId;
  const attachments: Attachment[] = [
    ...(traceId
      ? [
          {
            url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
            fileName: `trace-${traceId}.json`
          }
        ]
      : [])
  ];

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading
      }}
      attachments={attachments}
      insight={data.insight}
      onClose={onClose}
    />
  );
};
