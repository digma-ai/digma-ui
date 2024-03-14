import { ReactElement, useContext } from "react";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { Attachment } from "../../../common/JiraTicket/types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { SpanScalingBadlyInsight } from "../../types";
import { useSpanDataSource } from "../common";
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

export const ScalingIssueInsightTicket = (
  props: InsightTicketProps<SpanScalingBadlyInsight>
) => {
  const config = useContext(ConfigContext);

  const insight = props.data.insight;

  const { commitInfos, isLoading, codeLocations } =
    useSpanDataSource<SpanScalingBadlyInsight>(
      props.data.insight.spanInfo,
      props.data.insight
    );

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

  const summary = getScalingIssueSummary(props.data.insight);

  const traceId = props.data.insight.affectedEndpoints
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
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
