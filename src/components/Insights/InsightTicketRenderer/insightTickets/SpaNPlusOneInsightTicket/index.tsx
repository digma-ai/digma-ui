import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type { SpaNPlusOneInsight } from "../../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getNPlusOneInsightTypeName } from "../common/getNPlusOneInsightTypeName";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { NPlusOneEndpoints } from "../common/NPlusOneEndpoints";
import type { InsightTicketProps } from "../types";

export const SpaNPlusOneInsightTicket = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketProps<SpaNPlusOneInsight>) => {
  const spanInsight = data.insight;
  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpaNPlusOneInsight>(
      data.insight.spanInfo,
      data.insight,
      data.insight.environment
    );
  const { jaegerApiPath } = useConfigSelector();

  const endpoints = data.insight.endpoints ?? [];

  const services = [
    ...new Set(endpoints.map((x) => x.endpointInfo.serviceName))
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(data.insight.criticality)}`
      : "";

  const insightTypeName = getNPlusOneInsightTypeName(data.insight.subType);

  const summary = [
    `${insightTypeName} Issue found`,
    serviceString,
    criticalityString
  ]
    .filter(Boolean)
    .join(" - ");

  const queryString = data.insight.spanInfo?.displayName ?? "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>{insightTypeName} Detected</div>,
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

  const traceId = data.insight.traceId;
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
        isLoading
      }}
      attachments={attachments}
      insight={data.insight}
      onClose={onClose}
      refreshInsights={refreshInsights}
    />
  );
};
