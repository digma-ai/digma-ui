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
import {
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueMessage,
  ScalingIssueRootCauses,
  ScalingIssueTestedConcurrency,
  getScalingIssueSummary
} from "../common/SpanScaling";
import type { InsightTicketProps } from "../types";

export const SpanScalingByRootCauseInsightTicket = ({
  data,
  refreshInsights,
  onClose,
  rootCauseSpanInfo,
  backendInfo
}: InsightTicketProps<SpanScalingInsight> & {
  rootCauseSpanInfo: RootCauseSpanInfo;
}) => {
  const { jaegerURL, digmaApiProxyPrefix } = useConfigSelector();

  const spanInfo = rootCauseSpanInfo;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpanScalingInsight>(
    spanInfo,
    InsightType.SpanScaling,
    data.insight.environment
  );

  const renderDescription = () => {
    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <ScalingIssueMessage key={"message"} insight={spanInsight} />,
            <ScalingIssueTestedConcurrency
              key={"testedConcurrency"}
              insight={spanInsight}
            />,
            <ScalingIssueDuration
              key={"scalingIssueDuration"}
              insight={spanInsight}
            />,
            <ScalingIssueRootCauses
              key={"scalingIssueRootCauses"}
              insight={spanInsight}
            />,
            <ScalingIssueAffectedEndpoints
              key={"scalingIssueEndpoints"}
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

  const summary = getScalingIssueSummary(spanInsight);

  const attachmentTrace = getTraceAttachment(
    jaegerURL,
    spanInfo?.sampleTraceId
  );
  const attachmentHistogram = getHistogramAttachment(
    `${window.location.origin}${digmaApiProxyPrefix ?? "/api"}`,
    spanInsight,
    "spanScaling",
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
      onReloadSpanInsight={onReloadSpanInsight}
      refreshInsights={refreshInsights}
    />
  );
};
