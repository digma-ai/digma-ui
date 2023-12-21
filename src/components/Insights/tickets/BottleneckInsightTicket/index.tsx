import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { roundTo } from "../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../utils/trimEndpointScheme";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { SpanEndpointBottleneckInsight } from "../../types";
import { CodeLocationsData, InsightTicketProps } from "../types";

export const BottleneckInsightTicket = (
  props: InsightTicketProps<SpanEndpointBottleneckInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);

  const services = [
    ...new Set(
      props.data.insight.slowEndpoints.map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";

  const summary = ["Bottleneck found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const spanString = `The span ${
    props.data.insight.spanInfo?.displayName || ""
  } is slowing down the following endpoints:`;

  const endpointsDataString = props.data.insight.slowEndpoints
    .map((x) =>
      [
        `• ${x.endpointInfo.serviceName} ${trimEndpointScheme(
          x.endpointInfo.route
        )}`,
        `Slowing ${roundTo(
          x.probabilityOfBeingBottleneck * 100,
          2
        )}% of the requests by ${x.avgDurationWhenBeingBottleneck.value} ${
          x.avgDurationWhenBeingBottleneck.unit
        }`
      ].join("\n")
    )
    .join("\n");

  const codeLocationsString =
    codeLocations.length > 0
      ? ["Related code locations:", ...codeLocations].join("\n")
      : "";

  const description = [
    spanString,
    endpointsDataString,
    codeLocationsString,
    "info by digma.ai"
  ]
    .filter(Boolean)
    .join("\n\n");

  useEffect(() => {
    const spanCodeObjectId = props.data.insight.spanInfo?.spanCodeObjectId;
    const methodCodeObjectId =
      props.data.insight.spanInfo?.methodCodeObjectId || undefined;

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
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
