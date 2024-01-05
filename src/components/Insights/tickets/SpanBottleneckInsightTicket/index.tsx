import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { isString } from "../../../../typeGuards/isString";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { roundTo } from "../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../utils/trimEndpointScheme";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { isSpanEndpointBottleneckInsight } from "../../typeGuards";
import {
  EndpointSlowestSpansInsight,
  GenericCodeObjectInsight,
  SpanEndpointBottleneckInsight
} from "../../types";
import { getCommitsInfoString } from "../getCommitsInfoString";
import {
  CodeLocationsData,
  CommitsInfoData,
  InsightTicketProps
} from "../types";

export const SpanBottleneckInsightTicket = (
  props: InsightTicketProps<EndpointSlowestSpansInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>();
  const [spanInsight, setSpanInsight] =
    useState<SpanEndpointBottleneckInsight>();
  const [commitsInfo, setCommitsInfo] = useState<CommitsInfoData>();

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

  const spanString = `The span ${
    span?.spanInfo.displayName || ""
  } is slowing down the following endpoints:`;

  const endpointsDataString = (spanInsight?.slowEndpoints || [])
    .map((x) =>
      [
        `• ${x.endpointInfo.serviceName} ${trimEndpointScheme(
          x.endpointInfo.route
        )}`,
        `Slowing ${roundTo(
          x.probabilityOfBeingBottleneck * 100,
          2
        )}% of the requests (~${x.avgDurationWhenBeingBottleneck.value} ${
          x.avgDurationWhenBeingBottleneck.unit
        })`
      ].join("\n")
    )
    .join("\n");

  const codeLocationsString =
    codeLocations && codeLocations.length > 0
      ? ["Related code locations:", ...codeLocations].join("\n")
      : "";

  const commitsString = getCommitsInfoString(commitsInfo, spanInsight);

  const description = [
    spanString,
    endpointsDataString,
    codeLocationsString,
    commitsString,
    "info by digma.ai"
  ]
    .filter(Boolean)
    .join("\n\n");

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
      }
    };

    const handleCommitsInfoData = (data: unknown) => {
      const commitsInfoData = data as CommitsInfoData;
      setCommitsInfo(commitsInfoData);
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
      handleCommitsInfoData
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
        handleCommitsInfoData
      );
    };
  }, []);

  useEffect(() => {
    if (spanInsight) {
      const commits = [
        spanInsight.firstCommitId,
        spanInsight.lastCommitId
      ].filter(isString);

      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }
  }, [spanInsight]);

  useEffect(() => {
    if (codeLocations && spanInsight && commitsInfo) {
      setIsInitialLoading(false);
    }
  }, [codeLocations, spanInsight, commitsInfo]);

  return (
    <JiraTicket
      summary={summary}
      description={{ text: description, isLoading: isInitialLoading }}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
