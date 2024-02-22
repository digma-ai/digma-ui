import { RootCauseSpanInfo, SpanScalingBadlyInsight } from "../../types";
import { InsightTicketProps } from "../types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { intersperse } from "../../../../utils/intersperse";
import { ReactElement, useContext } from "react";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useEndpointDataSource } from "../common";
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
import { InsightType } from "../../../../types";

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

  // Add it to the attachment(s) after we'll support more than one and
  // know how to make https calls while ignoring ssl cert verification
  const attachmentHistogram = getHistogramAttachment(config, spanInsight);

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachment={attachmentTrace}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
