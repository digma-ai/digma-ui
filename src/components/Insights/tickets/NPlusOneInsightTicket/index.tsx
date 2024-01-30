import { ReactElement, useContext } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import { SpanNPlusOneInsight } from "../../types";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { NPlusOneAffectedEndpoints } from "../common/NPlusOneAffectedEndpoints";
import { useTicketDataSource } from "../common/useTicketDataSource";
import { InsightTicketProps } from "../types";

export const NPlusOneInsightTicket = (
  props: InsightTicketProps<SpanNPlusOneInsight>
) => {
  const { commitInfos, isLoading, codeLocations, spanInsight } =
    useTicketDataSource<SpanNPlusOneInsight>(
      props.data.insight.spanInfo,
      InsightType.SpanNPlusOne
    );
  const config = useContext(ConfigContext);

  const services = [
    ...new Set(
      props.data.insight.endpoints.map((x) => x.endpointInfo.serviceName)
    )
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
  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  return (
    <JiraTicket
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
