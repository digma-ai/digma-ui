import { ReactElement, useContext } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { DigmaSignature } from "../../../common/DigmaSignature";
import { Attachment } from "../../../common/JiraTicket/types";
import { EndpointSpanNPlusOneInsight, SpaNPlusOneInsight } from "../../types";
import { useEndpointDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { NPlusOneEndpoints } from "../common/NPlusOneEndpoints";
import { InsightTicketProps } from "../types";

export const EndpointSpanNPlusOneInsightTicket = ({
  data,
  onClose
}: InsightTicketProps<EndpointSpanNPlusOneInsight>) => {
  const config = useContext(ConfigContext);
  const span = data.insight.span;
  const spanInfo = span?.internalSpan || span?.clientSpan || null;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpaNPlusOneInsight>(
    spanInfo,
    InsightType.SpaNPlusOne
  );

  const services = [
    ...new Set(
      (spanInsight?.endpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString = `Criticality: ${getCriticalityLabel(
    data.insight.criticality
  )}`;

  const summary = ["N+1 Issue found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInfo?.displayName || "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>N+1 Query Detected</div>,
          <div key={"query"}>{queryString}</div>,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <NPlusOneEndpoints key={"affectedEndpoints"} insight={spanInsight} />,
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
        isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachments={attachments}
      insight={data.insight}
      relatedInsight={spanInsight}
      onClose={onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
