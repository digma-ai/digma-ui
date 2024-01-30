import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType, SpanInfo } from "../../../../types";
import { actions } from "../../actions";
import { GenericCodeObjectInsight } from "../../types";
import { getInsightCommits } from "../getInsightCommits";
import { CodeLocationsData, CommitInfosData } from "../types";

export const useTicketDataSource = <TInsight extends GenericCodeObjectInsight>(
  spanInfo: SpanInfo | null,
  insightType: InsightType
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [spanInsight, setSpanInsight] = useState<TInsight | null>(null);
  const [commitInfos, setCommitInfos] = useState<CommitInfosData | null>(null);

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
        insightType: insightType
      }
    });

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
    };

    const handleSpanInsightData = (data: unknown) => {
      const insightData = data as { insight: TInsight | null };
      if (insightData.insight && insightData.insight.type === insightType) {
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

  return {
    isInitialLoading,
    codeLocations,
    spanInsight,
    commitInfos
  };
};
