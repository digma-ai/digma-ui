import { useEffect } from "react";
import { useLoading } from "../../../../../hooks/useLoading";
import type { SpanInfo } from "../../../../../redux/services/types";
import type { GenericCodeObjectInsight } from "../../../types";
import { getInsightCommits } from "../getInsightCommits";
import { useCodeLocations } from "./useCodeLocations";
import { useCommitInfos } from "./useCommitInfos";

export const useSpanDataSource = <T extends GenericCodeObjectInsight>(
  spanInfo: SpanInfo | null,
  insight: T | null,
  environmentId: string | undefined
) => {
  const [isLoading, setIsLoading] = useLoading(true);

  const { commitInfos, isLoading: isCommitInfoLoading } =
    useCommitInfos(insight);
  const { codeLocations, isLoading: isCodeLocationsLoading } = useCodeLocations(
    environmentId,
    spanInfo
  );

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
  }, [codeLocations, insight, commitInfos, setIsLoading]);

  return {
    isLoading: isLoading || isCodeLocationsLoading || isCommitInfoLoading,
    commitInfos,
    codeLocations
  };
};
