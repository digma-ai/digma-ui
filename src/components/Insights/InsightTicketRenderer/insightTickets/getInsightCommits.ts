import { isString } from "../../../../typeGuards/isString";
import type { GenericCodeObjectInsight } from "../../types";

export const getInsightCommits = (
  insight: GenericCodeObjectInsight | null | undefined
) => [insight?.firstCommitId, insight?.lastCommitId].filter(isString);
