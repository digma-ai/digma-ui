import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { isString } from "../../../../typeGuards/isString";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { trimEndpointScheme } from "../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { SpanNPlusOneInsight } from "../../types";
import { getCommitsInfoString } from "../getCommitsInfoString";
import {
  CodeLocationsData,
  CommitsInfoData,
  InsightTicketProps
} from "../types";

export const NPlusOneInsightTicket = (
  props: InsightTicketProps<SpanNPlusOneInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [commitsInfo, setCommitsInfo] = useState<CommitsInfoData>();
  const config = useContext(ConfigContext);

  const services = [
    ...new Set(
      props.data.insight.endpoints.map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";

  const summary = ["N+1 Issue found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const queryString = props.data.insight.spanInfo?.displayName || "";

  const codeLocationsString =
    codeLocations.length > 0
      ? ["Related code locations:", ...codeLocations].join("\n")
      : "";

  const endpointsDataString = props.data.insight.endpoints
    .map((x) =>
      [
        `• ${x.endpointInfo.serviceName} ${trimEndpointScheme(
          x.endpointInfo.route
        )}`,
        `Repeats: ${x.occurrences} ${
          x.criticality > 0
            ? `Criticality: ${getCriticalityLabel(x.criticality)}`
            : ""
        }`
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n");

  const affectedEndpointsString =
    props.data.insight.endpoints.length > 0
      ? ["Affected endpoints:", endpointsDataString].join("\n")
      : "";

  const commitsString = getCommitsInfoString(commitsInfo, props.data.insight);

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

  const traceId = props.data.insight.traceId;
  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  useEffect(() => {
    const spanCodeObjectId = props.data.insight.spanInfo?.spanCodeObjectId;
    const methodCodeObjectId =
      props.data.insight.spanInfo?.methodCodeObjectId || undefined;

    setIsInitialLoading(true);

    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });

    const commits = [
      props.data.insight.firstCommitId,
      props.data.insight.lastCommitId
    ].filter(isString);

    window.sendMessageToDigma({
      action: actions.GET_COMMIT_INFO,
      payload: {
        commits
      }
    });

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
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
      actions.SET_COMMIT_INFO,
      handleCommitsInfoData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );

      dispatcher.removeActionListener(
        actions.SET_COMMIT_INFO,
        handleCommitsInfoData
      );
    };
  }, []);

  useEffect(() => {
    if (codeLocations && commitsInfo) {
      setIsInitialLoading(false);
    }
  }, [codeLocations, commitsInfo]);

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
