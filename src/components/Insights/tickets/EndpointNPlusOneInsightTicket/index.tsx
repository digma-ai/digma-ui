import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { isNumber } from "../../../../typeGuards/isNumber";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { trimEndpointScheme } from "../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { EndpointSuspectedNPlusOneInsight } from "../../types";
import { CodeLocationsData, InsightTicketProps } from "../types";

export const EndpointNPlusOneInsightTicket = (
  props: InsightTicketProps<EndpointSuspectedNPlusOneInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const config = useContext(ConfigContext);

  const span = props.data.insight.spans.find(
    (x) =>
      (x.internalSpan?.spanCodeObjectId &&
        x.internalSpan.spanCodeObjectId === props.data.spanCodeObjectId) ||
      x.clientSpan.spanCodeObjectId === props.data.spanCodeObjectId
  );

  const spanInfo = span?.internalSpan || span?.clientSpan;

  const criticalityString = `Criticality: ${getCriticalityLabel(
    props.data.insight.criticality
  )}`;

  const summary = [
    "N+1 Issue found",
    props.data.insight.serviceName,
    criticalityString
  ].join(" - ");

  const queryString = spanInfo?.displayName || "";

  const codeLocationsString =
    codeLocations.length > 0
      ? ["Related code locations:", ...codeLocations].join("\n")
      : "";

  const occurrences = span?.occurrences;
  const criticality = span?.criticality;

  let statsString = [
    isNumber(occurrences) ? `Repeats: ${occurrences} ` : "",
    isNumber(criticality)
      ? `Criticality: ${getCriticalityLabel(criticality)}`
      : ""
  ]
    .filter(Boolean)
    .join(" ");

  statsString = statsString ? `  ${statsString}` : "";

  const endpointsDataString = [
    `• ${props.data.insight.serviceName} ${trimEndpointScheme(
      props.data.insight.route
    )}`,
    statsString
  ]
    .filter(Boolean)
    .join("\n");

  const affectedEndpointsString = [
    "Affected endpoints:",
    endpointsDataString
  ].join("\n");

  const description = [
    "N+1 Query Detected",
    queryString,
    codeLocationsString,
    affectedEndpointsString,
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
    setIsInitialLoading(true);

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
      setIsInitialLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );
    };
  }, []);

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
