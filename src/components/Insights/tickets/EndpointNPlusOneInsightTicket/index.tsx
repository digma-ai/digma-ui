import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { isString } from "../../../../typeGuards/isString";
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
import { getCommitsInfoString } from "../getCommitsInfoString";
import {
  CodeLocationsData,
  CommitsInfoData,
  InsightTicketProps
} from "../types";

export const EndpointNPlusOneInsightTicket = (
  props: InsightTicketProps<EndpointSuspectedNPlusOneInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const config = useContext(ConfigContext);
  const [spanInsight, setSpanInsight] = useState<SpanNPlusOneInsight>();
  const [commitsInfo, setCommitsInfo] = useState<CommitsInfoData>();

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
        `Repeats: ${x.occurrences}${
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

  const commitsString = getCommitsInfoString(commitsInfo, spanInsight);

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
        insightType: InsightType.SpanNPlusOne
      }
    });

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
      attachment={attachment}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
