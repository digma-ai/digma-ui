import { RootCauseSpanInfo, SpanScalingBadlyInsight } from "../../types";
import { InsightTicketProps } from "../types";
import { InsightJiraTicket } from "../../InsightJiraTicket";
import { intersperse } from "../../../../utils/intersperse";
import { ReactElement, useContext } from "react";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useEndpointDataSource } from "../common";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { ConfigContext } from "../../../common/App/ConfigContext";
import {
  ScalingIssueAffectedEndpoints,
  ScalingIssueDuration,
  ScalingIssueRootCauses
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
            <div key={"message"}>
              {spanInsight?.shortDisplayInfo.description}
            </div>,
            <div key={"testedConcurrency"}>
              Tested concurrency: {spanInsight?.maxConcurrency}
            </div>,
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

  const criticalityString =
    spanInsight && spanInsight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(spanInsight.criticality)}`
      : "";
  const summary = ["Scaling Issue", criticalityString]
    .filter(Boolean)
    .join(" - ");

  const traceId = spanInfo?.sampleTraceId;
  const attachmentTrace = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  const histogramUrlParams = new URLSearchParams({
    env: spanInsight?.environment || "",
    scoid: spanInsight?.spanInfo?.spanCodeObjectId || ""
  });

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
        isLoading: isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachments={[attachmentHistogram, attachmentTrace]}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
