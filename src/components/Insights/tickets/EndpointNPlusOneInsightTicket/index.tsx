import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { trimEndpointScheme } from "../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { isSpanNPlusOneInsight } from "../../typeGuards";
import {
  EndpointSuspectedNPlusOneInsight,
  GenericCodeObjectInsight,
  SpanNPlusOneInsight
} from "../../types";
import { CodeLocationsData, InsightTicketProps } from "../types";

export const EndpointNPlusOneInsightTicket = (
  props: InsightTicketProps<EndpointSuspectedNPlusOneInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const config = useContext(ConfigContext);
  const [spanInsight, setSpanInsight] = useState<SpanNPlusOneInsight>();

  const span = props.data.insight.spans.find(
    (x) =>
      (x.internalSpan?.spanCodeObjectId &&
        x.internalSpan.spanCodeObjectId === props.data.spanCodeObjectId) ||
      x.clientSpan.spanCodeObjectId === props.data.spanCodeObjectId
  );

  const spanInfo = span?.internalSpan || span?.clientSpan;

  const services = [
    ...new Set(
      (spanInsight?.endpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString = `Criticality: ${getCriticalityLabel(
    props.data.insight.criticality
  )}`;

  const summary = ["N+1 Issue found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInfo?.displayName || "";

  const codeLocationsString =
    codeLocations.length > 0
      ? ["Related code locations:", ...codeLocations].join("\n")
      : "";

  const endpointsDataString = (spanInsight?.endpoints || [])
    .map((x) =>
      [
        `• ${x.endpointInfo.serviceName} ${trimEndpointScheme(
          x.endpointInfo.route
        )}`,
        `Repeats: ${x.occurrences} ${
          x.criticality > 0
            ? ` Criticality: ${getCriticalityLabel(x.criticality)}`
            : ""
        }`
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n");

  const affectedEndpointsString =
    (spanInsight?.endpoints || []).length > 0
      ? ["Affected endpoints:", endpointsDataString].join("\n")
      : "";

  const commitsString =
    (spanInsight?.firstCommitId
      ? `First detected commit: ${spanInsight?.firstCommitId}\n`
      : "") +
    (spanInsight?.lastCommitId
      ? `Last detected commit: ${spanInsight?.lastCommitId}\n`
      : "");

  const description = [
    "N+1 Query Detected",
    queryString,
    codeLocationsString,
    affectedEndpointsString,
    commitsString,
    "info by digma.ai"
  ]
    .filter(Boolean)
    .join("\n\n");

  const traceId = span?.traceId;
  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    const methodCodeObjectId = spanInfo?.methodCodeObjectId || undefined;

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
        insightType: InsightType.SpanNPlusOne
      }
    });

    setIsInitialLoading(true);

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
    };

    const handleSpanInsightData = (data: unknown) => {
      const insightData = data as { insight: GenericCodeObjectInsight | null };
      if (insightData.insight && isSpanNPlusOneInsight(insightData.insight)) {
        setSpanInsight(insightData.insight);
      }
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );
    dispatcher.addActionListener(
      actions.SET_SPAN_INSIGHT,
      handleSpanInsightData
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
    };
  }, []);

  useEffect(() => {
    if (codeLocations && spanInsight?.endpoints) {
      setIsInitialLoading(false);
    }
  }, [codeLocations, spanInsight?.endpoints]);

  return (
    <JiraTicket
      summary={summary}
      description={{ text: description, isLoading: isInitialLoading }}
      attachment={attachment}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
