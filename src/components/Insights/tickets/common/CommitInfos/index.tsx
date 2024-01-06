import { format } from "date-fns";
import { intersperse } from "../../../../../utils/intersperse";
import { Link } from "../../../../common/Link";
import { CommitInfosData } from "../../types";
import * as s from "./styles";
import { CommitInfosProps } from "./types";

const renderCommit = (
  commitInfos: CommitInfosData | undefined,
  commitId: string | null
) => {
  if (commitInfos && commitId) {
    const url = commitInfos.commitInfos[commitId]?.url;
    return url ? <Link href={url}>{url}</Link> : commitId;
  }

  return commitId;
};

export const CommitInfos = (props: CommitInfosProps) => {
  if (!props.insight) return null;

  const commits = [
    {
      label: "First Detected:",
      id: props.insight.firstCommitId,
      dateTime: props.insight.firstDetected
    },
    {
      label: "Last Detected:",
      id: props.insight.lastCommitId,
      dateTime: props.insight.lastDetected
    }
  ].filter((x) => x.id || x.dateTime);

  if (commits.length === 0) return null;

  return (
    <s.List>
      {intersperse(
        commits.map((x) => (
          <s.ListItem key={x.label}>
            <div>{x.label}</div>
            <div>{renderCommit(props.commitInfos, x.id)}</div>
            {x.dateTime && (
              <div>{format(new Date(x.dateTime), "MM/dd/yyyy HH:mm")}</div>
            )}
          </s.ListItem>
        )),
        (i) => (
          <br key={i} />
        )
      )}
    </s.List>
  );
};
