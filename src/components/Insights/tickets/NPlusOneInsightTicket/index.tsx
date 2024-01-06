import { ReactElement, useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { isString } from "../../../../typeGuards/isString";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { SpanNPlusOneInsight } from "../../types";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { NPlusOneAffectedEndpoints } from "../common/NPlusOneAffectedEndpoints";
import {
  CodeLocationsData,
  CommitInfosData,
  InsightTicketProps
} from "../types";

export const NPlusOneInsightTicket = (
  props: InsightTicketProps<SpanNPlusOneInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [commitInfos, setCommitInfos] = useState<CommitInfosData>();
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

  const commits = [
    props.data.insight.firstCommitId,
    props.data.insight.lastCommitId
  ].filter(isString);

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key="title">N+1 Query Detected</div>,
          <div key="query">{queryString}</div>,
          <CodeLocations key="codeLocations" codeLocations={codeLocations} />,
          <NPlusOneAffectedEndpoints
            key="affectedEndpoints"
            insight={props.data.insight}
          />,
          <CommitInfos
            key="commitInfos"
            commitInfos={commitInfos}
            insight={props.data.insight}
          />,
          <div key="footer">
            info by <a href="https://digma.ai">digma.ai</a>
          </div>
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

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

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
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
      actions.SET_COMMIT_INFO,
      handleCommitInfosData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );

      dispatcher.removeActionListener(
        actions.SET_COMMIT_INFO,
        handleCommitInfosData
      );
    };
  }, []);

  useEffect(() => {
    if (commits.length > 0) {
      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }
  }, [commits]);

  useEffect(() => {
    if (codeLocations) {
      if (commits.length > 0) {
        if (commitInfos) {
          setIsInitialLoading(false);
        }
      } else {
        setIsInitialLoading(false);
      }
    }
  }, [codeLocations, commits, commitInfos]);

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isInitialLoading
      }}
      attachment={attachment}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
