import { useEffect } from "react";
import type { SpanInfo } from "../../../../types";
import type { GenericCodeObjectInsight } from "../../types";
import { getInsightCommits } from "../getInsightCommits";
import { useCodeLocations } from "./useCodeLocations";
import { useCommitInfos } from "./useCommitInfos";
import { useLoading } from "./useLoading";

export const useSpanDataSource = <TInsight extends GenericCodeObjectInsight>(
  spanInfo: SpanInfo | null,
  insight: TInsight | null
) => {
  const [isLoading, setIsLoading] = useLoading(true);

  const { commitInfos, isLoading: isCommitInfoLoading } =
    useCommitInfos(insight);
  const { codeLocations, isLoading: isCodeLocationsLoading } =
    useCodeLocations(spanInfo);

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
    isLoading: isLoading || isCodeLocationsLoading || isCommitInfoLoading,
    commitInfos,
    codeLocations
  };
};
