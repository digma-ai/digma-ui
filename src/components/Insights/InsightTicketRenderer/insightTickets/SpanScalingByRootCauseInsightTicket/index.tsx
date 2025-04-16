import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { InsightType } from "../../../../../types";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type { RootCauseSpanInfo, SpanScalingInsight } from "../../../types";
import { useEndpointDataSource } from "../common";
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

export const SpanScalingByRootCauseInsightTicket = ({
  data,
  onClose,
  rootCauseSpanInfo,
  backendInfo
}: InsightTicketProps<SpanScalingInsight> & {
  rootCauseSpanInfo: RootCauseSpanInfo;
}) => {
  const { jaegerApiPath, digmaApiProxyPrefix } = useConfigSelector();

  const spanInfo = rootCauseSpanInfo;

  const { commitInfos, spanInsight, isLoading, codeLocations } =
    useEndpointDataSource<SpanScalingInsight>(
      spanInfo,
      InsightType.SpanScaling,
      data.insight.environment
    );

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <ScalingMessage key={"message"} insight={spanInsight} />,
            <ScalingTestedConcurrency
              key={"scalingTestedConcurrency"}
              insight={spanInsight}
            />,
            <ScalingDuration key={"scalingDuration"} insight={spanInsight} />,
            <ScalingRootCauses
              key={"scalingRootCauses"}
              spanInfos={spanInsight.rootCauseSpans}
            />,
            <SpanScalingAffectedEndpoints
              key={"spanScalingAffectedEndpoints"}
              insight={spanInsight}
            />,
            <CodeLocations
              key={"codeLocations"}
              codeLocations={codeLocations}
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
  };

  const summary = getScalingSummary(spanInsight);

  const attachmentTrace = getTraceAttachment(
    `${window.location.origin}${jaegerApiPath ?? ""}`,
    spanInfo?.sampleTraceId
  );
  const attachmentHistogram = getHistogramAttachment(
    `${window.location.origin}${digmaApiProxyPrefix ?? "/api"}`,
    spanInsight,
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
        isLoading: isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachments={attachments}
      insight={data.insight}
      relatedInsight={spanInsight}
      onClose={onClose}
    />
  );
};
