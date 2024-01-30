import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { InsightType, SpanInfo } from "../../../../types";
import { actions } from "../../actions";
import { GenericCodeObjectInsight } from "../../types";
import { getInsightCommits } from "../getInsightCommits";
import { CodeLocationsData, CommitInfosData } from "../types";

export const useEndpointDataSource = <
  TInsight extends GenericCodeObjectInsight
>(
  spanInfo: SpanInfo | null,
  insightType: InsightType
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [spanInsight, setSpanInsight] = useState<TInsight | null>(null);

  const {
    isLoading: isInsightMetaIsLoading,
    codeLocations,
    commitInfos
  } = useSpanDataSource(spanInfo, spanInsight);

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;

    setIsLoading(true);

    window.sendMessageToDigma({
      action: actions.GET_SPAN_INSIGHT,
      payload: {
        spanCodeObjectId,
        insightType: insightType
      }
    });

    const handleSpanInsightData = (data: unknown) => {
      const insightData = data as { insight: TInsight | null };
      if (insightData.insight && insightData.insight.type === insightType) {
        setSpanInsight(insightData.insight);
      } else {
        setSpanInsight(null);
      }

      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_SPAN_INSIGHT,
      handleSpanInsightData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_SPAN_INSIGHT,
        handleSpanInsightData
      );
    };
  }, []);

  const onReloadSpanInsight = () => {
    if (!spanInfo?.spanCodeObjectId) {
      return;
    }

    setIsLoading(true);
    window.sendMessageToDigma({
      action: actions.GET_SPAN_INSIGHT,
      payload: {
        spanCodeObjectId: spanInfo?.spanCodeObjectId,
        insightType: insightType
      }
    });
  };

  return {
    isLoading: isLoading || isInsightMetaIsLoading,
    codeLocations,
    spanInsight,
    commitInfos,
    onReloadSpanInsight
  };
};

export const useSpanDataSource = <TInsight extends GenericCodeObjectInsight>(
  spanInfo: SpanInfo | null,
  insight: TInsight | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [commitInfos, setCommitInfos] = useState<CommitInfosData | null>(null);

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    const methodCodeObjectId = spanInfo?.methodCodeObjectId || undefined;

    setIsLoading(true);

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
    const commits = getInsightCommits(insight);
    if (insight && commits.length > 0) {
      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }
  }, [insight]);

  useEffect(() => {
    if (codeLocations && insight) {
      const commits = getInsightCommits(insight);
      if (commits.length > 0) {
        if (commitInfos) {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  }, [codeLocations, insight, commitInfos]);

  return {
    isLoading,
    codeLocations,
    commitInfos
  };
};
