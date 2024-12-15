import { format } from "date-fns";
import type { MouseEvent } from "react";
import { openURLInDefaultBrowser } from "../../../../../utils/actions/openURLInDefaultBrowser";
import { intersperse } from "../../../../../utils/intersperse";
import { Link } from "../../../../common/Link";
import type { CommitInfosData } from "../../types";
import * as s from "./styles";
import type { CommitInfosProps } from "./types";

const renderCommit = (
  commitInfos: CommitInfosData | undefined | null,
  commitId: string | null
) => {
  if (commitInfos && commitId) {
    const url = commitInfos.commitInfos[commitId]?.url;

    if (!url) {
      return commitId;
    }

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      openURLInDefaultBrowser(url);
    };

    return (
      <Link href={url} onClick={handleLinkClick}>
        {url}
      </Link>
    );
  }

  return commitId;
};

export const CommitInfos = ({ insight, commitInfos }: CommitInfosProps) => {
  if (!insight) {
    return null;
  }

  const commits = [
    {
      label: "First Detected:",
      id: insight.firstCommitId,
      dateTime: insight.firstDetected
    },
    {
      label: "Last Detected:",
      id: insight.lastCommitId,
      dateTime: insight.lastDetected
    }
  ].filter((x) => x.id ?? x.dateTime);

  if (commits.length === 0) {
    return null;
  }

  return (
    <s.List>
      {intersperse(
        commits.map((x) => (
          <s.ListItem key={x.label}>
            <div>{x.label}</div>
            <div>{renderCommit(commitInfos, x.id)}</div>
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
