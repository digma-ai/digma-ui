import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { intersperse } from "../../../../utils/intersperse";
import { DigmaSignature } from "../../../common/DigmaSignature";
import type { Attachment } from "../../../common/JiraTicket/types";
import type { SpanScalingInsight } from "../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import {
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueMessage,
  ScalingIssueRootCauses,
  ScalingIssueTestedConcurrency,
  getHistogramAttachment,
  getScalingIssueSummary,
  getTraceAttachment
} from "../common/SpanScaling";
import type { InsightTicketProps } from "../types";

export const SpanScalingInsightTicket = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketProps<SpanScalingInsight>) => {
  const { jaegerURL, digmaApiProxyPrefix } = useConfigSelector();

  const insight = data.insight;

  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpanScalingInsight>(data.insight.spanInfo, data.insight);

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <ScalingIssueMessage key={"message"} insight={insight} />,
            <ScalingIssueTestedConcurrency
              key={"testedConcurrency"}
              insight={insight}
            />,
            <ScalingIssueDuration
              key={"scalingIssueDuration"}
              insight={insight}
            />,
            <ScalingIssueRootCauses
              key={"scalingIssueRootCauses"}
              insight={insight}
            />,
            <ScalingIssueAffectedEndpoints
              key={"scalingIssueEndpoints"}
              insight={insight}
            />,
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

  const summary = getScalingIssueSummary(data.insight);

  const traceId = data.insight.affectedEndpoints
    ?.map((ep) => ep.sampleTraceId)
    ?.find((t) => t);
  const attachmentTrace = getTraceAttachment(jaegerURL, traceId);
  const attachmentHistogram = getHistogramAttachment(
    digmaApiProxyPrefix,
    insight
  );
  const attachments: Attachment[] = [
    ...(attachmentTrace ? [attachmentTrace] : []),
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
