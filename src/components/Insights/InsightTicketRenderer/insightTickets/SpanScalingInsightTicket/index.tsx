import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type { SpanScalingInsight } from "../../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getHistogramAttachment } from "../common/getHistogramAttachment";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import { getScalingSummary } from "../common/Scaling";
import { ScalingDuration } from "../common/Scaling/ScalingDuration";
import { ScalingMessage } from "../common/Scaling/ScalingMessage";
import { ScalingRootCauses } from "../common/Scaling/ScalingRootCauses";
import { ScalingTestedConcurrency } from "../common/Scaling/ScalingTestedConcurrency";
import { SpanScalingAffectedEndpoints } from "../common/Scaling/SpanScalingEndpoints";
import type { InsightTicketProps } from "../types";

export const SpanScalingInsightTicket = ({
  data,
  onClose,
  backendInfo
}: InsightTicketProps<SpanScalingInsight>) => {
  const { jaegerApiPath, digmaApiProxyPrefix } = useConfigSelector();

  const insight = data.insight;

  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpanScalingInsight>(
      data.insight.spanInfo,
      data.insight,
      data.insight.environment
    );

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <ScalingMessage key={"message"} insight={insight} />,
            <ScalingTestedConcurrency
              key={"scalingTestedConcurrency"}
              insight={insight}
            />,
            <ScalingDuration key={"scalingDuration"} insight={insight} />,
            <ScalingRootCauses
              key={"scalingRootCauses"}
              spanInfos={insight.rootCauseSpans}
            />,
            <SpanScalingAffectedEndpoints
              key={"spanScalingAffectedEndpoints"}
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

  const summary = getScalingSummary(data.insight);

  const traceId = data.insight.affectedEndpoints
    ?.map((ep) => ep.sampleTraceId)
    ?.find((t) => t);
  const attachmentTrace = getTraceAttachment(
    `${window.location.origin}${jaegerApiPath ?? ""}`,
    traceId
  );
  const attachmentHistogram = getHistogramAttachment(
    `${window.location.origin}${digmaApiProxyPrefix ?? "/api"}`,
    insight,
    backendInfo
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
    />
  );
};
