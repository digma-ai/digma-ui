import { ReactElement, useContext } from "react";
import { InsightType } from "../../../../types";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { Attachment } from "../../../common/JiraTicket/types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { RootCauseSpanInfo, SpanScalingBadlyInsight } from "../../types";
import { useEndpointDataSource } from "../common";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import {
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueMessage,
  ScalingIssueRootCauses,
  ScalingIssueTestedConcurrency,
  getHistogramAttachment,
  getScalingIssueSummary,
  getTraceAttachment
} from "../common/ScalingIssueCommon";
import { InsightTicketProps } from "../types";

export const ScalingIssueInsightTicketByRootCause = (
  props: InsightTicketProps<SpanScalingBadlyInsight> & {
    rootCauseSpanInfo: RootCauseSpanInfo;
  }
) => {
  const config = useContext(ConfigContext);

  const spanInfo = props.rootCauseSpanInfo;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpanScalingBadlyInsight>(
    spanInfo,
    InsightType.SpanScalingBadly
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

  const attachmentTrace = getTraceAttachment(config, spanInfo?.sampleTraceId);
  const attachmentHistogram = getHistogramAttachment(config, spanInsight);
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
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
