import { ReactElement, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType } from "../../../../types";
import { intersperse } from "../../../../utils/intersperse";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { isEndpointHighNumberOfQueriesInsight } from "../../typeGuards";
import {
  EndpointHighNumberOfQueriesInsight,
  GenericCodeObjectInsight
} from "../../types";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { getInsightCommits } from "../getInsightCommits";
import {
  CodeLocationsData,
  CommitInfosData,
  InsightTicketProps
} from "../types";

export const HighNumberOfQueriesInsightTicket = (
  props: InsightTicketProps<EndpointHighNumberOfQueriesInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [spanInsight, setSpanInsight] =
    useState<EndpointHighNumberOfQueriesInsight | null>();
  const [commitInfos, setCommitInfos] = useState<CommitInfosData>();

  const renderDescription = () => {
    if (!spanInsight || !spanInsight.spanInfo) {
      return null;
    }

    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <div key={"title"}>Description</div>,
            <span
              key={"details"}
            >{`The endpoint ${spanInsight.spanInfo.displayName} is triggering an abnormally high number of queries.`}</span>,
            <span key={"text"}>
              Consider using joins/caching to reduce the overhead of the db
              roundtrip.
            </span>,
            <></>,
            <span
              key={"median"}
            >{`Number of queries (median): ${spanInsight.medianDuration.value}`}</span>,
            <span
              key={"typical"}
            >{`Typical for ${spanInsight.serviceName}: ${spanInsight.typicalCount}`}</span>,
            <CodeLocations
              key={"codeLocations"}
              codeLocations={codeLocations}
            />,
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
  };

  const onReloadSpanInsight = () => {
    spanInfo?.spanCodeObjectId &&
      window.sendMessageToDigma({
        action: actions.GET_SPAN_INSIGHT,
        payload: {
          spanCodeObjectId: spanInfo?.spanCodeObjectId,
          insightType: InsightType.SpanNPlusOne
        }
      });
  };

  useEffect(() => {
    const spanInfo = props.data.insight.spanInfo;
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    const methodCodeObjectId = spanInfo?.methodCodeObjectId || undefined;

    setIsInitialLoading(false);

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
      if (
        insightData.insight &&
        isEndpointHighNumberOfQueriesInsight(insightData.insight)
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

  const summary = [
    "High number of queries detected ",
    spanInsight?.spanInfo?.displayName,
    spanInsight?.serviceName
  ]
    .filter(Boolean)
    .join(" - ");

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
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
