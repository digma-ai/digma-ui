import { ReactElement, useContext } from "react";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { DigmaSignature } from "../../../common/DigmaSignature";
import { Attachment } from "../../../common/JiraTicket/types";
import { SpanScalingInsight } from "../../types";
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
import { InsightTicketProps } from "../types";

export const SpanScalingInsightTicket = ({
  data,
  onClose
}: InsightTicketProps<SpanScalingInsight>) => {
  const config = useContext(ConfigContext);

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
  const attachmentTrace = getTraceAttachment(config, traceId);
  const attachmentHistogram = getHistogramAttachment(config, insight);
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
