import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { InsightType } from "../../../../../types";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type {
  EndpointSpanNPlusOneInsight,
  SpaNPlusOneInsight
} from "../../../types";
import { useEndpointDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { NPlusOneEndpoints } from "../common/NPlusOneEndpoints";
import type { InsightTicketProps } from "../types";

export const EndpointSpanNPlusOneInsightTicket = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketProps<EndpointSpanNPlusOneInsight>) => {
  const { jaegerApiPath } = useConfigSelector();
  const span = data.insight.span;
  const spanInfo = span?.internalSpan ?? span?.clientSpan;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpaNPlusOneInsight>(
    spanInfo,
    InsightType.SpaNPlusOne,
    data.insight.environment
  );

  const services = [
    ...new Set(
      (spanInsight?.endpoints ?? []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString = `Criticality: ${getCriticalityLabel(
    data.insight.criticality
  )}`;

  const summary = [
    "Repeated Query Issue found",
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInfo?.displayName || "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>Repeated Query Detected</div>,
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
      onReloadSpanInsight={onReloadSpanInsight}
      refreshInsights={refreshInsights}
    />
  );
};
