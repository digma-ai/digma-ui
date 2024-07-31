import { ReactElement } from "react";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { InsightType } from "../../../../types";
import { intersperse } from "../../../../utils/intersperse";
import { DigmaSignature } from "../../../common/DigmaSignature";
import { Attachment } from "../../../common/JiraTicket/types";
import { RootCauseSpanInfo, SpanScalingInsight } from "../../types";
import { useEndpointDataSource } from "../common";
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
import { InsightTicketProps } from "../types";

export const SpanScalingByRootCauseInsightTicket = ({
  data,
  refreshInsights,
  onClose,
  rootCauseSpanInfo
}: InsightTicketProps<SpanScalingInsight> & {
  rootCauseSpanInfo: RootCauseSpanInfo;
}) => {
  const jaegerURL = useGlobalStore.use.jaegerURL();
  const digmaApiProxyPrefix = useGlobalStore.use.digmaApiProxyPrefix();

  const spanInfo = rootCauseSpanInfo;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpanScalingInsight>(
    spanInfo,
    InsightType.SpanScaling
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
    digmaApiProxyPrefix,
    spanInsight
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
