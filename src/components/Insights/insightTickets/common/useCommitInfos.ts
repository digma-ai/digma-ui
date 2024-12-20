import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { actions } from "../../actions";
import type { GenericCodeObjectInsight } from "../../types";
import { getInsightCommits } from "../getInsightCommits";
import type { CommitInfosData } from "../types";
import { useLoading } from "./useLoading";

export const useCommitInfos = <TInsight extends GenericCodeObjectInsight>(
  insight: TInsight | null
) => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [commitInfos, setCommitInfos] = useState<CommitInfosData | null>(null);

  useEffect(() => {
    const handleCommitInfosData = (data: unknown) => {
      const commitInfosData = data as CommitInfosData;
      setCommitInfos(commitInfosData);
      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_COMMIT_INFO,
      handleCommitInfosData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_COMMIT_INFO,
        handleCommitInfosData
      );
    };
  }, []);

  useEffect(() => {
    const commits = getInsightCommits(insight);
    if (insight && commits.length > 0) {
      setIsLoading(true);
      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }
  }, [insight]);

  return {
    isLoading,
    commitInfos
  };
};
