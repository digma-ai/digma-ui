import { format } from "date-fns";
import { isString } from "../../../typeGuards/isString";
import { GenericCodeObjectInsight } from "../types";
import { CommitsInfoData } from "./types";

const getCommitUrl = (
  commitsInfo: CommitsInfoData,
  commitId: string | null
): string | null => {
  if (!commitId) return null;

  return commitsInfo.commitsInfo[commitId]?.url || null;
};

export const getCommitsInfoString = (
  commitsInfo: CommitsInfoData | undefined,
  insight: GenericCodeObjectInsight | undefined
) => {
  if (!commitsInfo || !insight) return "";

  const commits = [
    {
      label: "First Detected:",
      id: insight?.firstCommitId,
      url: getCommitUrl(commitsInfo, insight?.firstCommitId),
      dateTime: insight.firstDetected
    },
    {
      label: "Last Detected:",
      id: insight?.lastCommitId,
      url: getCommitUrl(commitsInfo, insight?.lastCommitId),
      dateTime: insight.lastDetected
    }
  ];

  return commits
    .filter((x) => isString(x.id))
    .map((x) =>
      [
        x.label,
        x.url || x.id,
        isString(x.dateTime)
          ? format(new Date(x.dateTime), "MM/dd/yyyy HH:mm")
          : null
      ]
        .filter(isString)
        .join("\n")
    )
    .join("\n");
};
