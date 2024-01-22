import { ReactElement, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { isSpanEndpointBottleneckInsight } from "../../typeGuards";
import {
  EndpointSlowestSpansInsight,
  GenericCodeObjectInsight,
  SpanEndpointBottleneckInsight
} from "../../types";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { getInsightCommits } from "../getInsightCommits";
import {
  CodeLocationsData,
  CommitInfosData,
  InsightTicketProps
} from "../types";

export const SpanBottleneckInsightTicket = (
  props: InsightTicketProps<EndpointSlowestSpansInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>();
  const [spanInsight, setSpanInsight] =
    useState<SpanEndpointBottleneckInsight | null>();
  const [commitInfos, setCommitInfos] = useState<CommitInfosData>();

  const span = props.data.insight.spans.find(
    (x) => x.spanInfo.spanCodeObjectId === props.data.spanCodeObjectId
  );

  const services = [
    ...new Set(
      (spanInsight?.slowEndpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    span && span.criticality > 0
      ? `Criticality: ${getCriticalityLabel(span.criticality)}`
      : "";

  const summary = ["Bottleneck found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <BottleneckEndpoints
            key={"bottleneckEndpoints"}
            insight={spanInsight || undefined}
          />,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={spanInsight || undefined}
          />,
          <DigmaSignature key={"digmaSignature"} />
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

  const onReloadSpanInsight = () => {
    spanInsight?.spanInfo?.spanCodeObjectId &&
      window.sendMessageToDigma({
        action: actions.GET_SPAN_INSIGHT,
        payload: {
          spanCodeObjectId: spanInsight?.spanInfo?.spanCodeObjectId,
          insightType: InsightType.SpanEndpointBottleneck
        }
      });
  };

  useEffect(() => {
    const spanCodeObjectId = span?.spanInfo.spanCodeObjectId;
    const methodCodeObjectId = span?.spanInfo.methodCodeObjectId || undefined;

    setIsInitialLoading(true);

    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });

    window.sendMessageToDigma({
      action: actions.GET_SPAN_INSIGHT,
      payload: {
        spanCodeObjectId,
        insightType: InsightType.SpanEndpointBottleneck
      }
    });

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
    };

    const handleSpanInsightData = (data: unknown) => {
      const insightData = data as { insight: GenericCodeObjectInsight | null };
      if (
        insightData.insight &&
        isSpanEndpointBottleneckInsight(insightData.insight)
      ) {
        setSpanInsight(insightData.insight);
      } else {
        setSpanInsight(null);
      }
    };

    const handleCommitInfosData = (data: unknown) => {
      const commitInfosData = data as CommitInfosData;
      setCommitInfos(commitInfosData);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    dispatcher.addActionListener(
      actions.SET_SPAN_INSIGHT,
      handleSpanInsightData
    );

    dispatcher.addActionListener(
      actions.SET_COMMIT_INFO,
      handleCommitInfosData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );

      dispatcher.removeActionListener(
        actions.SET_SPAN_INSIGHT,
        handleSpanInsightData
      );

      dispatcher.removeActionListener(
        actions.SET_COMMIT_INFO,
        handleCommitInfosData
      );
    };
  }, []);

  useEffect(() => {
    const commits = getInsightCommits(spanInsight);
    if (spanInsight && commits.length > 0) {
      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }
  }, [spanInsight]);

  useEffect(() => {
    if (codeLocations && spanInsight) {
      const commits = getInsightCommits(spanInsight);
      if (commits.length > 0) {
        if (commitInfos) {
          setIsInitialLoading(false);
        }
      } else {
        setIsInitialLoading(false);
      }
      setIsInitialLoading(false);
    }
  }, [codeLocations, spanInsight, commitInfos]);

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isInitialLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onReloadSpanInsight={onReloadSpanInsight}
      onClose={props.onClose}
    />
  );
};
