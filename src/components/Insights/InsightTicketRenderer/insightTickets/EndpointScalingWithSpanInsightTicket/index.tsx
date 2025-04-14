import type { ReactElement } from "react";
import { useConfigSelector } from "../../../../../store/config/useConfigSelector";
import { InsightType } from "../../../../../types";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { Attachment } from "../../../../common/JiraTicket/types";
import type {
  EndpointScalingInsight,
  SpanScalingInsight
} from "../../../types";
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
import type { InsightTicketProps } from "../types";

export const EndpointScalingWithSpanInsightTicket = ({
  data,
  onClose,
  backendInfo
}: InsightTicketProps<EndpointScalingInsight>) => {
  const { jaegerApiPath, digmaApiProxyPrefix } = useConfigSelector();

  const { commitInfos, spanInsight, isLoading, codeLocations } =
    useEndpointDataSource<SpanScalingInsight>(
      data.insight.sourceSpanInfo,
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
            ...(data.insight.issueLocation === "SpanRootCause" &&
            data.insight.sourceSpanInfo
              ? [
                  <ScalingRootCauses
                    key={"scalingRootCauses"}
                    spanInfos={[data.insight.sourceSpanInfo]}
                  />
                ]
              : []),
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

  const summary = getScalingSummary(data.insight);

  const traceId = data.insight.sourceSpanInfo?.sampleTraceId;
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
