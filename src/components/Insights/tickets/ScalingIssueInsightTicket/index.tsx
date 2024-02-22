import { SpanScalingBadlyInsight } from "../../types";
import { InsightTicketProps } from "../types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { intersperse } from "../../../../utils/intersperse";
import { ReactElement, useContext } from "react";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useSpanDataSource } from "../common";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { ConfigContext } from "../../../common/App/ConfigContext";
import {
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueRootCauses
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
            <div key={"message"}>{insight.shortDisplayInfo.description}</div>,
            <div key={"testedConcurrency"}>
              Tested concurrency: {insight.maxConcurrency}
            </div>,
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

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";
  const summary = ["Scaling Issue", criticalityString]
    .filter(Boolean)
    .join(" - ");

  const traceId = props.data.insight.affectedEndpoints
    ?.map((ep) => ep.sampleTraceId)
    ?.find((t) => t);
  const attachmentTrace = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  const histogramUrlParams = new URLSearchParams({
    env: insight.environment,
    scoid: insight.spanInfo?.spanCodeObjectId || ""
  });

  // Add it to the attachment(s) after we'll support more than one and
  // know how to make https calls while ignoring ssl cert verification
  const attachmentHistogram = {
    url: `${
      config.digmaApiUrl
    }/Graphs/graphForSpanScaling?${histogramUrlParams.toString()}`,
    fileName: `histogram.html`
  };

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isLoading
      }}
      attachment={attachmentTrace}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
