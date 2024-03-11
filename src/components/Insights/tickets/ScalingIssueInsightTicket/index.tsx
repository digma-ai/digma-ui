import { SpanScalingBadlyInsight } from "../../types";
import { InsightTicketProps } from "../types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { intersperse } from "../../../../utils/intersperse";
import { ReactElement, useContext } from "react";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useSpanDataSource } from "../common";
import { ConfigContext } from "../../../common/App/ConfigContext";
import {
  getHistogramAttachment,
  getScalingIssueSummary,
  getTraceAttachment,
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueMessage,
  ScalingIssueRootCauses,
  ScalingIssueTestedConcurrency
} from "../common/ScalingIssueCommon";

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

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isLoading
      }}
      attachments={[attachmentHistogram, attachmentTrace]}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
