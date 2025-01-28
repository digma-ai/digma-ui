import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { getCriticalityLabel } from "../../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../../utils/getDurationString";
import { intersperse } from "../../../../../utils/intersperse";
import { roundTo } from "../../../../../utils/roundTo";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type { SpanPerformanceAnomalyInsight } from "../../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getHistogramAttachment } from "../common/getHistogramAttachment";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import type { InsightTicketProps } from "../types";

export const SpanPerformanceAnomalyInsightTicket = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketProps<SpanPerformanceAnomalyInsight>) => {
  const { jaegerURL, digmaApiProxyPrefix, backendInfo } = useConfigSelector();

  const insight = data.insight;

  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpanPerformanceAnomalyInsight>(
      data.insight.spanInfo,
      data.insight,
      data.insight.environment
    );

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <div key={"description"}>
              The slowest 5% of this asset is{" "}
              {roundTo(insight.slowerByPercentage, 2)}% slower than the median
            </div>,
            <span key={"p50duration"}>
              Median duration: {getDurationString(insight.p50)}
            </span>,
            <span key={"p95duration"}>
              5% duration: {getDurationString(insight.p95)}
            </span>,
            <CodeLocations
              key={"codeLocations"}
              codeLocations={codeLocations}
            />,
            <CommitInfos
              key={"commitInfos"}
              commitInfos={commitInfos}
              insight={insight}
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

  const criticalityString =
    insight && insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(insight.criticality)}`
      : "";

  const summary = ["Performance anomaly found", criticalityString]
    .filter(Boolean)
    .join(" - ");

  const attachmentP50Trace = getTraceAttachment(
    jaegerURL,
    data.insight.p50TraceId
  );
  const attachmentP95Trace = getTraceAttachment(
    jaegerURL,
    data.insight.p95TraceId
  );
  const attachmentHistogram = getHistogramAttachment(
    digmaApiProxyPrefix,
    insight,
    "spanPercentiles",
    backendInfo
  );
  const attachments: Attachment[] = [
    ...([attachmentP50Trace, attachmentP95Trace].filter(
      Boolean
    ) as Attachment[]),
    ...(attachmentHistogram ? [attachmentHistogram] : [])
  ];

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isLoading
      }}
      attachments={attachments}
      insight={data.insight}
      onClose={onClose}
      refreshInsights={refreshInsights}
    />
  );
};
