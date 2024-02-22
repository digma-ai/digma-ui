import { ReactElement, useContext } from "react";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../utils/getDurationString";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { QueryOptimizationInsight } from "../../types";
import { useCommitInfos } from "../common";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { QueryOptimizationEndpoints } from "../common/QueryOptimizationEndpoints";
import { InsightTicketProps } from "../types";

export const QueryOptimizationInsightTicket = (
  props: InsightTicketProps<QueryOptimizationInsight>
) => {
  const { isLoading, commitInfos } = useCommitInfos(props.data.insight);
  const config = useContext(ConfigContext);

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";

  const dbStatement = props.data.insight.dbStatement.toUpperCase();

  const services = [
    ...new Set(
      (props.data.insight.endpoints || []).map(
        (x) => x.endpointInfo.serviceName
      )
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";
  const dbName = props.data.insight.dbName
    ? `[${props.data.insight.dbName}]`
    : "";

  const summary = [
    `Slow ${dbStatement} query found on db: ${dbName}`,
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = props.data.insight.spanInfo?.displayName || "";

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
            {getDurationString(props.data.insight.typicalDuration)}
            {"\n"}
            This query: {getDurationString(props.data.insight.duration)}
          </div>,
          <QueryOptimizationEndpoints
            key={"affectedEndpoints"}
            insight={props.data.insight}
          />,
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

  const traceId = props.data.insight.traceId;
  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading
      }}
      attachment={attachment}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
