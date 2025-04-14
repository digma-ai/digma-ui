import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type { EndpointScalingInsight } from "../../../types";
import { useSpanDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { getHistogramAttachment } from "../common/getHistogramAttachment";
import { getTraceAttachment } from "../common/getTraceAttachment";
import { InsightJiraTicket } from "../common/InsightJiraTicket";

import { getScalingSummary } from "../common/Scaling";
import { ScalingDuration } from "../common/Scaling/ScalingDuration";
import { ScalingMessage } from "../common/Scaling/ScalingMessage";
import { ScalingTestedConcurrency } from "../common/Scaling/ScalingTestedConcurrency";
import type { InsightTicketProps } from "../types";

export const EndpointScalingInsightTicket = ({
  data,
  onClose,
  backendInfo
}: InsightTicketProps<EndpointScalingInsight>) => {
  const { jaegerApiPath, digmaApiProxyPrefix } = useConfigSelector();

  const { commitInfos, codeLocations, isLoading } =
    useSpanDataSource<EndpointScalingInsight>(
      data.insight.spanInfo,
      data.insight,
      data.insight.environment
    );

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <ScalingMessage key={"message"} insight={data.insight} />,
            <ScalingTestedConcurrency
              key={"scalingTestedConcurrency"}
              insight={data.insight}
            />,
            <ScalingDuration key={"scalingDuration"} insight={data.insight} />,
            <CodeLocations
              key={"codeLocations"}
              codeLocations={codeLocations}
            />,
            <CommitInfos
              key={"commitInfos"}
              commitInfos={commitInfos}
              insight={data.insight}
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

  const traceId = data.insight.sourceSpanInfo.sampleTraceId;
  const attachmentTrace = getTraceAttachment(
    `${window.location.origin}${jaegerApiPath ?? ""}`,
    traceId
  );
  const attachmentHistogram = getHistogramAttachment(
    `${window.location.origin}${digmaApiProxyPrefix ?? "/api"}`,
    data.insight,
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
