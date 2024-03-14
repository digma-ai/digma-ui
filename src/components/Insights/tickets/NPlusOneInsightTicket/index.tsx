import { ReactElement, useContext } from "react";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { Attachment } from "../../../common/JiraTicket/types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { SpanNPlusOneInsight } from "../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { NPlusOneAffectedEndpoints } from "../common/NPlusOneAffectedEndpoints";
import { InsightTicketProps } from "../types";

export const NPlusOneInsightTicket = (
  props: InsightTicketProps<SpanNPlusOneInsight>
) => {
  const spanInsight = props.data.insight;
  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpanNPlusOneInsight>(
      props.data.insight.spanInfo,
      props.data.insight
    );
  const config = useContext(ConfigContext);

  const endpoints = props.data.insight.endpoints || [];

  const services = [
    ...new Set(endpoints.map((x) => x.endpointInfo.serviceName))
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";

  const summary = ["N+1 Issue found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const queryString = props.data.insight.spanInfo?.displayName || "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>N+1 Query Detected</div>,
          <div key={"query"}>{queryString}</div>,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <NPlusOneAffectedEndpoints
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

  const traceId = props.data.insight.traceId;
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
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
