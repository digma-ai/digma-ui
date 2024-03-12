import { ReactElement, useContext } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../utils/getDurationString";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import {
  EndpointQueryOptimizationInsight,
  QueryOptimizationInsight
} from "../../types";
import { useEndpointDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { QueryOptimizationEndpoints } from "../common/QueryOptimizationEndpoints";
import { InsightTicketProps } from "../types";

export const EndpointQueryOptimizationInsightTicket = (
  props: InsightTicketProps<EndpointQueryOptimizationInsight>
) => {
  const config = useContext(ConfigContext);
  const span = props.data.insight.spans.find(
    (x) =>
      x.spanInfo?.spanCodeObjectId &&
      x.spanInfo.spanCodeObjectId === props.data.spanCodeObjectId
  );
  const spanInfo = span?.spanInfo || null;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<QueryOptimizationInsight>(
    spanInfo,
    InsightType.SpanQueryOptimization
  );

  const services = [
    ...new Set(
      (spanInsight?.endpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";
  const dbName = spanInsight?.dbName ? `[${spanInsight?.dbName}]` : "";

  const criticalityString = spanInsight?.criticality
    ? `Criticality: ${getCriticalityLabel(spanInsight?.criticality)}`
    : "";

  const dbStatement = spanInsight?.dbStatement.toUpperCase() || "";

  const summary = [
    `Slow ${dbStatement} query found on db: ${dbName}`,
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInsight?.spanInfo?.displayName || "";

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
  const attachments = [
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
        isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachments={attachments}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
